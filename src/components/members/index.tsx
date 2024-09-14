"use client";

import React from "react";
import LargeCard from "./largeCard";
import SmallCard from "./smallCard";
import { useQuery } from "@tanstack/react-query";
import { getAllUsers } from "@/services/user";

interface MembersProps {}

const Members: React.FC<MembersProps> = () => {
  const { data, isLoading, error } = useQuery({
    queryKey: ["user"],
    queryFn: getAllUsers,
  });

  console.log(data, isLoading, error);

  return (
    <div className=" w-full h-full flex justify-center items-center">
      <div className="w-[65%] my-10">
        <div className="text-primary text-xl font-semibold bg-white shadow-md px-4 py-2 rounded-lg mb-4">
          List of All Members
        </div>
        <div className="grid grid-cols-2 w-full gap-4 ">
          {[1, 2, 3, 4].map((card, idx) => {
            if (idx % 4 == 0 || idx % 4 == 2) return <LargeCard key={idx} />;
            else return <SmallCard key={idx} />;
          })}
        </div>
      </div>
    </div>
  );
};

export default Members;
