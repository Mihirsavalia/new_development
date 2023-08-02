"use client";

import React, { ReactNode, useEffect, useState } from "react";
import Sidebar from "./Sidebar";
import DrawerOverlay from "../../users/DrawerOverlay";

interface WrapperProps {
  children: ReactNode;
}

const Wrapper = ({ children }: WrapperProps): JSX.Element => {
  const [mobileOpen, setMobileOpen] = useState<boolean>(false);
  const [Collapsed, setCollapsed] = useState<boolean>(false);
  const [drawer, setDrawer] = useState<boolean>(false);
  const [windowSize, setWindowSize] = useState(0);

  const isOpen = (data: any) => {
    setMobileOpen(data);
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

  return (
    <div className="lg:flex">
      <Sidebar setOpen={isOpen}  toggleDrawer={drawer} />
      <main className={` w-full`}>
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
