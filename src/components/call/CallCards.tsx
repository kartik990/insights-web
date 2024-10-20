"use client";

import React, { useEffect, useState } from "react";
import Card from "./Card";
import { Member } from "@/types/user";
import useSocket from "@/hooks/useSocket";
import socketEvents from "@/constants/socketEvents";

interface CallCardsProps {
  members: Member[];
  initiateCall: (email: string) => void;
}

const CallCards: React.FC<CallCardsProps> = ({ members, initiateCall }) => {
  const [hover, setHover] = useState<null | Number>(null);
  const [onlineUsers, setOnlineUsers] = useState<string[] | null>(null);

  const { socket } = useSocket();

  useEffect(() => {
    if (!socket) return;

    socket.on(socketEvents.ONLINE_USERS, (onlineUsers: any) => {
      setOnlineUsers(onlineUsers);
    });

    socket.on(
      socketEvents.UPDATE_ONLINE_USERS,
      ({ added, remove }: { added?: string; remove?: string }) => {
        if (added) {
          setOnlineUsers((prev) => (prev ? [...prev, added] : prev));
        }

        if (remove) {
          setOnlineUsers((prev) =>
            prev ? prev.filter((email) => email != remove) : prev
          );
        }
      }
    );

    socket?.emit(socketEvents.ONLINE_USERS);
  }, [socket]);

  return (
    <div className="min-w-max p-2 h-80 flex flex-col gap-2 overflow-y-scroll scrollbar-thin scrollbar-track-transparent  scrollbar-thumb-primary border-y-4 border-primary  ">
      {members?.map((member, idx) => (
        <div
          key={idx}
          onMouseEnter={() => setHover(idx)}
          onMouseLeave={() => setHover(null)}
          onClick={() =>
            onlineUsers?.includes(member.email)
              ? initiateCall(member.email)
              : null
          }
        >
          <Card
            member={member}
            hover={idx == hover}
            online={
              onlineUsers
                ? onlineUsers.includes(member.email)
                  ? "online"
                  : "offline"
                : "loading"
            }
          />
        </div>
      ))}
    </div>
  );
};

export default CallCards;
