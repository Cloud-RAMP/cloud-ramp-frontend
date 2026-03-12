"use client";

import Button from "@/components/Button";
import FileInput from "@/components/form/FileInput";
import TextInput from "@/components/form/TextInput";
import PageContainer from "@/components/layout/PageContainer";
import VStack from "@/components/layout/VStack";
import Body from "@/components/text/Body";
import Heading from "@/components/text/Heading";
import InvalidAuth from "@/components/views/InvalidAuth";
import { useUser } from "@/contexts/UserContext";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function Upload() {
    const [uploadedFile, setUploadedFile] = useState<File | null>(null);
    const [serviceName, setServiceName] = useState("");
    const router = useRouter();
    const { user } = useUser();

    async function onSubmit() {
        // if (!uploadedFile) {
        //     // make some error here
        //     return;
        // }

        // upload the file to external blob store
        const serverUrl = "/api/fileUpload";
        const resp = await fetch(serverUrl, {
            method: "POST",
            body: uploadedFile,
        });
        const data = await resp.json();

        console.log(data);
    }

    if (user == null) {
        return <InvalidAuth />;
    }

    return (
        <PageContainer>
            <Heading>Upload your code</Heading>
            <Body>
                If you have a preexisting service with the same name, you will update the currently
                deployed code.
            </Body>
            <br />
            <VStack align="left" className="min-w-xl">
                <TextInput label="Service name" value={serviceName} setValue={setServiceName} />
                <FileInput
                    label="Upload your code"
                    value={uploadedFile}
                    setValue={setUploadedFile}
                />
            </VStack>
            <Button onClick={onSubmit} color="dark">
                submit
            </Button>
        </PageContainer>
    );
}
