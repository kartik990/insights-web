import HomePage from "@/components/homepage";
import { getAllPosts } from "@/services/post";
import { PostInterface } from "@/types/post";
import React from "react";

const Home = async () => {
  const res = await getAllPosts();
  const posts = res.data as PostInterface[];

  return <HomePage posts={posts} />;
};

export default Home;
