"use client";

import Image from "next/image";
import {
  ImageUp,
  Loader,
  MessageCircle,
  MountainSnow,
  Pencil,
  Send,
  Share2,
  ThumbsDown,
  ThumbsUp,
} from "lucide-react";
import React, { useContext, useEffect, useState } from "react";
import { Textarea } from "@/components/ui/textarea";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { UserContext } from "@/contexts/userContext";
import { useUploadImages } from "@/hooks/useUplaodImages";
import { useMutation } from "@tanstack/react-query";
import { createPost } from "@/services/post";
import { CreatePostPayload } from "@/types/post";
import { useRouter } from "next/navigation";
import { Card, CardContent } from "../ui/card";

interface CreatePostProps {}

const CreatePost: React.FC<CreatePostProps> = () => {
  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");
  const [uploadedImagesUrls, setUploadedImagesUrls] = useState<string[]>([]);
  const [file, setFile] = useState<File | null>(null);

  const router = useRouter();

  const { user } = useContext(UserContext);

  const { uploadFunc, isUploading } = useUploadImages();

  const { mutate } = useMutation({
    mutationKey: ["post"],
    mutationFn: (payload: CreatePostPayload) => createPost(payload),
    onSuccess: (data) => {
      console.log(data);
      router.push("/profile");
    },
  });

  if (!user) {
    router.replace("auth/sign-in");
  }

  const handleFileChange = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    if (event?.target?.files?.[0]) setFile(event.target.files[0]);
  };

  useEffect(() => {
    const func = async () => {
      if (!file) return;

      const formData = new FormData();

      formData.append("files", file);

      const links = await uploadFunc(formData);

      console.log(links);

      setUploadedImagesUrls((prev) => [...prev, ...links]);
    };
    func();
  }, [file]);

  const handleSubmit = async () => {
    mutate({
      title,
      content: desc,
      imgUrl: uploadedImagesUrls,
      userId: user?.userId as string,
    });
  };

  console.log(uploadedImagesUrls);

  return (
    <div className="w-full flex justify-center items-center py-16">
      <div className="w-[60%]">
        <div className="flex flex-col gap-2 text-[#319783]">
          <div className="rounded-l-3xl rounded-xl w-full flex justify-between items-center gap-10 bg-[#fff] px-4 py-2 pl-2 shadow-md">
            <div className="flex items-center gap-3">
              {user?.profile ? (
                <Image
                  alt="avatar"
                  src={user?.profile}
                  width={60}
                  height={60}
                  className="w-10 rounded-full object-cover object-center"
                />
              ) : (
                <div className="w-8 h-8 bg-primary rounded-full flex justify-center items-center text-white text-lg">
                  {user?.name[0]}
                </div>
              )}
              <div className="text-xl font-semibold">{user?.name}</div>
            </div>
            <div className="opacity-70">{`${new Date().toLocaleDateString(
              "en-US",
              {
                year: "numeric",
                month: "long",
                day: "numeric",
              }
            )}`}</div>
          </div>
          <div className="flex justify-center gap-2 w-full h-full ">
            <div className="w-1/2 relative">
              {uploadedImagesUrls.length == 0 ? (
                <div className="w-full h-full bg-[#fff] opacity-70 rounded-lg text-xl shadow-md flex flex-col justify-center items-center gap-4 ">
                  <MountainSnow size={40} />
                  No Images to show!
                </div>
              ) : (
                <Carousel className="w-full">
                  <CarouselContent>
                    {uploadedImagesUrls.map((url, index) => (
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
                  <CarouselPrevious />
                  <CarouselNext />
                </Carousel>
              )}

              <div className="bg-[#ffffff98] overflow-hidden absolute bottom-0 w-full h-auto rounded-lg rounded-t-none flex flex-col justify-end shadow-md">
                <label
                  htmlFor="file-upload"
                  className="bg-secondary w-full h-14 flex items-center gap-2 pl-4 cursor-pointer opacity-80 "
                >
                  {isUploading ? (
                    <Loader className="animate-spin" />
                  ) : (
                    <ImageUp />
                  )}
                  Upload Image Here...
                </label>
                <input
                  id="file-upload"
                  type="file"
                  className="hidden"
                  onChange={handleFileChange}
                />
              </div>
            </div>

            <div className="bg-white py-4 px-5 w-1/2 rounded-xl text-[#319783] shadow-md">
              <div className="relative">
                <input
                  type="text"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="Title"
                  className="text-lg font-bold pb-1 bg-white border-b-2 border-slate-200 outline-none mb-4 mt-1 w-full"
                />
                <Pencil size={20} className=" absolute top-3 right-0" />
              </div>
              <div>
                <Textarea
                  value={desc}
                  onChange={(e) => setDesc(e.target.value)}
                  placeholder="Type your content here..."
                  className="border-slate-200 w-full h-48 text-foreground outline-none"
                />
              </div>
            </div>
          </div>
          <div className="bg-[#fff] p-4 py-3 text-[#55AD9B] flex justify-between gap-2 rounded-xl transition-all ease-in duration-300	shadow-md">
            <div className="flex gap-2 transition-all ease-in duration-300	">
              <div
                className={` flex gap-2 text-lg  rounded-2xl px-1 py-1 cursor-default text-foreground`}
              >
                <ThumbsUp size={24} />
              </div>
              <div
                className={` flex gap-2 text-lg  rounded-2xl px-1 py-1 cursor-default  text-foreground`}
              >
                <ThumbsDown size={24} className="mt-1" />
              </div>
              <div className="cursor-default px-1 py-1 text-foreground">
                <MessageCircle size={26} />
              </div>

              <div className="pt-1 text-foreground">
                <Share2 size={24} />
              </div>
            </div>
            <div
              onClick={() => handleSubmit()}
              className="py-1 text-foreground flex gap-2 border-2 border-primary rounded-lg px-4 font-bold hover:text-white hover:bg-foreground cursor-pointer"
            >
              Post
              <Send className="" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreatePost;
