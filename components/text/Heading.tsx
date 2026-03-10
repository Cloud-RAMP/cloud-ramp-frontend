type HeadingProps = {
  children: React.ReactNode;
  className?: string;
};

export default function Heading({ children, className = "" }: HeadingProps) {
  return (
    <div className={`w-full text-4xl flex flex-col text-center gap-6 ${className}`}>
      {children}
    </div>
  );
}