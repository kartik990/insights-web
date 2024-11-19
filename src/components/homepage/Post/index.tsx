"use client";

import Image from "next/image";
import {
  Calendar,
  Loader,
  MessageCircle,
  SendHorizontal,
  Share2,
  ThumbsDown,
  ThumbsUp,
} from "lucide-react";
import React, { useContext, useState } from "react";
import { AddCommentPayload, Comment, PostInterface } from "@/types/post";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselPrevious,
  CarouselNext,
} from "@/components/ui/carousel";
import Link from "next/link";
import { addComment, getComments, postInteraction } from "@/services/post";
import { UserContext } from "@/contexts/userContext";
import { useMutation, useQuery } from "@tanstack/react-query";

interface PostProps {
  post: PostInterface;
  owner?: {
    id?: string;
    name?: string;
    profileUrl?: string;
  };
}

type UserLike = "like" | "unlike" | "neither";

const Post: React.FC<PostProps> = ({ post, owner }) => {
  const { user } = useContext(UserContext);

  const [showComment, setShowComment] = useState(false);
  const [commentInput, setCommentInput] = useState("");
  const [interaction, setInteraction] = useState<{
    likes: number;
    unlikes: number;
    userLiked: UserLike;
  }>(() => {
    let likes = 0;
    let unlikes = 0;
    let userLiked: UserLike = "neither";

    post?.postInteractions?.forEach(({ liked, userId }) => {
      liked ? likes++ : unlikes++;
      if (user?.userId && userId == +user?.userId) {
        userLiked = liked ? "like" : "unlike";
      }
    });

    return {
      likes,
      unlikes,
      userLiked,
    };
  });

  const [loading, setLoading] = useState(false);

  const {
    data,
    isLoading: loadingComments,
    refetch: fetchComments,
  } = useQuery({
    queryKey: ["post", post.id, "comments"],
    queryFn: () => getComments(post.id),
    enabled: false,
  });

  const { mutate, isPending } = useMutation({
    mutationFn: (payload: AddCommentPayload) => addComment(payload),
    onSuccess: () => {
      fetchComments();
      setCommentInput("");
    },
  });

  const handleInteraction = async (type: "like" | "unlike") => {
    if (!user?.userId || loading || interaction.userLiked == type) return;

    setInteraction((prev) => {
      if (prev.userLiked == "neither") {
        return {
          likes: type == "like" ? prev.likes + 1 : prev.likes,
          unlikes: type == "unlike" ? prev.unlikes + 1 : prev.unlikes,
          userLiked: type,
        };
      } else {
        return {
          likes:
            prev.userLiked == "like" && type == "unlike"
              ? prev.likes - 1
              : prev.likes + 1,
          unlikes:
            prev.userLiked == "unlike" && type == "like"
              ? prev.unlikes - 1
              : prev.unlikes + 1,
          userLiked: type,
        };
      }
    });

    try {
      setLoading(true);

      const res = await postInteraction({
        postId: "" + post.id,
        userId: user?.userId,
        type,
      });
    } catch (err) {
      console.log(err);

      setInteraction((prev) => ({
        likes: prev.userLiked == "like" ? prev.likes - 1 : prev.likes,
        unlikes: prev.userLiked == "unlike" ? prev.unlikes - 1 : prev.unlikes,
        userLiked: "neither",
      }));
    }

    setLoading(false);
  };

  const handleCommentToggle = () => {
    if (!data) fetchComments();

    setCommentInput("");
    setShowComment((prev) => !prev);
  };

  const createComment = () => {
    if (commentInput == "" || !user?.userId) return;

    mutate({
      userId: +user?.userId,
      postId: post.id,
      comment: commentInput,
    });
  };

  //@ts-ignore
  const comments: undefined | Comment[] = data?.data?.comments;

  return (
    <div className="w-[90%] sm:w-[60%]">
      <div className="flex flex-col gap-2 text-[#319783]">
        <div className="rounded-xl w-full flex justify-between items-center gap-2 sm:gap-8 bg-[#fff] px-4 py-2 pl-2 shadow-md rounded-l-3xl">
          <Link
            href={`/profile/${owner?.id}`}
            className="flex items-center gap-2"
          >
            {owner?.profileUrl ? (
              <Image
                src={owner?.profileUrl}
                alt="profile"
                width={500}
                height={500}
                className="w-8 sm:w-10 rounded-full"
              />
            ) : (
              owner?.name![0]
            )}
            <div className="text-lg sm:text-xl font-semibold">
              {owner?.name}
            </div>
          </Link>
          <div className="opacity-70 flex gap-1 sm:gap-2 items-center text-sm sm:text-md">
            <Calendar className="w-4 sm:w-auto" />
            {`${new Date(post.createdAt).toLocaleDateString("en-US", {
              year: "numeric",
              month: "short",
              day: "numeric",
            })}`}
          </div>
        </div>
        <div className="flex flex-col sm:flex-row justify-center gap-2 w-full">
          {post?.imgUrl?.length ? (
            <Carousel className="w-full sm:w-1/2">
              <CarouselContent>
                {post?.imgUrl.map((url, index) => (
                  <CarouselItem key={index}>
                    <Image
                      src={url}
                      alt="image"
                      width={500}
                      height={500}
                      className="object-cover rounded-xl shadow-md h-72 "
                    />
                  </CarouselItem>
                ))}
              </CarouselContent>
              {post?.imgUrl?.length > 1 && (
                <>
                  <CarouselPrevious />
                  <CarouselNext />
                </>
              )}
            </Carousel>
          ) : null}
          <div className="bg-white min-h-60 py-4 px-5 flex-1 rounded-xl text-[#319783] shadow-md">
            <div className="text-2xl mb-2 font-semibold">{post.title}</div>
            <div>{post.content}</div>
          </div>
        </div>
        <div className="bg-[#fff] p-4 py-3 text-[#55AD9B] flex flex-col gap-2 rounded-xl transition-all ease-in duration-300 rounded-b-3xl	shadow-md">
          <div className="flex gap-2 transition-all ease-in duration-300	">
            <button
              onClick={() => handleInteraction("like")}
              className={` flex gap-2 text-lg  rounded-2xl px-2 py-1 cursor-pointer  ${
                interaction.userLiked == "like"
                  ? "bg-primary text-[#fff] shadow-md"
                  : "text-primary"
              }`}
            >
              <ThumbsUp size={24} /> {interaction.likes}
            </button>
            <button
              onClick={() => handleInteraction("unlike")}
              className={` flex gap-2 text-lg  rounded-2xl px-2 py-1 cursor-pointer  ${
                interaction.userLiked == "unlike"
                  ? "bg-primary text-[#fff] shadow-md"
                  : "text-primary"
              }`}
            >
              <ThumbsDown size={24} className="mt-1" /> {interaction.unlikes}
            </button>
            <div
              className="cursor-pointer px-0 py-1"
              onClick={handleCommentToggle}
            >
              <MessageCircle size={26} />
            </div>
            {showComment && (
              <div className="hidden sm:flex w-full gap-2">
                <input
                  className="border-b-2 border-primary w-full outline-none ml-2 transition-all ease-in duration-300 px-2 bg-white shadow-inner"
                  value={commentInput}
                  onKeyDown={(e) => (e.key == "Enter" ? createComment() : null)}
                  onChange={(e) => setCommentInput(e?.target?.value)}
                  autoFocus
                />
                <button
                  className="bg-primary px-4 py-1 text-white rounded-lg flex justify-center items-center cursor-pointer shadow-md"
                  onClick={createComment}
                  disabled={isPending}
                >
                  {isPending ? (
                    <span className="loading loading-dots loading-xs" />
                  ) : (
                    <SendHorizontal className="scale-90" />
                  )}
                </button>
              </div>
            )}
            <div className="py-1">
              <Share2 size={24} />
            </div>
          </div>
          {showComment && (
            <div className="flex sm:hidden w-full gap-2">
              <input
                className="border-b-2 border-primary w-full outline-none ml-2 transition-all ease-in duration-300 px-2 bg-white shadow-inner py-2"
                value={commentInput}
                onChange={(e) => setCommentInput(e?.target?.value)}
                autoFocus
              />
              <button
                className="bg-primary px-4 py-1 text-white rounded-lg flex justify-center items-center cursor-pointer shadow-md"
                onClick={createComment}
                disabled={isPending}
              >
                {isPending ? (
                  <span className="loading loading-dots loading-xs" />
                ) : (
                  <SendHorizontal className="scale-90" />
                )}
              </button>
            </div>
          )}
          {showComment && (
            <div className="mt-2 flex flex-col gap-2 pb-2 transition-all ease-in duration-300	text-[#319783]">
              {loadingComments && (
                <div className="flex gap-2 items-center  text-primary">
                  <Loader className="animate-spin" /> Loading Comments...
                </div>
              )}

              {comments?.length == 0 && (
                <div className="flex gap-2 items-center  text-primary">
                  No Comments yet!
                </div>
              )}

              {comments
                ?.slice()
                .reverse()
                .map((comment, idx) => {
                  return (
                    <div className="flex gap-2" key={idx}>
                      <Link href={`/profile/${comment.user.id}`}>
                        <Image
                          alt="avatar"
                          src={comment.user.profileUrl}
                          width={60}
                          height={60}
                          className="w-10 rounded-full"
                        />
                      </Link>
                      <div className="rounded-xl px-4 py-2 bg-[#D8EFD3] rounded-tl-none w-full ">
                        <div className="flex justify-between items-center  w-full ">
                          <Link
                            href={`/profile/${comment.user.id}`}
                            className="font-bold"
                          >
                            {comment.user.name}
                          </Link>
                          <div className="text-sm italic text-primary opacity-80">
                            {`${new Date(comment.createdAt).toLocaleDateString(
                              "en-US",
                              {
                                year: "numeric",
                                month: "long",
                                day: "numeric",
                              }
                            )}`}
                          </div>
                        </div>
                        <div>{comment.text}</div>
                      </div>
                    </div>
                  );
                })}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Post;
