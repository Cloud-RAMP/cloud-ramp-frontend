import { type TextBlockProps, TextBlock } from "./TextBlock";

export default function Body(props: TextBlockProps) {
    return (
        <TextBlock {...props} className={`${props.className || ""}`} />
    );
}