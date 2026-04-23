import { type TextBlockProps, TextBlock } from "./TextBlock";

export default function Bold(props: TextBlockProps) {
    return (
        <TextBlock {...props} className={`font-bold ${props.className || ""}`} />
    );
}