"use client";

import Image from "next/image";
import {
  Calendar,
  MessageCircle,
  Share2,
  ThumbsDown,
  ThumbsUp,
} from "lucide-react";
import React, { useState } from "react";

interface PostProps {}

const Post: React.FC<PostProps> = () => {
  const [showComment, setShowComment] = useState(false);
  const [like, setLike] = useState(0);

  return (
    <div className="w-[60%]">
      <div className="flex flex-col gap-2 text-[#319783]">
        <div className="rounded-3xl w-full flex justify-between items-center gap-10 bg-[#fff] px-4 py-2 pl-2 shadow-md">
          <div className="flex items-center gap-3">
            <Image
              alt="avatar"
              src="/images/avatar1.jpeg"
              width={60}
              height={60}
              className="w-10 rounded-full"
            />
            <div className="text-xl font-semibold">Kartik Rai</div>
          </div>
          <div className="opacity-70 flex gap-2 ">
            <Calendar /> 10th August, 2024
          </div>
        </div>
        <div className="flex justify-center gap-2 w-full">
          <div className="w-1/2 ">
            <Image
              src="/images/image.webp"
              alt="image"
              width={500}
              height={500}
              className="object-cover rounded-3xl shadow-md"
            />
          </div>
          <div className="bg-white py-4 px-5 w-1/2 rounded-3xl text-[#319783] shadow-md">
            <div className="text-2xl mb-2 font-semibold">Title</div>
            <div>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Debitis
              itaque numquam nisi id odio, unde cupiditate expedita quo tempore
              commodi molestias necessitatibus? Quibusdam magnam nobis ducimus
              iste quos quo! Ipsa.
            </div>
          </div>
        </div>
        <div className="bg-[#fff] p-4 py-3 text-[#55AD9B] flex flex-col gap-2 rounded-3xl transition-all ease-in duration-300	shadow-md">
          <div className="flex gap-2 transition-all ease-in duration-300	">
            <div
              onClick={() => setLike(1)}
              className={` flex gap-2 text-lg  rounded-2xl px-2 py-1 cursor-pointer  ${
                like == 1 ? "bg-primary text-[#fff]" : "text-primary"
              }`}
            >
              <ThumbsUp size={24} /> 5
            </div>
            <div
              onClick={() => setLike(-1)}
              className={` flex gap-2 text-lg  rounded-2xl px-2 py-1 cursor-pointer  ${
                like == -1 ? "bg-primary text-[#fff]" : "text-primary"
              }`}
            >
              <ThumbsDown size={24} className="mt-1" />5
            </div>
            <div
              className="cursor-pointer px-0 py-1"
              onClick={() => setShowComment((prev) => !prev)}
            >
              <MessageCircle size={26} />
            </div>
            {showComment && (
              <input className="border-b-2 border-slate-300 w-full outline-none ml-2 transition-all ease-in duration-300 bg-white	" />
            )}
            <div className="py-1">
              <Share2 size={24} />
            </div>
          </div>
          {showComment && (
            <div className="mt-2 flex flex-col gap-2 pb-2 transition-all ease-in duration-300	text-[#319783]">
              <div className="flex gap-2">
                <Image
                  alt="avatar"
                  src="/images/avatar1.jpeg"
                  width={60}
                  height={60}
                  className="w-10 rounded-full"
                />
                <div className="rounded-xl px-4 py-2 bg-[#D8EFD3] rounded-tl-none w-full ">
                  Nice work
                </div>
              </div>
              <div className="flex gap-2">
                <Image
                  alt="avatar"
                  src="/images/avatar1.jpeg"
                  width={60}
                  height={60}
                  className="w-10 rounded-full"
                />
                <div className="rounded-xl px-4 py-2 bg-[#D8EFD3] rounded-tl-none w-full ">
                  Nice work
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Post;
