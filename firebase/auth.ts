import { app } from "./firebase";
import { getAuth, GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { addUserToFirestore } from "./firestore";

export async function loginWithGoogle() {
    const auth = getAuth(app);
    const provider = new GoogleAuthProvider();

    try {
        const result = await signInWithPopup(auth, provider);
        const user = result.user;
        await addUserToFirestore({
            uid: user.uid,
            email: user.email ?? "",
            name: user.displayName ?? ""
        });
        console.log("User signed in: ", user);
        return user;
    } catch (error) {
        console.error("Error during Google login: ", error);
        throw error;
    }
}