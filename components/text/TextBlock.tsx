export type TextBlockProps = {
    children: React.ReactNode;
    className?: string;
    align?: "left" | "center" | "right";
};

export function TextBlock({ children, className = "", align = "center" }: TextBlockProps) {
    const alignClasses = {
        left: "text-left",
        center: "text-center",
        right: "text-right",
    };
    return (
        <div className={`w-full ${alignClasses[align]} ${className}`}>
            {children}
        </div>
    );
}