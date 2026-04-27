"use client";

import { fireErrorAlert } from "@/components/alerts";
import Button from "@/components/Button";
import PageContainer from "@/components/layout/PageContainer";
import VStack from "@/components/layout/VStack";
import Body from "@/components/text/Body";
import Code from "@/components/text/Code";
import Heading from "@/components/text/Heading";
import Subheading from "@/components/text/Subheading";
import { useUser } from "@/contexts/UserContext";
import { loginWithGoogle } from "@/firebase/auth";
import { useRouter } from "next/navigation";

export default function Home() {
    const { user } = useUser();
    const router = useRouter();

    return (
        <PageContainer className="gap-32 font-sans dark:bg-black pt-72" background="tilted-square" divided={true}>
            <VStack gap="gap-8">
                <VStack gap="gap-2">
                    <Heading>Build WebSocket apps, scale fast, remove overhead</Heading>
                    <Subheading className="font-normal">Rapidly deploy your app without headache</Subheading>                    
                </VStack>
                <Heading className="font-bold mb-2">CloudRamp</Heading>
                {user ? (
                    <Button color="dark" onClick={() => router.push("/dashboard")}>
                        Continue to dashboard
                    </Button>
                ) : (
                    <Button color="dark" onClick={async () => {
                        try {
                            await loginWithGoogle();
                            router.push('/dashboard');
                        } catch (e) {
                            fireErrorAlert("Failed to login");
                        }
                    }}>
                        Log in
                    </Button>
                )}
            </VStack>
            <VStack gap="gap-8">
                <Heading>
                    WebSockets, simplified.
                </Heading>
                <VStack>
                    <Subheading>
                        Why CloudRamp?
                    </Subheading>
                    <Body className="px-24">
                        Using CloudRamp is as easy as walking. We designed CloudRamp to be developer-first, 
                        removing the need to link together multiple services, and simply allowing you to interact with it all in one spot.
                    </Body>
                </VStack>
                <VStack className="px-24">
                    <Subheading>
                        How to use
                    </Subheading>
                    <Body>
                        Upon starting a new CloudRamp project, you must first use our SDK to write your code.
                        Create a new directory, and run "npm i cloud-ramp-sdk". This will provide you with all the necessary methods
                        to create a new app.
                        <br />
                        From there, you can simply write your code in the "user.ts" file, build it with "npm run asbuild", and upload it to our site!
                        You will need an account, but don't worry, it's all free! (for now...)
                    </Body>
                </VStack>
                <br />
            </VStack>
        </PageContainer>
    );
}
