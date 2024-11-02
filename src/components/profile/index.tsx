"use client";

import React, { useContext, useState } from "react";
import Post from "../homepage/Post";
import { Pencil } from "lucide-react";
import { UserContext } from "@/contexts/userContext";
import { useQuery } from "@tanstack/react-query";
import { getUser } from "@/services/user";
import { useParams, useRouter } from "next/navigation";
import EditProfileModal from "./EditModal";
import Image from "next/image";
import { PostInterface } from "@/types/post";

interface ProfileProps {}

const Profile: React.FC<ProfileProps> = () => {
  const { userId } = useParams();

  const [modal, setModal] = useState(false);

  const { user } = useContext(UserContext);

  const router = useRouter();

  if (!user) {
    router.push("/auth/sign-in");
  }

  const { data, isLoading } = useQuery({
    queryKey: ["user", userId || user?.userId],
    queryFn: () => getUser((userId || user?.userId) as string),
  });

  if (isLoading) {
    return <div className="mt-16">Loading...</div>;
  }

  const userData: any = data?.data;
  const posts: PostInterface[] = userData?.posts;

  return (
    <div className="w-full h-full">
      <div className="w-[100%] sm:w-[60%] h-36 sm:h-48 bg-accent m-auto relative top-2 rounded-b-[80px] z-10 shadow-md">
        {userData?.coverUrl && (
          <Image
            src={userData?.coverUrl}
            alt="cover"
            width={500}
            height={500}
            className="w-full h-full object-cover"
          />
        )}
      </div>
      <div className="w-16 h-16 sm:w-32 sm:h-32 rounded-full bg-primary absolute top-44 left-6 sm:top-44 sm:left-[25%] z-10 shadow-xl flex justify-center items-center text-6xl text-white overflow-hidden">
        {userData?.profileUrl ? (
          <Image
            src={userData?.profileUrl}
            alt="profile"
            width={500}
            height={500}
          />
        ) : (
          user?.name[0]
        )}
      </div>
      <div className="w-full sm:w-[60%] h-auto bg-white m-auto mt-4 relative top-[-80px] z-0 rounded-b-[25px] sm:rounded-b-[80px] shadow-md ">
        <div className="flex flex-col justify-end h-full pt-[90px] px-8 sm:px-16 pb-8">
          <div className="border-b-2 border-slate-100 pb-4 flex justify-between">
            <div className="text-primary text-[17px] sm:text-xl font-bold pl-[68px] sm:pl-40">
              {user?.name} ({user?.email})
            </div>
            <div
              className="flex gap-2 cursor-pointer italic items-center"
              onClick={() => setModal(true)}
            >
              <Pencil className="w-5 sm:w-auto" />
              <span className="hidden sm:block">Edit Profile</span>
            </div>
          </div>
          <div className="pt-4">
            <div className="text-primary text-lg font-semibold pb-2">About</div>
            <div className="text-slate-400">
              {userData?.about || "Not added yet..."}
            </div>
          </div>
        </div>
      </div>
      <div
        id="posts"
        className="text-xl text-foreground font-bold bg-secondary w-[90%] sm:w-[60%] px-6 py-4 sm:py-6 rounded-xl m-auto mb-4 sm:mb-6 mt-[-50px] sm:mt-[-20px] shadow-md"
      >
        Posts
      </div>
      <div className="pb-10 sm:pb-20 flex flex-col gap-8 sm:gap-14 items-center">
        {posts?.map((post, idx: number) => (
          <Post
            key={idx}
            post={post}
            owner={{
              id: user?.userId,
              name: user?.name,
              profileUrl: user?.profile,
            }}
          />
        ))}
      </div>
      {modal && user && (
        <EditProfileModal
          setModal={setModal}
          name={user?.name}
          userId={user?.userId}
          about={userData?.about}
        />
      )}
    </div>
  );
};

export default Profile;
