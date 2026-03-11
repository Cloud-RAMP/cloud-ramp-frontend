type HeadingProps = {
    children: React.ReactNode;
    className?: string;
};

export default function Body({ children, className = "" }: HeadingProps) {
    return <div className={`w-full text-center ${className}`}>{children}</div>;
}
