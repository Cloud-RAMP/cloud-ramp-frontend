import React from "react";

type HorizontalStackProps = {
    children: React.ReactNode;
    className?: string;
    gap?: string;
    align?: "left" | "center" | "right";
    divided?: boolean,
    dividerClassName?: string,
};

export default function HStack({
    children,
    className = "",
    gap = "gap-4",
    align = "center",
    divided = false,
    dividerClassName = "",
}: HorizontalStackProps) {
    const alignClasses = {
        left: "text-left items-start",
        center: "text-center items-center",
        right: "text-right items-end",
    };
    const childrenCount = React.Children.count(children);

    return (
        <div className={`flex flex-row ${gap} ${alignClasses[align]} ${className}`}>
            {divided 
                ? React.Children.map(children, (child, idx) => {
                    return (
                        <>
                            {child}
                            {idx !== childrenCount - 1 && (
                                <div className={`h-full w-px bg-outline ${dividerClassName}`} />
                            )}
                        </>
                    );
                })
                : React.Children.map(children, (child) => child)
            }
        </div>
    );
}
