import VStack from "./VStack";
import React from "react";

export default function PageContainer({
    children,
    className = "",
}: {
    children: React.ReactNode;
    className?: string;
}) {
    return (
        <VStack className={`justify-center h-screen w-full pt-16 ${className}`}>{children}</VStack>
    );
}
