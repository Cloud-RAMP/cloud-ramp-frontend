"use client";

import Button from "@/components/Button";
import PageContainer from "@/components/layout/PageContainer";
import Body from "@/components/text/Body";
import Heading from "@/components/text/Heading";
import { useRouter } from "next/navigation";

export default function Error() {
    const router = useRouter();

    return (
        <PageContainer background="square">
            <Heading>
                You got an error!
            </Heading>
            <Body>
                Head back to the homepage and try again
            </Body>
            <Button color="dark" onClick={() => router.push('/')}>
                Home
            </Button>
        </PageContainer>
    )
}