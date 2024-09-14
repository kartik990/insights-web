import React from "react";
import Post from "./Post";
import { Skeleton } from "@/components/ui/skeleton";
import PostSkeleton from "./PostSkeleton";

interface HomePageProps {}

const HomePage: React.FC<HomePageProps> = () => {
  return (
    <div className="flex flex-col items-center gap-12 py-8 mx-auto ">
      <Post />
      <Post />
      <Post />
      <PostSkeleton />
      <PostSkeleton />
      <PostSkeleton />
    </div>
  );
};

export default HomePage;
