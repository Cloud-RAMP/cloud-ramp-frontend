"use client";

import Button from "@/components/Button"
import VStack from "@/components/layout/VStack"
import { useState } from "react"

export default function Upload() {
    const [uploadedFile, setUploadedFile] = useState<File | null>();

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

    return (
        <VStack className="justify-center h-screen">
            upload your code
            <input 
                type="file" 
                className="border border-outline cursor-pointer" 
                accept=".wasm" 
                onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                    if (event.target.files && event.target.files.length > 0) {
                        setUploadedFile(event.target.files[0]);
                    }
                }}
            />
            <Button
                onClick={onSubmit}
            >
                submit
            </Button>
        </VStack>
    )
}