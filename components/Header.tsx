import Image from "next/image";
import Button from "./Button";
import HStack from "./layout/HStack";
import Link from "next/link";

export default function Header() {
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
            <div className="flex gap-2">
                <Button children="Sign in" />
                <Button children="Get Started" color="dark" />
            </div>
            </div>
        </div>
    );
}
