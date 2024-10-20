"use client";

import React from "react";
import Post from "./Post";
import PostSkeleton from "./PostSkeleton";
import { PostInterface } from "@/types/post";

interface HomePageProps {
  posts: PostInterface[];
}

const HomePage: React.FC<HomePageProps> = ({ posts }) => {
  return (
    <div className="flex flex-col items-center gap-12 py-8 mx-auto ">
      {posts.map((post, idx: number) => {
        return <Post key={idx} post={post} owner={post?.user} />;
      })}
    </div>
  );
};

export default HomePage;
