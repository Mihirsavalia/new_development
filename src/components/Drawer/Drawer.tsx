import React from "react";
import { Close } from "next-ts-lib";

import ProfileForm from "../Forms/ProfileForm";
import PasswordForm from "../Forms/PasswordForm";

import { ProfileData } from "@/app/profile/page";

import "next-ts-lib/dist/index.css";

type DrawerProps = {
  isOpen: boolean;
  edit: string;
  profileData?: ProfileData | null;
  handleEdit: (arg1: boolean, arg2: string) => void;
};

const Drawer = ({ isOpen, edit, handleEdit, profileData }: DrawerProps) => {
  return (
    <div
      className={`fixed right-0 top-0 z-30 h-screen overflow-y-auto w-[400px] border border-lightSilver bg-pureWhite transform  ${
        isOpen ? "translate-x-0" : "translate-x-full"
      } transition-transform duration-300 ease-in-out`}
    >
      <div className="flex p-[9px] justify-between items-center bg-whiteSmoke border-b border-lightSilver">
        <span className="text-pureBlack text-lg font-medium">
          {edit.toLowerCase() === "profile"
            ? "Edit Profile"
            : edit.toLowerCase() === "password" && "Reset Password"}
        </span>
        <span onClick={() => handleEdit(false, "")}>
          <Close variant="medium" />
        </span>
      </div>
      {edit.toLowerCase() === "profile" && (
        <ProfileForm profileData={profileData} handleEdit={handleEdit} />
      )}
      {edit.toLowerCase() === "password" && (
        <PasswordForm profileData={profileData} handleEdit={handleEdit} />
      )}
    </div>
  );
};

export default Drawer;
