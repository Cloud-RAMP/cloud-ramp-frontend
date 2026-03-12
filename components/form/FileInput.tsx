"use state";

import VStack from "../layout/VStack";
import Label from "../text/Label";

type FileInputProps = {
    label: string;
    value: File | null;
    accept?: string;
    setValue: (_: File) => void;
};

export default function FileInput({ label, value, setValue, accept = ".wasm" }: FileInputProps) {
    return (
        <VStack align="left" gap="gap-1" className="w-full">
            <Label>{label}</Label>
            <label
                htmlFor={label}
                className="w-full aspect-7/3 border-2 border-dashed border-outline rounded-lg flex items-center justify-center cursor-pointer transition hover:bg-outline-light/50"
            >
                {value == null ? (
                    <div className="text-center">
                        <p className="font-medium">Click to upload</p>
                        <p className="text-sm text-gray-500">or drag and drop</p>
                    </div>
                ) : (
                    <div className="text-center">
                        <p className="font-medium">Current file</p>
                        <p className="text-sm text-gray-500">{value.name}</p>
                    </div>
                )}
                <input
                    name={label}
                    id={label}
                    type="file"
                    className="hidden"
                    accept={accept}
                    onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                        if (event.target.files && event.target.files.length > 0) {
                            setValue(event.target.files[0]);
                        }
                    }}
                />
            </label>
        </VStack>
    );
}
