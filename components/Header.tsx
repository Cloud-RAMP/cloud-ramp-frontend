"use client";

import Image from "next/image";
import Button from "./Button";
import HStack from "./layout/HStack";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { loginWithGoogle, logout } from "@/firebase/auth";
import { useUser } from "@/contexts/UserContext";

export default function Header() {
    const router = useRouter();
    const { user } = useUser();

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
                {user ? (
                    <>
                        <Button 
                            children="Dashboard" 
                            onClick={() => {
                                router.push("/dashboard");
                            }}
                            />
                        <Button children="Sign out" 
                            color="dark" 
                            onClick={logout}
                        />
                    </>
                ) : (
                <>
                    <Button children="Sign in" 
                        onClick={loginWithGoogle}
                    />
                    <Button 
                        children="Get Started" 
                        color="dark" 
                        onClick={() => {
                            router.push("/signup");
                        }}
                    />
                </>
                )}
            </HStack>
            </div>
        </div>
    );
}
