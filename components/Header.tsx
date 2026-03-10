import Image from "next/image";
import Button from "./Button";

export default function Header() {
    return (
        <div className="w-full border-b border-outline py-4 px-12 fixed font-sans">
            <div className="max-w-capped-width flex justify-center mx-auto">
            <div className="font-bold text-xl">
                {/* <Image src="https://avatars.githubusercontent.com/u/260287700?s=400&u=9f28e6bc1265c5180dd2fa195850b32a8b167058&v=4" alt="logo" width="50" height="50" /> */}
                ☁️ Cloud
                <span className="font-normal">Ramp</span>
            </div>
            <div className="flex-1 flex justify-evenly"></div>
            <div className="flex gap-2">
                <Button label="Sign in" />
                <Button label="Get Started" color="dark" />
            </div>
            </div>
        </div>
    );
}
