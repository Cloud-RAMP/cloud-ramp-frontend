import { app } from "./firebase";
import { getFirestore, collection, setDoc, doc, query, where, getDocs, getDoc, onSnapshot, Unsubscribe } from "firebase/firestore";

const db = getFirestore(app);

export async function addUserToFirestore(user: { uid: string; email: string; name?: string, services?: string[] }) {
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

export async function doesUserExist(uid: string): Promise<any> {
    const q = query(collection(db, "users"), where("uid", "==", uid));
    const snapshot = await getDocs(q);
    return !snapshot.empty;
}

export async function getUserServices(uid: string): Promise<any[]> {
    const userDoc = await getDoc(doc(db, "users", uid));
    const serviceIds = userDoc.data()?.services || [];

    const servicePromises = serviceIds.map(async (id: string) => {
        const serviceDoc = await getDoc(doc(db, "services", id));
        return { id: serviceDoc.id, ...serviceDoc.data() };
    });

    const services = await Promise.all(servicePromises);

    return services;
}

export function subscribeToServiceLogs(
    serviceId: string,
    callback: (logs: any[]) => void
): Unsubscribe {
    const logsColRef = collection(db, "services", serviceId, "logs");
    return onSnapshot(logsColRef, (snapshot) => {
        const logs = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        callback(logs);
    });
}