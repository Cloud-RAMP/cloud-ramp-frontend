import VStack from "./VStack";
import React from "react";

export default function PageContainer({
    children,
    className = "",
    ...rest
}: {
    children: React.ReactNode;
    className?: string;
    [key: string]: any;
}) {
    return (
        <VStack {...rest} className={`justify-center h-screen w-full pt-16 ${className}`}>{children}</VStack>
    );
}
