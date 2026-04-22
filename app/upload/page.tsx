"use client";

import Button from "@/components/Button";
import FileInput from "@/components/form/FileInput";
import SelectInput from "@/components/form/SelectInput";
import PageContainer from "@/components/layout/PageContainer";
import VStack from "@/components/layout/VStack";
import Body from "@/components/text/Body";
import Heading from "@/components/text/Heading";
import InvalidAuth from "@/components/views/InvalidAuth";
import { useUser } from "@/contexts/UserContext";
import { useServicesQuery } from "@/firebase/queries";
import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from 'next/navigation';
import { fireErrorAlert, fireSuccessAlert } from "@/components/alerts";

export default function Upload() {
    const [uploadedFile, setUploadedFile] = useState<File | null>(null);
    const [serviceName, setServiceName] = useState("");
    const { user } = useUser();
    const { loading, services } = useServicesQuery(user);
    const searchParams = useSearchParams();
    const serviceId = searchParams.get('serviceId');
    const router = useRouter();

    async function onSubmit() {
        try {
            if (!uploadedFile || serviceName == "" || user == null) {
                // make some error here
                fireErrorAlert("Missing required fields!");
                return;
            }
    
            // send to backend to upload to external file stores
            const formData = new FormData();
            formData.append("file", uploadedFile);
            formData.append("serviceName", serviceName);
            formData.append("uid", user.uid);
    
            const serverUrl = "/api/upload";
            const resp = await fetch(serverUrl, {
                method: "POST",
                body: formData,
            });
            const data = await resp.json();
    
            if (data.message == "Upload successful!") {
                fireSuccessAlert("Upload successful!");
                router.push("/dashboard");
            }
        } catch (e) {
            console.error(e);
            fireErrorAlert("Failed to upload service!");
        }
    }

    // update service name immediately if they come to edit it
    useEffect(() => {
        if (!serviceId) {
            return;
        }

        for (const s of services) {
            if (s.id == serviceId) {
                setServiceName(s.serviceName);
            }
        }
    }, [searchParams, services]);

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
            <VStack align="left" className="min-w-xl" gap="gap-8">
                <SelectInput 
                    label="Service name"
                    value={serviceName}
                    setValue={setServiceName}
                    options={services.map((s: any) => ({
                        value: s.serviceName,
                        label: s.serviceName,
                    }))}
                />
                <FileInput
                    label="Upload your code"
                    value={uploadedFile}
                    setValue={setUploadedFile}
                />
            </VStack>
            <Button onClick={onSubmit} color="dark">
                Submit
            </Button>
        </PageContainer>
    );
}
