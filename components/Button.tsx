type ButtonProps = {
    label: string;
    color?: "light" | "dark";
    onClick?: () => void;
};

export default function Button({ label, color = "light", onClick }: ButtonProps) {
    let buttonClass = "px-3 py-1 border rounded-full shadow-sm cursor-pointer font-semibold";
    if (color == "dark") {
        buttonClass += " bg-black text-white border-none"
    }

    return (
        <button
            onClick={onClick}
            className={buttonClass}
        >
            {label}
        </button>
    );
}
