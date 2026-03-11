import { app } from "./firebase";
import { getFirestore, collection, addDoc } from "firebase/firestore";

const db = getFirestore(app);

export async function addUserToFirestore(user: { uid: string; email: string; name?: string }) {
    try {
        const docRef = await addDoc(collection(db, "users"), user);
        return docRef.id; // returns the new document ID
    } catch (error) {
        console.error("Error adding user to Firestore:", error);
        throw error;
    }
}