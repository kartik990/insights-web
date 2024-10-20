"use client";
import Image from "next/image";
import React, { useContext, useState } from "react";
import CallIcon from "@mui/icons-material/Call";
import InboxIcon from "@mui/icons-material/Inbox";
import PersonIcon from "@mui/icons-material/Person";
import { Images, Loader, Video } from "lucide-react";
import { Member } from "@/types/user";
import Link from "next/link";
import { createChatRoom } from "@/services/user";
import { UserContext } from "@/contexts/userContext";
import { useRouter } from "next/navigation";

interface LargeCardProps {
  member: Member;
  connected: boolean;
  loading: boolean;
}

const LargeCard: React.FC<LargeCardProps> = ({
  member,
  connected,
  loading,
}) => {
  const { user } = useContext(UserContext);
  const [loadingChat, setLoadingChat] = useState(false);

  const router = useRouter();

  const handleCreateRoom = async (email: string, id: string) => {
    if (!user?.email || email == user.email) return;

    console.log(connected);

    setLoadingChat(true);
    if (!connected) {
      try {
        console.log("new connection");
        const res = await createChatRoom(user?.email, email);
      } catch (err) {
        console.log(err);
      }
    }

    setLoadingChat(false);

    router.push("/message/" + id);
  };

  return (
    <div className="w-full h-80 row-span-4 bg-white shadow-md rounded-md overflow-hidden relative">
      {member?.coverUrl ? (
        <Image
          src={member.coverUrl}
          alt="cover image"
          width={400}
          height={400}
          className="w-full h-32 object-cover"
        />
      ) : (
        <div className="w-full h-32 bg-accent"></div>
      )}
      {member?.profileUrl ? (
        <Image
          src={member.profileUrl}
          alt="profile image"
          width={100}
          height={100}
          className="rounded-full w-16 absolute top-28 left-4"
        />
      ) : (
        <div className="absolute top-28 left-4 w-10 h-10 bg-primary text-white flex justify-center items-center rounded-full">
          {member.name[0]}
        </div>
      )}
      <div className="pl-24 py-2 bg-foreground text-white text-lg font-bold">
        {member.name} ({member.email})
      </div>
      <div className="px-8 pt-6 grid grid-cols-2 gap-3 text-primary">
        {loading || loadingChat ? (
          <div className="flex items-center gap-2">
            <Loader className="animate-spin" /> loading...
          </div>
        ) : (
          member?.email != user?.email && (
            <div
              onClick={() => handleCreateRoom(member.email, member.id)}
              className="flex gap-2 items-center cursor-pointer hover:scale-105"
            >
              <InboxIcon /> Message
            </div>
          )
        )}
        <Link
          href={`/profile/${member.id}`}
          className="flex gap-2 items-center cursor-pointer hover:scale-105"
        >
          <PersonIcon /> Open profile
        </Link>
        <Link
          href={`/call`}
          className="flex gap-2 items-center cursor-pointer hover:scale-105"
        >
          <CallIcon /> Call
        </Link>
        <Link
          href={`/profile/${member.id}#posts`}
          className="flex gap-2 items-center cursor-pointer hover:scale-105"
        >
          <Images /> See Posts
        </Link>
        <Link
          href={`/call`}
          className="flex gap-2 items-center cursor-pointer hover:scale-105"
        >
          <Video /> Video Call
        </Link>
      </div>
    </div>
  );
};

export default LargeCard;
