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

export async function doesUserExist(uid: string): Promise<boolean> {
    const usersRef = adminDb.collection("users");
    const snapshot = await usersRef.where("uid", "==", uid).get();
    return !snapshot.empty;
}

export async function addOrUpdateService(service: {
    serviceName: string;
    domainName: string;
    ownerId: string;
    lastUpdated: Date;
    blobURL: string;
}) {
    try {
        // query to see if this doc exists already
        const servicesRef = adminDb.collection("services");
        const snapshot = await servicesRef
            .where("serviceName", "==", service.serviceName)
            .where("ownerId", "==", service.ownerId)
            .get();

        // doc found
        if (!snapshot.empty) {
            const docRef = snapshot.docs[0].ref;
            await docRef.update({
                lastUpdated: service.lastUpdated,
                blobURL: service.blobURL,
            });
            return docRef.id;
        } else {
            // create new doc
            const docRef = await servicesRef.add({
                serviceName: service.serviceName,
                domainName: service.domainName,
                ownerId: service.ownerId,
                lastUpdated: service.lastUpdated,
                blobURL: service.blobURL,
            });

            // add service id to user's services array
            const userRef = adminDb.collection("users").doc(service.ownerId);
            await userRef.update({
                services: FieldValue.arrayUnion(docRef.id),
            });

            return docRef.id;
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

    // send to vercel blob storage
    let url = "testing url";
    // try {
    //     const blob = await put(uid + "-" + serviceName, file, { access: "private" });
    //     url = blob.url;
    // } catch (error) {
    //     return NextResponse.json({ error: "Blob upload failed" }, { status: 500 });
    // }

    if (url == "") {
        return NextResponse.json({ error: "Could not get blob URL" }, { status: 500 });
    }

    try {
        await addOrUpdateService({
            serviceName: serviceName,
            domainName: "a.cloudramp.com",
            ownerId: uid,
            lastUpdated: new Date(),
            blobURL: url,
        })
    } catch {
        return NextResponse.json({ error: "Failed to upload data to firestore" }, { status: 500 });
    }

    // You can now process the file and serviceName
    return NextResponse.json({ message: "Upload successful!" });
}