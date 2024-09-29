"use client";

import React, { useState } from "react";
import Card from "./Card";
import { Member } from "@/types/user";

interface CallCardsProps {
  members: Member[];
  initiateCall: (email: string) => void;
}

const CallCards: React.FC<CallCardsProps> = ({ members, initiateCall }) => {
  const [hover, setHover] = useState<null | Number>(null);

  return (
    <div className="w-full h-80 flex flex-col gap-2 ">
      {members?.map((member, idx) => (
        <div
          key={idx}
          onMouseEnter={() => setHover(idx)}
          onMouseLeave={() => setHover(null)}
          onClick={() => initiateCall(member.email)}
        >
          <Card member={member} hover={idx == hover} />
        </div>
      ))}
    </div>
  );
};

export default CallCards;
