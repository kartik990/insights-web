"use client";

import { Button } from "@/components/ui/button";
import { NotificationContext } from "@/contexts/notificationContext";
import { PhoneCall } from "lucide-react";
import Link from "next/link";
import React, { useContext } from "react";

interface NotificationCardProps {}

const NotificationCard: React.FC<NotificationCardProps> = () => {
  const { call, declineCall, hideCard } = useContext(NotificationContext);

  if (!call?.showCard) return null;

  return (
    <div className="rounded-xl flex flex-col items-center w-auto px-4 py-4 h-auto bg-primary text-white absolute right-5 top-[55%] shadow-xl animate-">
      <div className="flex gap-2 font-bold mb-4 animate-pulse">
        <PhoneCall />
        Call Request
      </div>
      <div className="font-bold text-lg">{call?.fromName}</div>
      <div className="">{call?.fromEmail}</div>
      <div className="flex gap-3 mt-4">
        <Link href="/call">
          <Button className="bg-green-500 text-white" onClick={hideCard}>
            Accept
          </Button>
        </Link>
        <Button onClick={() => declineCall()} className="bg-red-400">
          Decline
        </Button>
      </div>
    </div>
  );
};

export default NotificationCard;
