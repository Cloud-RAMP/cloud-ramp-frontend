type VerticalStackProps = {
  children: React.ReactNode;
  className?: string;
  gap?: string;
  align?: "left" | "center" | "right";
};

export default function VStack({
  children,
  className = "",
  gap = "gap-4",
  align = "center"
}: VerticalStackProps) {
  
  const alignClasses = {
    left: "text-left items-start",
    center: "text-center items-center",
    right: "text-right items-end",
  };

  return (
    <div className={`flex flex-col ${gap} ${alignClasses[align]} ${className}`}>
      {children}
    </div>
  );
}