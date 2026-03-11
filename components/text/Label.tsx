type HeadingProps = {
    children: React.ReactNode;
    className?: string;
};

export default function Label({ children, className = "" }: HeadingProps) {
    return <div className={`w-full font-bold ${className}`}>{children}</div>;
}
