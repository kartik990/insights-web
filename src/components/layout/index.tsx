import React, { ReactNode, useContext } from "react";
import Header from "./Header";
import Footer from "./Footer";
import SideBar from "./SideBar";
import { NotificationContext } from "@/contexts/notificationContext";
import NotificationCard from "./NotificationCard";

interface LayoutProps {
  children: ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <>
      <Header />
      <div className="flex bg-[#F1F8E8] ">
        <SideBar />
        <div className="w-full min-h-[80vh] mt-14">{children}</div>
      </div>
      <NotificationCard />
      <Footer />
    </>
  );
};

export default Layout;
