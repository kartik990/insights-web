"use client";

import Link from "next/link";
import React, { useContext } from "react";
import OnlineBadge from "../online-badge";
import { UserContext } from "@/contexts/userContext";
import Image from "next/image";
import { BrainCircuit, LogIn, LogOut } from "lucide-react";
import { useRouter } from "next/navigation";

interface HeaderProps {}

const Header: React.FC<HeaderProps> = () => {
  const { user, removeUser } = useContext(UserContext);

  const router = useRouter();

  const handleLogout = () => {
    removeUser();
    router.push("/auth/sign-in");
  };

  return (
    <div className="w-full h-16 flex items-center justify-between bg-[#55AD9B] fixed z-50 shadow-md">
      <div className="px-6 font-cursive text-2xl font-extrabold text-white flex gap-2 items-center">
        <BrainCircuit />
        Insights
      </div>
      <div className="flex justify-center gap-4 mr-6">
        {user?.profile && (
          <div className="flex items-center gap-2 pr-4 pl-2 py-1 text-lg font-bold text-primary bg-white  relative rounded-full ">
            <Image
              className="w-8 h-8 rounded-full "
              src={user?.profile}
              alt="profile"
              width={100}
              height={100}
            />
            {user?.name}
          </div>
        )}
        {user ? (
          <div
            className="bg-white px-4 flex gap-2 items-center py-1 text-[1.05rem] text-primary font-bold rounded-xl cursor-pointer"
            onClick={handleLogout}
          >
            Log Out
            <LogOut />
          </div>
        ) : (
          <Link
            href="/auth/sign-in"
            className="bg-white px-4 flex gap-2 items-center py-1 text-[1.05rem] text-primary font-bold rounded-xl"
          >
            Log In
            <LogIn />
          </Link>
        )}
      </div>
      {user && <OnlineBadge />}
    </div>
  );
};

export default Header;
