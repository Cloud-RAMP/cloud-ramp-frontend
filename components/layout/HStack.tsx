type HorizontalStackProps = {
  children: React.ReactNode;
  className?: string;
  gap?: string;
  align?: "left" | "center" | "right";
};

export default function HStack({
  children,
  className = "",
  gap = "gap-4",
  align = "center"
}: HorizontalStackProps) {

  const alignClasses = {
    left: "text-left items-start",
    center: "text-center items-center",
    right: "text-right items-end",
  };

  return (
    <div className={`flex flex-row ${gap} ${alignClasses[align]} ${className}`}>
      {children}
    </div>
  );
}