"use client";

import useSocket from "@/hooks/useSocket";
import { useThrottle } from "@/hooks/useThrottle";
import { PhoneCall } from "lucide-react";
import React, { useState } from "react";

interface OnlineBadgeProps {}

const OnlineBadge: React.FC<OnlineBadgeProps> = () => {
  const { socket, disconnect, connect } = useSocket();

  const toggleConnection = () => {
    if (socket) disconnect();
    else connect();
  };

  const throttledToggleConnection = useThrottle(toggleConnection, 1000);

  return (
    <div
      className={` text-lg text-white font-bold ${
        socket ? "bg-primary" : "bg-slate-400"
      } px-6 py-2 sm:rounded-tl-3xl sm:rounded-bl-3xl cursor-pointer  shadow-md`}
      onClick={throttledToggleConnection}
    >
      {socket ? (
        <div className="flex items-center gap-2">
          <PhoneCall />
          Online <div />
        </div>
      ) : (
        <div className="flex items-center gap-2">
          <PhoneCall />
          Offline <div />
        </div>
      )}
    </div>
  );
};

export default OnlineBadge;
