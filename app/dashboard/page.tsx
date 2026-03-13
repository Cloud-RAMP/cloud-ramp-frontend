"use client";

import Button from "@/components/Button";
import Loader from "@/components/icons/Loader";
import HStack from "@/components/layout/HStack";
import PageContainer from "@/components/layout/PageContainer";
import VStack from "@/components/layout/VStack";
import Label from "@/components/text/Label";
import InvalidAuth from "@/components/views/InvalidAuth";
import { useUser } from "@/contexts/UserContext";
import { getUserServices } from "@/firebase/firestore";
import { useServicesQuery } from "@/firebase/queries";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

type ServiceItemProps = {
    name: string;
    id: string;
};

function ServiceItem({ name, id }: ServiceItemProps) {
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
    const { loading, services } = useServicesQuery(user);

    if (user == null) {
        return <InvalidAuth />
    }

    return (
        <PageContainer>
            <HStack divided={true} dividerClassName="py-12" gap="gap-8">
                <VStack align="left">
                    <Label>Your services</Label>
                    {loading ? (
                        <Loader type="dots" />
                    ) : services.map((s: any) => 
                        <ServiceItem name={s.serviceName} id={s.id} key={s.id} />
                    )}
                </VStack>
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
