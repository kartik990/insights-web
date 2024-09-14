import Image from "next/image";
import React from "react";
import CallIcon from "@mui/icons-material/Call";
import InboxIcon from "@mui/icons-material/Inbox";
import PersonIcon from "@mui/icons-material/Person";
import { Images, Video } from "lucide-react";

interface LargeCardProps {}

const LargeCard: React.FC<LargeCardProps> = () => {
  return (
    <div className="w-full h-80 row-span-2 bg-white shadow-md rounded-md overflow-hidden relative">
      <Image
        src="/images/image.webp"
        alt="cover image"
        width={400}
        height={400}
        className="w-full h-32 object-cover"
      />
      <Image
        src="/images/avatar1.jpeg"
        alt="profile image"
        width={100}
        height={100}
        className="rounded-full w-16 absolute top-28 left-4"
      />
      <div className="pl-24 py-2 bg-foreground text-white text-lg font-bold">
        Kartik Rai
      </div>
      <div className="px-8 pt-6 grid grid-cols-2 gap-3 text-primary">
        <div className="flex gap-2 items-center cursor-pointer hover:scale-105">
          <InboxIcon /> Message
        </div>
        <div className="flex gap-2 items-center cursor-pointer hover:scale-105">
          <PersonIcon /> Open profile
        </div>
        <div className="flex gap-2 items-center cursor-pointer hover:scale-105">
          <CallIcon /> Call
        </div>
        <div className="flex gap-2 items-center cursor-pointer hover:scale-105">
          <Images /> See Posts
        </div>
        <div className="flex gap-2 items-center cursor-pointer hover:scale-105">
          <Video /> Video Call
        </div>
      </div>
    </div>
  );
};

export default LargeCard;
