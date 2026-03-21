import PageContainer from "@/components/layout/PageContainer";
import VStack from "@/components/layout/VStack";
import Heading from "@/components/text/Heading";

export default function Home() {
    return (
        <PageContainer className="gap-32 font-sans dark:bg-black" background="tilted-square">
            <VStack>
                <Heading>Build WebSocket apps, scale fast, remove overhead</Heading>
                <Heading className="font-bold">CloudRamp</Heading>
            </VStack>
            {/* <VStack gap="gap-1">
                <Body>use cases</Body>
                <Heading>Rapidly deploy WebSocket apps without headache</Heading>
            </VStack> */}
        </PageContainer>
    );
}
