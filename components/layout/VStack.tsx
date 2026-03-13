import React from "react";

type VerticalStackProps = {
    children: React.ReactNode;
    className?: string;
    gap?: string;
    align?: "left" | "center" | "right";
    divided?: boolean,
    dividerClassName?: string,
};

export default function VStack({
    children,
    className = "",
    gap = "gap-4",
    align = "center",
    divided = false,
    dividerClassName = "",
}: VerticalStackProps) {
    const alignClasses = {
        left: "text-left items-start",
        center: "text-center items-center",
        right: "text-right items-end",
    };

    const childrenCount = React.Children.count(children);

    return (
        <div className={`flex flex-col ${gap} ${alignClasses[align]} ${className}`}>
            {divided 
                ? React.Children.map(children, (child, idx) => {
                    return (
                        <>
                            {child}
                            {idx !== childrenCount - 1 && (
                                <div className={`w-full h-px bg-outline ${dividerClassName}`} />
                            )}
                        </>
                    );
                })
                : React.Children.map(children, (child) => child)
            }
        </div>
    );
}
