"use client";

import Link from "next/link";
import React, { useContext, useState } from "react";
import OnlineBadge from "../online-badge";
import { UserContext } from "@/contexts/userContext";
import Image from "next/image";
import { BrainCircuit, LogIn, LogOut, Menu } from "lucide-react";
import { useRouter } from "next/navigation";
import MobileMenu from "../MobileMenu";

interface HeaderProps {}

const Header: React.FC<HeaderProps> = () => {
  const [showMobileMenu, setShowMobileMenu] = useState(false);

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
      <div className="hidden sm:flex justify-center gap-4 mr-6">
        {user?.profile && (
          <div className="hidden sm:flex items-center gap-2 pr-4 pl-2 py-1 text-sm sm:text-lg font-bold text-primary bg-white  relative rounded-full ">
            <Image
              className="w-6 h-6 sm:w-8 sm:h-8 rounded-full "
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
            className="bg-white sm:px-4 flex gap-2 items-center py-1 sm:text-[1.05rem] text-primary font-bold rounded-md sm:rounded-xl cursor-pointer text-md  px-2"
            onClick={handleLogout}
          >
            Log Out
            <LogOut className="hidden sm:block" />
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
      <Menu
        className="text-white mr-6 sm:hidden"
        onClick={() => setShowMobileMenu(!showMobileMenu)}
      />
      <div
        className={`absolute w-[60%] h-screen shadow-lg bg-secondary transition-transform duration-300 top-0 left-0 transform z-10 ${
          showMobileMenu ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <MobileMenu close={() => setShowMobileMenu(false)} />
      </div>
      <div
        onClick={() => setShowMobileMenu(false)}
        className={`absolute w-[100%] h-screen bg-slate-950 opacity-45 top-0 right-0 transition-transform duration-300 transform ${
          showMobileMenu ? "translate-x-0" : "-translate-x-full"
        }`}
      ></div>

      {user && <OnlineBadge />}
    </div>
  );
};

export default Header;
