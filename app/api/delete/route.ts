import { NextRequest, NextResponse } from "next/server";
import { cert, getApps, initializeApp } from "firebase-admin/app";
import { getFirestore, FieldValue } from "firebase-admin/firestore";

if (!getApps().length) {
  const serviceAccount = JSON.parse(process.env.FIREBASE_SERVICE_ACCOUNT_JSON!);
  initializeApp({ credential: cert(serviceAccount) });
}
const adminDb = getFirestore();

async function doesUserExist(uid: string): Promise<boolean> {
  const usersRef = adminDb.collection("users");
  const snapshot = await usersRef.where("uid", "==", uid).get();
  return !snapshot.empty;
}

export async function DELETE(request: NextRequest) {
  const { serviceId, uid } = await request.json();

  if (!serviceId || !uid) {
    return NextResponse.json({ error: "Bad Request" }, { status: 400 });
  }

  // Check user existence
  try {
    const exists = await doesUserExist(uid);
    if (!exists) {
      return NextResponse.json({ error: "Invalid permissions" }, { status: 403 });
    }
  } catch {
    return NextResponse.json({ error: "Bad Request" }, { status: 400 });
  }

  try {
    // Delete the service document
    await adminDb.collection("services").doc(serviceId).delete();

    // Remove serviceId from user's services array
    const userRef = adminDb.collection("users").doc(uid);
    await userRef.update({
      services: FieldValue.arrayRemove(serviceId),
    });

    return NextResponse.json({ message: "Service deleted successfully!" });
  } catch (error) {
    console.error("Error deleting service:", error);
    return NextResponse.json({ error: "Failed to delete service" }, { status: 500 });
  }
}