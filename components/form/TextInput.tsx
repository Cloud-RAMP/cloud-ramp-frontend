import VStack from "../layout/VStack";
import Label from "../text/Label";

type TextInputProps = {
    label: string;
    value: string;
    setValue: (_: string) => void;
};

export default function TextInput({ label, value, setValue }: TextInputProps) {
    return (
        <VStack align="left" gap="gap-0" className="w-full">
            <Label>{label}</Label>
            <input
                name={label}
                type="text"
                value={value}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                    setValue(e.target.value);
                }}
                className="border border-outline w-full bg-background rounded font-sans px-2 py-1 focus:outline-none focus:border-dark"
            />
        </VStack>
    );
}
