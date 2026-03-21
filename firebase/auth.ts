import { app } from "./firebase";
import { getAuth, GoogleAuthProvider, signInWithPopup, signOut } from "firebase/auth";
import { addUserToFirestore } from "./firestore";

export const auth = getAuth(app);

export async function loginWithGoogle() {
    const provider = new GoogleAuthProvider();

    try {
        const result = await signInWithPopup(auth, provider);
        const user = result.user;
        await addUserToFirestore({
            uid: user.uid,
            email: user.email ?? "",
            name: user.displayName ?? "",
            services: [],
        });
        console.log("User signed in: ", user);
        return user;
    } catch (error) {
        console.error("Error during Google login: ", error);
        throw error;
    }
}

export async function logout() {
    try {
        await signOut(auth);
        console.log("User signed out");
    } catch (error) {
        console.error("Error during sign out:", error);
        throw error;
    }
}
