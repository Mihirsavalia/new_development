"use client";

import React, { ReactNode, useEffect, useState } from "react";
import Sidebar from "./Sidebar";

import DrawerOverlay from "@/app/manage/users/DrawerOverlay";
import Navbar from "./Navbar";
import { useRouter } from "next/navigation";
import styles from "@/app/assets/scss/styles.module.scss";
import { Toast } from "next-ts-lib";

interface WrapperProps {
  children: ReactNode;
  masterSettings?: boolean;
}

const Wrapper = ({ children, masterSettings }: WrapperProps): JSX.Element => {
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
  };

  return (
    <div className="lg:flex" >
      <Toast position="top_center" />
      <Sidebar setOpen={isOpen} setSettingSidebar={masterSettings} toggleDrawer={drawer} />
      <main className={styles.mainWidth}>
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
