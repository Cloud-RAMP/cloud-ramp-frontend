import { app } from "./firebase";
import { getFirestore, collection, setDoc, doc, query, where, getDocs } from "firebase/firestore";

const db = getFirestore(app);

export async function addUserToFirestore(user: { uid: string; email: string; name?: string, instances?: string[] }) {
    try {
        const userDocRef = doc(db, "users", user.uid);

        // Check if user already exists
        const q = query(collection(db, "users"), where("uid", "==", user.uid));
        const snapshot = await getDocs(q);

        if (!snapshot.empty) {
            return user.uid;
        }

        await setDoc(userDocRef, user);
        return user.uid;
    } catch (error) {
        console.error("Error adding user to Firestore:", error);
        throw error;
    }
}