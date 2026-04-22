import { type TextBlockProps, TextBlock } from "./TextBlock";

export default function Heading(props: TextBlockProps) {
    return (
        <TextBlock {...props} className={`text-4xl font-bold ${props.className || ""}`} />
    );
}
