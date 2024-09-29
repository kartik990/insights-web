"use client";

import Link from "next/link";
import React, { useContext } from "react";
import OnlineBadge from "../online-badge";
import { UserContext } from "@/contexts/userContext";

interface HeaderProps {}

const Header: React.FC<HeaderProps> = () => {
  const { user } = useContext(UserContext);

  return (
    <div className="w-full h-16 flex items-center justify-between bg-[#55AD9B] fixed z-50">
      <div className="px-10 font-cursive text-2xl font-extrabold text-white">
        Insights
      </div>
      <Link href="/auth/sign-in">
        <button className="px-10 text-lg font-bold text-white mr-16">
          {user?.name || "Log in "}
        </button>
      </Link>
      <OnlineBadge />
    </div>
  );
};

export default Header;
