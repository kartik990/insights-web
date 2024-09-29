import { Member } from "@/types/user";
import { PhoneCall } from "lucide-react";
import Image from "next/image";
import React, { useState } from "react";

interface CardProps {
  member: Member;
  hover: boolean;
}

const Card: React.FC<CardProps> = ({ member, hover }) => {
  return (
    <div
      className={`min-w-max bg-white shadow-lg border-b-4 rounded-md flex justify-between  gap-4 p-4 cursor-pointer ${
        hover ? "scale-105 border-primary" : "border-white"
      }`}
    >
      <div className="flex gap-3 items-center">
        {member.profileUrl ? (
          <Image
            alt="avatar"
            src={member.profileUrl}
            width={65}
            height={65}
            className="w-10 h-10 rounded-full"
          />
        ) : (
          <div className="w-8 h-8 rounded-full bg-primary text-white flex justify-center items-center">
            {member?.name[0]}
          </div>
        )}
        <div className="">
          <div className="text-foreground font-semibold">{member.name}</div>
          <div className="text-sm">{member.email}</div>
        </div>
      </div>

      {true ? (
        hover ? (
          <div className="text-primary font-bold flex gap-2 items-center">
            <PhoneCall /> Call
          </div>
        ) : (
          <div className="flex items-center self-start gap-1">
            <div className="bg-primary rounded-full w-2 h-2 shadow-2xl shadow-green-700" />
            <div className="text-sm text-foreground">Offline</div>
          </div>
        )
      ) : (
        <div className="flex items-center self-start gap-1 ">
          <div className="bg-slate-400 rounded-full w-2 h-2 shadow-2xl shadow-green-700" />
          <div className="text-sm text-slate-400">Offline</div>
        </div>
      )}
    </div>
  );
};

export default Card;
