import React, { ReactNode, useEffect, useState } from "react";
import Navbar from "./Navbar";

interface WrapperProps {
    children: ReactNode;
  }
const SettingsWrapper =  ({ children }: WrapperProps): JSX.Element => {
    return (
        <div className="lg:flex"  >
            <Navbar/>
            <main style={{ width: "-webkit-fill-available" }} >
                {children}
            </main>
        </div>
    )
}

export default SettingsWrapper