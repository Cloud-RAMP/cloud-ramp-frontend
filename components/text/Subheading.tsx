import { type TextBlockProps, TextBlock } from "./TextBlock";

export default function Subheading(props: TextBlockProps) {
    return (
        <TextBlock {...props} className={`text-2xl font-bold ${props.className || ""}`} />
    );
}
