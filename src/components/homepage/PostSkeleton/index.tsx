import { Skeleton } from "@/components/ui/skeleton";

const PostSkeleton = () => {
  return (
    <div className="w-[60%] flex flex-col gap-2">
      <Skeleton className="h-12 rounded-3xl" />
      <div className="flex gap-2">
        <Skeleton className="w-[50%] h-60 rounded-3xl" />
        <Skeleton className="w-[50%] h-60 rounded-3xl" />
      </div>
      <Skeleton className="h-12 rounded-3xl" />
    </div>
  );
};

export default PostSkeleton;
