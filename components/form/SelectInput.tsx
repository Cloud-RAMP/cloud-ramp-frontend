"use client";

import { useState } from "react";
import VStack from "../layout/VStack";
import Label from "../text/Label";

export type SelectInputProps = {
    label: string;
    value: string;
    setValue: (_: string) => void;
    options: Array<{ value: string; label: string }>;
};

export default function SelectInput({ label, value, setValue, options }: SelectInputProps) {
    const [internalValue, setInternalValue] = useState(value)
    const isNew = internalValue == "__new__" || options.length == 0;

    return (
        <VStack align="left" gap="gap-1" className="w-full">
            <Label>{label}</Label>
            <select
                name={label}
                value={value}
                onChange={e => {
                    if (e.target.value === "__new__") {
                        setInternalValue("__new__");
                        setValue(e.target.value);
                    } else {
                        setValue(e.target.value);
                        setInternalValue(e.target.value);
                    }
                }}
                className="border border-outline w-full bg-background rounded font-sans px-2 py-2 focus:outline-none focus:border-dark"
            >
                <option value="__new__">New...</option>
                {options.map(opt => (
                    <option key={opt.value} value={opt.value}>
                        {opt.label}
                    </option>
                ))}
            </select>
            {isNew && (
                <input
                    type="text"
                    className="border border-outline w-full bg-background rounded font-sans px-2 py-2 mt-2 focus:outline-none focus:border-dark"
                    placeholder="Enter "
                    value={value === "__new__" ? "" : value}
                    onChange={e => setValue(e.target.value)}
                />
            )}
        </VStack>
    );
}
