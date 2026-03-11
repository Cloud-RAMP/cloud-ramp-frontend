import VStack from "./VStack";
import React from "react";

export default function PageContainer({ children }: { children: React.ReactNode }) {
    return <VStack className="justify-center h-screen w-full">{children}</VStack>;
}
