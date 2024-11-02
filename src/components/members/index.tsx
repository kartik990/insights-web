"use client";

import React, { useContext } from "react";
import Card from "./Card";
import { useQuery } from "@tanstack/react-query";
import { getAllUsers, getChats } from "@/services/user";
import { Member } from "@/types/user";
import { UserContext } from "@/contexts/userContext";
import { useRouter } from "next/navigation";

interface MembersProps {}

const Members: React.FC<MembersProps> = () => {
  const { data, isLoading, error } = useQuery({
    queryKey: ["user"],
    queryFn: getAllUsers,
  });

  const { user } = useContext(UserContext);

  const members = data?.data as Member[];

  const router = useRouter();

  if (!user) {
    router.push("/auth/sign-in");
  }

  const { data: chats, isLoading: chatLoading } = useQuery({
    queryKey: ["chats"],
    queryFn: () => getChats(user?.userId as string),
  });

  //@ts-ignore
  const connectEmail = chats?.data?.chats?.map((chat) => {
    return chat?.users.filter((u: any) => u.user.email != user?.email)[0]?.user
      ?.email;
  });

  return (
    <div className=" w-full h-full flex justify-center items-center">
      <div className="w-[90%] sm:w-[65%] my-6 sm:my-10">
        <div className="grid grid-cols-1 sm:grid-cols-2 w-full gap-6 sm:gap-4 ">
          <div className="text-primary text-xl font-semibold bg-white shadow-md px-6 py-5 rounded-lg mb-0 row-span-1">
            List of All Members
          </div>
          {members?.map((member, idx: number) => {
            return (
              <Card
                key={idx}
                member={member}
                connected={connectEmail?.includes(member.email)}
                loading={chatLoading}
              />
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Members;
