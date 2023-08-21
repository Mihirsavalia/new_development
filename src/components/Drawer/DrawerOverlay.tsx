import React from "react";

type DrawerOverlayProps = {
  isOpen: boolean;
  className?: string;
  handleEdit: (arg1: boolean, arg2: string) => void;
};

const DrawerOverlay = ({
  isOpen,
  className,
  handleEdit,
}: DrawerOverlayProps) => {
  if (!isOpen) return null;

  return (
    <div
      className={`fixed top-0 left-0 right-0 bottom-0 z-20 bg-black opacity-40 ${className}`}
      onClick={() => handleEdit(false, "")}
    />
  );
};

export default DrawerOverlay;
