import VStack from "@/components/layout/VStack"
import Heading from "@/components/text/Heading";

export default function Home() {
    return (
        <div className="flex min-h-screen items-center justify-center font-sans dark:bg-black">
            <VStack>
                <Heading>Build WebSocket apps, scale fast, remove overhead</Heading>
                <Heading className="font-bold">CloudRamp</Heading>
            </VStack>
        </div>
    );
}
