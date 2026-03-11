"use client";

import Image from "next/image";
import Button from "./Button";
import HStack from "./layout/HStack";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { loginWithGoogle } from "@/firebase/auth";

export default function Header() {
    const router = useRouter();
    return (
        <div className="w-full border-b border-outline py-4 px-12 fixed font-sans">
            <div className="max-w-capped-width flex justify-center mx-auto">
            <Link href="/">
                <HStack className="font-bold text-xl" gap="gap-2">
                    <Image src="/logo.png" alt="logo" width="50" height="50" />
                    <span>
                        Cloud
                        <span className="font-normal">Ramp</span>
                    </span>
                </HStack>
            </Link>
            <div className="flex-1 flex justify-evenly"></div>
            <HStack>
                <Button children="Sign in" 
                    onClick={async () => {
                        try {
                            const user = await loginWithGoogle();
                            console.log("Signed in user: ", user);
                        } catch (error) {
                            console.error("Google signup failed: ", error);
                        }
                    }}
                />
                <Button 
                    children="Get Started" 
                    color="dark" 
                    onClick={() => {
                        router.push("/signup");
                    }}
                />
            </HStack>
            </div>
        </div>
    );
}
