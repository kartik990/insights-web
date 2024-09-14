import { cn } from "@/lib/utils";

function Skeleton({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn(
        "animate-pulse rounded-md bg-[#55ad9b8c] dark:bg-[#55ad9b97]",
        className
      )}
      {...props}
    />
  );
}

export { Skeleton };
