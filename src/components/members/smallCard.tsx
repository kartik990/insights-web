import Image from "next/image";
import React from "react";
import CallIcon from "@mui/icons-material/Call";
import InboxIcon from "@mui/icons-material/Inbox";
import PersonIcon from "@mui/icons-material/Person";
import { Images, Video } from "lucide-react";

interface SmallCardProps {}

const SmallCard: React.FC<SmallCardProps> = () => {
  return (
    <div className="w-full h-40 bg-white shadow-md rounded-md flex relative overflow-hidden">
      <Image
        src="/images/image.webp"
        alt="cover image"
        width={400}
        height={400}
        className="w-1/3 h-full object-cover"
      />
      <Image
        src="/images/avatar1.jpeg"
        alt="profile image"
        width={100}
        height={100}
        className="rounded-full w-12 bottom-2 left-4 z-20 absolute"
      />
      <div className="absolute bottom-0 left-0 w-full bg-foreground py-1 pl-24 px-4 text-white font-bold">
        Kartik Rai
      </div>
      <div className="px-2 pl-4 py-8 pb-12 -mt-4 content-center grid grid-cols-2 gap-2 text-primary text-sm w-full justify-center">
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

export default SmallCard;
