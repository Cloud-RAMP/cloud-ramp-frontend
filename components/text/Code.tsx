type CodeProps = {
    children: React.ReactNode;
    className?: string;
};

export default function Code({ children, className = "" }: CodeProps) {
    return (
        <div className={`w-full flex flex-col bg-outline/10 
        border-outline border text-sm text-left ${className}`}>
            <pre>
                <code>
                    {children}
                </code>
            </pre>
        </div>
    );
}
