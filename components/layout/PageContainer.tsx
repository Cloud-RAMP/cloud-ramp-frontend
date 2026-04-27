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
        <div className="h-screen w-full relative top-[-4em]">
                <div className={`fixed inset-0 z-0 h-full w-full top-32 ${bgClass} fade-bottom`} />
                    
                <VStack
                    {...rest}
                    className={`absolute left-0 top-24 py-8 z-10 w-full min-h-screen justify-center ${className}`}
                >
                    {children}
                </VStack>
            </div>
        );
    }

    return (
        <VStack {...rest} className={`justify-center min-h-screen w-full pt-32 pb-16 ${className}`}>
            {children}
        </VStack>
    );
}