type VerticalStackProps = {
  children: React.ReactNode;
  className?: string;
  gap?: string;
  center?: boolean;
};

export default function VStack({
  children,
  className = "",
  gap = "gap-4",
  center = true
}: VerticalStackProps) {
  return (
    <div className={`flex flex-col ${gap} ${className} ${center ? "text-center" : ""}`}>
      {children}
    </div>
  );
}