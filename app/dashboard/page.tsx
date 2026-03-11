"use client";

import Button from "@/components/Button";
import PageContainer from "@/components/layout/PageContainer";
import { useRouter } from "next/navigation";

export default function Dashboard() {
    const router = useRouter();

    return (
        <PageContainer>
            probably put navigation to app insights and new app page
            <Button
                color="dark"
                onClick={() => {
                    router.push("/upload");
                }}
            >
                Create a new service
            </Button>
        </PageContainer>
    );
}
