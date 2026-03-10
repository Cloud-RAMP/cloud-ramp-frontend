type HorizontalStackProps = {
  children: React.ReactNode;
  className?: string;
  gap?: string;
};

export default function HStack({
  children,
  className = "",
  gap = "gap-4",
}: HorizontalStackProps) {
  return (
    <div className={`flex flex-row ${gap} ${className}`}>
      {children}
    </div>
  );
}