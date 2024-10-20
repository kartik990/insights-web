"use client";

import CottageIcon from "@mui/icons-material/Cottage";
import CallIcon from "@mui/icons-material/Call";
import InboxIcon from "@mui/icons-material/Inbox";
import PersonIcon from "@mui/icons-material/Person";
import ContactsIcon from "@mui/icons-material/Contacts";
import { SquarePen } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

interface SideBarProps {}

const SideBar: React.FC<SideBarProps> = () => {
  const pathname = usePathname();

  const currentPage = pathname.split("/")[1];

  if (currentPage == "auth") return null;

  return (
    <div className="w-auto h-auto bg-[#D8EFD3] py-4 fixed mt-14 rounded-lg rounded-tr-none rounded-br-3xl shadow-md ">
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
    </div>
  );
};

export default SideBar;
