"use client"

import React, { ReactNode, useEffect, useState } from "react";
import Navbar from "tsconfig.json/app/components/common/Navbar";
import SettingsSidebar from "tsconfig.json/app/components/common/SettingsSidebar ";

interface WrapperProps {
    children: ReactNode;
}
const page = ({ children }: WrapperProps): JSX.Element => {
    return (
        <div className="lg:flex" >
            <SettingsSidebar/>
            <main style={{ width: "-webkit-fill-available" }}>
                <Navbar />
                {children}
            </main>
        </div>
    )
}

export default page