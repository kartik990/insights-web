import CottageIcon from "@mui/icons-material/Cottage";
import CallIcon from "@mui/icons-material/Call";
import InboxIcon from "@mui/icons-material/Inbox";
import PersonIcon from "@mui/icons-material/Person";
import ContactsIcon from "@mui/icons-material/Contacts";
import { SquarePen } from "lucide-react";
import Link from "next/link";

interface SideBarProps {}

const SideBar: React.FC<SideBarProps> = () => {
  return (
    <div className="w-auto h-auto bg-[#D8EFD3] py-4 fixed mt-14 rounded-lg rounded-tr-none rounded-br-3xl shadow-md ">
      <Link
        href={"/create-post"}
        className="text-lg text-[#55AD9B] px-8 py-4 border-y-2 border-[#D8EFD3] hover:border-[#55ad9b5d]  font-semibold cursor-pointer flex items-center gap-2 "
      >
        <SquarePen />
        New Post
      </Link>
      <div className="text-lg text-[#55AD9B] px-8 py-4 border-y-2 border-[#D8EFD3] hover:border-[#55ad9b5d] font-semibold cursor-pointer flex items-center gap-2 b">
        <PersonIcon sx={{ scale: 1.2 }} /> Profile
      </div>
      <Link
        href="/"
        className="text-lg text-[#55AD9B] px-8 py-4 border-y-2 border-[#D8EFD3] hover:border-[#55ad9b5d] font-semibold cursor-pointer flex items-center gap-2 b"
      >
        <CottageIcon />
        Home
      </Link>
      <Link
        href="/call"
        className="text-lg text-[#55AD9B] px-8 py-4 border-y-2 border-[#D8EFD3] hover:border-[#55ad9b5d]  font-semibold cursor-pointer flex items-center gap-2 "
      >
        <CallIcon />
        Calls
      </Link>
      <Link
        href="/message"
        className="text-lg text-[#55AD9B] px-8 py-4 border-y-2 border-[#D8EFD3] hover:border-[#55ad9b5d]  font-semibold cursor-pointer flex items-center gap-2 "
      >
        <InboxIcon />
        Messages
      </Link>
      <Link
        href="/member"
        className="text-lg text-[#55AD9B] px-8 py-4 pl-6   hover:border-[#55ad9b5d]   cursor-pointer flex items-center gap-2 border-l-8 border-primary "
      >
        <ContactsIcon />
        Members
      </Link>
    </div>
  );
};

export default SideBar;
