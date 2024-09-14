"use client";

import useSocket from "@/hooks/useSocket";
import { PhoneCall } from "lucide-react";
import React from "react";

interface OnlineBadgeProps {}

const OnlineBadge: React.FC<OnlineBadgeProps> = () => {
  const { socket, disconnect } = useSocket();

  return (
    <div
      className="absolute top-20 right-0 text-lg text-white font-bold bg-primary px-6 py-2 rounded-tl-3xl rounded-bl-3xl cursor-pointer  shadow-md"
      onClick={disconnect}
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
