// custom components
import React from 'react'
import Navbar from "../components/common/Navbar";
import Sidebar from "../components/common/Sidebar";

const NavBar = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="lg:flex">
      <Sidebar />
      <div className="w-full flex flex-col">
        <Navbar />
        <main>{children}</main>
      </div>
    </div>
  );
};

export default NavBar;
