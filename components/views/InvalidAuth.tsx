import Image from "next/image";
import PageContainer from "../layout/PageContainer";
import Heading from "../text/Heading";
import Body from "../text/Body";
import Button from "../Button";
import { useRouter } from "next/navigation";
import HStack from "../layout/HStack";
import { loginWithGoogle } from "@/firebase/auth";

export default function InvalidAuth() {
    const router = useRouter();
    return (
        <PageContainer className="circle-bg">
            <Image
                src="/lock.webp"
                alt="lock"
                height={200}
                width={200}
                className="bg-outline-light/50 p-12 rounded-[999px] shadow-2xs"
            />
            <br />
            <br />
            <Heading>Not logged in</Heading>
            <Body>You need to be logged in to access this page!</Body>
            <HStack>
                <Button children="Sign in" onClick={loginWithGoogle} className="bg-background" />
                <Button color="dark" onClick={() => router.push("/")}>
                    Home
                </Button>
            </HStack>
        </PageContainer>
    );
}
