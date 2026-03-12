"use client";

import Button from "@/components/Button";
import HStack from "@/components/layout/HStack";
import PageContainer from "@/components/layout/PageContainer";
import VStack from "@/components/layout/VStack";
import Label from "@/components/text/Label";
import InvalidAuth from "@/components/views/InvalidAuth";
import { useUser } from "@/contexts/UserContext";
import { useRouter } from "next/navigation";
import { useState } from "react";

type ServiceItemProps = {
    name: string;
    id: string;
};

function serviceItem({ name, id }: ServiceItemProps) {
    const router = useRouter();
    const [gap, setGap] = useState("gap-2");

    return (
        <div
            className="cursor-pointer"
            onClick={() => {
                router.push(`/services/${id}`);
            }}
            onMouseOver={() => setGap("gap-4")}
            onMouseOut={() => setGap("gap-2")}
        >
            <HStack className="transition-all" gap={gap}>
                <span>{name}</span>
                <span>→</span>
            </HStack>
        </div>
    );
}
export default function Dashboard() {
    const router = useRouter();
    const { user } = useUser();

    if (user == null) {
        return <InvalidAuth />
    }

    return (
        <PageContainer>
            <HStack gap="gap-8">
                <VStack align="left">
                    <Label>Your services</Label>
                    {serviceItem({ name: "testing", id: "testing" })}
                </VStack>
                <div className="h-full w-px py-12 bg-outline" />
                <VStack align="left">
                    probably put navigation to app insights and new app page
                    <Button
                        color="dark"
                        onClick={() => {
                            router.push("/upload");
                        }}
                    >
                        Create a new service
                    </Button>
                </VStack>
            </HStack>
        </PageContainer>
    );
}
