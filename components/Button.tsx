"use client";

type ButtonProps = {
    children: React.ReactNode;
    color?: "light" | "dark";
    className?: string;
    onClick?: () => void;
};

export default function Button({ children, color = "light", className = "", onClick }: ButtonProps) {
    let buttonClass =
        `px-3 py-2 border rounded shadow-sm cursor-pointer font-semibold text-sm antialiased select-none ${className}`;
    if (color == "dark") {
        buttonClass += " bg-dark text-white border-none";
    } else {
        buttonClass += " border-outline bg-background";
    }

    return (
        <button onClick={onClick} className={buttonClass}>
            {children}
        </button>
    );
}
