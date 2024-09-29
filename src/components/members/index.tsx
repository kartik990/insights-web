"use client";

import React from "react";
import Card from "./Card";
import { useQuery } from "@tanstack/react-query";
import { getAllUsers } from "@/services/user";
import { Member } from "@/types/user";

interface MembersProps {}

const Members: React.FC<MembersProps> = () => {
  const { data, isLoading, error } = useQuery({
    queryKey: ["user"],
    queryFn: getAllUsers,
  });

  console.log(data, isLoading, error);

  const members = data?.data as Member[];

  return (
    <div className=" w-full h-full flex justify-center items-center">
      <div className="w-[65%] my-10">
        <div className="grid grid-cols-2 w-full gap-4 ">
          <div className="text-primary text-xl font-semibold bg-white shadow-md px-6 py-5 rounded-lg mb-0 row-span-1">
            List of All Members
          </div>
          {members?.map((member, idx: number) => {
            return <Card key={idx} member={member} />;
          })}
        </div>
      </div>
    </div>
  );
};

export default Members;
