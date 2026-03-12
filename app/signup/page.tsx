"use client";

import Button from "@/components/Button";
import Body from "@/components/text/Body";
import HStack from "@/components/layout/HStack";
import VStack from "@/components/layout/VStack";
import Heading from "@/components/text/Heading";
import Image from "next/image";
import { loginWithGoogle } from "@/firebase/auth";
import { useRouter } from "next/navigation";

export default function Signup() {
    const router = useRouter();

    const handleGoogleSignup = async () => {
        try {
            await loginWithGoogle();
            router.push("/dashboard");
        } catch (error) {
            console.error("Google signup failed: ", error);
        }
    };

    return (
        <VStack className="justify-center h-screen" gap="gap-12">
            <VStack>
                <Heading>start your CloudRamp journey today</Heading>
                <Body>In order to use our services, you must first create an account</Body>
            </VStack>
            <Button onClick={handleGoogleSignup}>
                <HStack>
                    <Image src="/google_logo.svg" alt="Google logo" width={25} height={25} />
                    <div>sign up with google</div>
                </HStack>
            </Button>
        </VStack>
    );
}
