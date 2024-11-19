"use client";

import CottageIcon from "@mui/icons-material/Cottage";
import CallIcon from "@mui/icons-material/Call";
import InboxIcon from "@mui/icons-material/Inbox";
import PersonIcon from "@mui/icons-material/Person";
import ContactsIcon from "@mui/icons-material/Contacts";
import { LogIn, LogOut, PhoneCall, SquarePen } from "lucide-react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useContext } from "react";
import { UserContext } from "@/contexts/userContext";
import Image from "next/image";
import OnlineBadge from "../online-badge";
import useSocket from "@/hooks/useSocket";
import { useThrottle } from "@/hooks/useThrottle";

interface MobileMenuProps {
  close: () => void;
}

const MobileMenu: React.FC<MobileMenuProps> = ({ close }) => {
  const pathname = usePathname();

  const { user, removeUser } = useContext(UserContext);

  const currentPage = pathname.split("/")[1];

  const router = useRouter();

  const { socket, disconnect, connect } = useSocket();

  const toggleConnection = () => {
    if (socket) disconnect();
    else connect();
  };

  const throttledToggleConnection = useThrottle(toggleConnection, 1000);

  const handleLogout = () => {
    removeUser();
    router.push("/auth/sign-in");
  };

  return (
    <div className="w-100% h-auto bg-[#D8EFD3]" onClick={close}>
      <div className="flex flex-col">
        <div className="w-full">
          <Link href="/profile">
            {user?.profile && (
              <div className="flex w-full items-center gap-2 pr-4 pl-6 py-4 text-lg font-bold bg-primary text-white mb-2 ">
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
          </Link>
          {!user && (
            <Link
              href="/auth/sign-in"
              className="bg-primary px-6 py-[19px] flex gap-2 items-center text-[1.05rem] text-white font-bold "
            >
              Log In
              <LogIn />
            </Link>
          )}
        </div>
      </div>
      <Link
        href={"/create-post"}
        className={`text-lg text-[#55AD9B] px-6 py-4 border-y-2 border-[#D8EFD3] hover:border-y-[#55ad9b5d] font-semibold cursor-pointer flex items-center gap-2 ${
          currentPage == "create-post"
            ? "border-l-8 border-l-primary pl-4 hover:border-y-[#D8EFD3] "
            : "pl-6"
        } `}
      >
        <SquarePen />
        New Post
      </Link>
      <Link
        href={"/profile"}
        className={`text-lg text-[#55AD9B] px-6 py-4 border-y-2 border-[#D8EFD3] hover:border-y-[#55ad9b5d] font-semibold cursor-pointer flex items-center gap-2 ${
          currentPage == "profile"
            ? "border-l-8 border-l-primary pl-4 hover:border-y-[#D8EFD3] "
            : "pl-6"
        } `}
      >
        <PersonIcon sx={{ scale: 1.2 }} /> Profile
      </Link>
      <Link
        href={"/"}
        className={`text-lg text-[#55AD9B] px-6 py-4 border-y-2 border-[#D8EFD3] hover:border-y-[#55ad9b5d] font-semibold cursor-pointer flex items-center gap-2 ${
          currentPage == ""
            ? "border-l-8 border-l-primary pl-4 hover:border-y-[#D8EFD3] "
            : "pl-6"
        } `}
      >
        <CottageIcon />
        Home
      </Link>
      <Link
        href={"/call"}
        className={`text-lg text-[#55AD9B] px-6 py-4 border-y-2 border-[#D8EFD3] hover:border-y-[#55ad9b5d] font-semibold cursor-pointer flex items-center gap-2 ${
          currentPage == "call"
            ? "border-l-8 border-l-primary pl-4 hover:border-y-[#D8EFD3] "
            : "pl-6"
        } `}
      >
        <CallIcon />
        Calls
      </Link>
      <Link
        href={"/message"}
        className={`text-lg text-[#55AD9B] px-6 py-4 border-y-2 border-[#D8EFD3] hover:border-y-[#55ad9b5d] font-semibold cursor-pointer flex items-center gap-2 ${
          currentPage == "message"
            ? "border-l-8 border-l-primary pl-4 hover:border-y-[#D8EFD3] "
            : "pl-6"
        } `}
      >
        <InboxIcon />
        Messages
      </Link>
      <Link
        href={"/member"}
        className={`text-lg text-[#55AD9B] px-6 py-4 border-y-2 border-[#D8EFD3] hover:border-y-[#55ad9b5d] font-semibold cursor-pointer flex items-center gap-2 ${
          currentPage == "member"
            ? "border-l-8 border-l-primary pl-4 hover:border-y-[#D8EFD3] "
            : "pl-6"
        } `}
      >
        <ContactsIcon />
        Members
      </Link>
      {user && (
        <div
          className={`mx-6 flex gap-2 items-center py-1 sm:text-[1.05rem]  font-bold cursor-pointer text-md pb-2 mt-4 border-b-2 ${
            socket
              ? "border-primary text-primary"
              : "border-slate-400 text-slate-400"
          } `}
          onClick={throttledToggleConnection}
        >
          {socket ? (
            <div className="flex items-center gap-2">
              <PhoneCall className="scale-95" />
              Online <div />
            </div>
          ) : (
            <div className="flex items-center gap-2">
              <PhoneCall className="scale-95" />
              Offline <div />
            </div>
          )}
        </div>
      )}
      {user && (
        <div
          className="mx-6 flex gap-2 items-center py-1 sm:text-[1.05rem] text-primary font-bold cursor-pointer text-md pb-2 mt-4 border-b-2 border-primary"
          onClick={handleLogout}
        >
          <LogOut />
          Log Out
        </div>
      )}
    </div>
  );
};

export default MobileMenu;
