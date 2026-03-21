import VStack from "./VStack";
import React from "react";

export default function PageContainer({
    children,
    className = "",
    background = "",
    ...rest
}: {
    children: React.ReactNode;
    className?: string;
    background?: "" | "square" | "circle" | "tilted-square"
    [key: string]: any;
}) {

    if (background !== "") {
        const bgClass = background + "-bg";

        return (
            <div className="h-screen w-full">
                <div className={`fixed inset-0 z-0 h-full w-full ${bgClass} fade-bottom`} />
                    
                <VStack
                    {...rest}
                    className={`absolute left-0 top-16 py-8 z-10 w-full min-h-screen justify-center ${className}`}
                >
                    {children}
                </VStack>
            </div>
        );
    }

    return (
        <VStack {...rest} className={`justify-center h-screen w-full pt-16 ${className}`}>
            {children}
        </VStack>
    );
}