import VStack from "@/components/layout/VStack";
import Body from "@/components/text/Body";
import Heading from "@/components/text/Heading";

export default function Home() {
    return (
        <VStack className="min-h-screen font-sans dark:bg-black justify-center square-bg" gap="gap-32">
            <VStack>
                <Heading>Build WebSocket apps, scale fast, remove overhead</Heading>
                <Heading className="font-bold">CloudRamp</Heading>
            </VStack>
            <VStack gap="gap-1">
                <Body>use cases</Body>
                <Heading>Rapidly deploy WebSocket apps without headache</Heading>
            </VStack>
        </VStack>
    );
}
