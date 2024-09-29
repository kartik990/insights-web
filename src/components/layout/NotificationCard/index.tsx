"use client";

import { Button } from "@/components/ui/button";
import { NotificationContext } from "@/contexts/notificationContext";
import Link from "next/link";
import React, { useContext } from "react";

interface NotificationCardProps {}

const NotificationCard: React.FC<NotificationCardProps> = () => {
  const { call } = useContext(NotificationContext);

  if (!call) return null;

  return (
    <div className="rounded-xl flex flex-col items-center w-auto px-4 py-6 h-40 bg-primary text-white absolute right-5 top-[55%] shadow-xl">
      <div>{call?.fromName}</div>
      <div>{call?.fromEmail}</div>
      <div className="flex gap-3 mt-8">
        <Link href="/call">
          <Button className="bg-green-500 text-white">Accept</Button>
        </Link>
        <Button className="bg-red-400">Decline</Button>
      </div>
    </div>
  );
};

export default NotificationCard;
