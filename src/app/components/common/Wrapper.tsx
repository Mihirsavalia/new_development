"use client";

import React, { ReactNode, useEffect, useState } from "react";
import Sidebar from "./Sidebar";

import DrawerOverlay from "../../users/DrawerOverlay";
import Navbar from "./Navbar";
import { useRouter } from "next/navigation";

interface WrapperProps {
  children: ReactNode;
  setWrapperSetting: any;
}

const Wrapper = ({ children, setWrapperSetting }: WrapperProps): JSX.Element => {
  const router = useRouter();
  const [isSetting, setIsSetting] = useState<boolean>(false);
  const [drawer, setDrawer] = useState<boolean>(false);
  const [windowSize, setWindowSize] = useState(0);

  const isOpen = (data: any) => {
    setDrawer(data)
  };

  const handleResize = () => {
    setWindowSize(window.innerWidth);
  };

  useEffect(() => {
    setWindowSize(window.innerWidth);
    if (typeof window !== "undefined") {
      window.addEventListener("resize", handleResize);

      return () => {
        window.removeEventListener("resize", handleResize);
      };
    }
  }, []);

  const navbarData = (data: any) => {
    setIsSetting(data);
    setWrapperSetting(data);
  };

  const handleSidebarData = (data: any) => {
    setIsSetting(data)
    window.location.href="/users";
  };

  return (
    <div className="lg:flex" >
      <Sidebar setOpen={isOpen} setSettingSidebar={isSetting} toggleDrawer={drawer} sendSidebarData={handleSidebarData} />

      <main className=" " style={{ width: "-webkit-fill-available" }}>
        <Navbar setSetting={navbarData} />
        <DrawerOverlay
          className="!top-[100px]"
          isOpen={drawer}
          onClose={() => { setDrawer(!drawer) }}
        />
        {children}
      </main>
    </div>
  );
};

export default Wrapper;
