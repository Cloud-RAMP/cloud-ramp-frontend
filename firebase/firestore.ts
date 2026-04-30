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

export function subscribeToServiceBilling(
    serviceId: string,
    callback: (billing: any | null) => void
): Unsubscribe {
    const billingColRef = collection(db, "services", serviceId, "billing");
    return onSnapshot(billingColRef, (snapshot) => {
        if (snapshot.empty) {
            callback(null);
            return;
        }

        const totals: any = {
            redisReads:          0,
            redisWrites:         0,
            redisPublishes:      0,
            firestoreReads:      0,
            firestoreWrites:     0,
            firestoreReadBytes:  0,
            firestoreWriteBytes: 0,
            outboundFetches:     0,
            outboundFetchBytes:  0,
            inboundRequests:     0,
            outboundBytes:       0,
        };

        snapshot.docs.forEach((doc) => {
            const d = doc.data();
            totals.redisReads          += d.redisReads          ?? 0;
            totals.redisWrites         += d.redisWrites         ?? 0;
            totals.redisPublishes      += d.redisPublishes      ?? 0;
            totals.firestoreReads      += d.firestoreReads      ?? 0;
            totals.firestoreWrites     += d.firestoreWrites     ?? 0;
            totals.firestoreReadBytes  += d.firestoreReadBytes  ?? 0;
            totals.firestoreWriteBytes += d.firestoreWriteBytes ?? 0;
            totals.outboundFetches     += d.outboundFetches     ?? 0;
            totals.outboundFetchBytes  += d.outboundFetchBytes  ?? 0;
            totals.inboundRequests     += d.inboundRequests     ?? 0;
            totals.outboundBytes       += d.outboundBytes       ?? 0;
        });

        callback(totals);
    });
}

export async function getServiceById(serviceId: string) {
  const serviceDoc = await getDoc(doc(db, "services", serviceId));
  return { id: serviceDoc.id, ...serviceDoc.data() };
}