"use client";

import { fireErrorAlert } from "@/components/alerts";
import Button from "@/components/Button";
import Loader from "@/components/icons/Loader";
import HStack from "@/components/layout/HStack";
import PageContainer from "@/components/layout/PageContainer";
import VStack from "@/components/layout/VStack";
import Body from "@/components/text/Body";
import Label from "@/components/text/Label";
import InvalidAuth from "@/components/views/InvalidAuth";
import { useUser } from "@/contexts/UserContext";
import { useServicesQuery } from "@/firebase/queries";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

type ServiceItemProps = {
    name: string;
    id: string;
};

function ServiceItem({ name, id }: ServiceItemProps) {
    const router = useRouter();
    const [left, setLeft] = useState("left-2");

    return (
        <div
            className="cursor-pointer"
            onClick={() => {
                router.push(`/services/${id}`);
            }}
            onMouseOver={() => setLeft("left-4")}
            onMouseOut={() => setLeft("left-2")}
        >
            <HStack className="transition-all">
                <span>{name}</span>
                <span className={`relative ${left} transition-all`}>→</span>
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
            <HStack divided={true} dividerClassName="py-12" gap="gap-10">
                <VStack align="left" className="pr-8">
                    <Label>Your services</Label>
                    {loading ? (
                        <Loader type="dots" />
                    ) : services.length > 0 ? (
                        services.map((s: any) => 
                            <ServiceItem name={s.serviceName} id={s.id} key={s.id} />
                        )
                    ) : (
                        <div>
                            No services
                        </div>
                    )}
                </VStack>
                <VStack align="left">
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
