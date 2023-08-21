import React from "react";

const DrawerOverlay = ({ isOpen, onClose }: any) => {
  if (!isOpen) return null;

  localStorage.removeItem("xerocode");
  localStorage.removeItem("qbcode");
  localStorage.removeItem("realmId");
  localStorage.removeItem("state");


  return (
    <div
      className="fixed top-0 left-0 right-0 bottom-0 z-20 bg-black opacity-40" 
    />
  );
};

export default DrawerOverlay;
