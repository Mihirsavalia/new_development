// custom components
import React from 'react'
import NavbarX from "../components/common/NavbarX";
import Sidebar from "../components/common/Sidebar";

const Navbar = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="lg:flex">
      <Sidebar />
      <div className="w-full flex flex-col">
        <NavbarX />
        <main>{children}</main>
      </div>
    </div>
  );
};

export default Navbar;
