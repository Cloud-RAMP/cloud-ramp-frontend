import { NextRequest, NextResponse } from "next/server";
import { put } from "@vercel/blob";
import { cert, getApps, initializeApp } from "firebase-admin/app";
import { getFirestore, FieldValue } from "firebase-admin/firestore";

if (!getApps().length) {
  const serviceAccount = JSON.parse(process.env.FIREBASE_SERVICE_ACCOUNT_JSON!);
  
  initializeApp({
    credential: cert(serviceAccount),
  });
}
const adminDb = getFirestore();

async function doesUserExist(uid: string): Promise<boolean> {
    const usersRef = adminDb.collection("users");
    const snapshot = await usersRef.where("uid", "==", uid).get();
    return !snapshot.empty;
}

// Uploads a blob to vercel and returns the URL.
// Throws errors if it doesn't work
async function uploadBlob(file: Blob, id: string): Promise<string> {
    const blob = await put(id, file, { access: "private", allowOverwrite: true });
    const blobURL = blob.url;
    return blobURL;
}

// Returns NULL on found service, string of service id on creation
async function addOrUpdateService(service: {
    serviceName: string;
    ownerId: string;
    lastUpdated: Date;
    file: Blob;
}): Promise<string> {
    try {
        const servicesRef = adminDb.collection("services");
        const snapshot = await servicesRef
            .where("serviceName", "==", service.serviceName)
            .where("ownerId", "==", service.ownerId)
            .get();

        if (!snapshot.empty) {
            const docRef = snapshot.docs[0].ref;

            const blobURL = await uploadBlob(service.file, docRef.id);
            if (blobURL == "") {
                throw new Error("Blob upload failed");
            }

            await docRef.update({
                lastUpdated: service.lastUpdated,
                blobURL: blobURL,
            });
            return docRef.id;
        } else {
            const newDocRef = servicesRef.doc();
            const newDocId = newDocRef.id;

            const blobURL = await uploadBlob(service.file, newDocId);
            if (blobURL == "") {
                throw new Error("Blob upload failed");
            }

            await newDocRef.set({
                serviceName: service.serviceName,
                ownerId: service.ownerId,
                lastUpdated: service.lastUpdated,
                blobURL,
            });

            // Add service to user's collection
            const userRef = adminDb.collection("users").doc(service.ownerId);
            await userRef.update({
                services: FieldValue.arrayUnion(newDocId),
            });

            return newDocId;
        }
    } catch (error) {
        console.error("Error adding/updating service in Firestore:", error);
        throw error;
    }
}

export async function POST(request: NextRequest) {
    const formData = await request.formData();
    const file = formData.get("file") as Blob;
    const serviceName = formData.get("serviceName") as string;
    const uid = formData.get("uid") as string;

    if (!file || !serviceName || !uid) {
        return NextResponse.json({ error: "Bad Request" }, { status: 400 });
    }

    // lookup uid
    try {
        const exists = await doesUserExist(uid);
        if (!exists) {
            return NextResponse.json({ error: "Invalid permissions" }, { status: 403 });
        }
    } catch {
        return NextResponse.json({ error: "Bad Request" }, { status: 400 });
    }

    try {
        await addOrUpdateService({
            serviceName: serviceName,
            ownerId: uid,
            lastUpdated: new Date(),
            file,
        });
    } catch {
        return NextResponse.json({ error: "Failed to upload data" }, { status: 500 });
    }

    // You can now process the file and serviceName
    return NextResponse.json({ message: "Upload successful!" });
}