"use client";
import React, { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import ApprovalIcon from "../../assets/icons/ApprovalsIcon";
import BillsIcon from "../../assets/icons/BillsIcon";
import DashboardIcon from "../../assets/icons/DashboardIcon";
import MenuIcon from "../../assets/icons/MenuIcon";
import PaymentsIcon from "../../assets/icons/PaymentsIcon";
import PurchaseIcon from "../../assets/icons/PurchaseIcon";
import ReportsIcon from "../../assets/icons/ReportsIcon";
import VendorIcon from "../../assets/icons/VendorIcon";
import PQlogoIcon from "../../assets/icons/PQLogo";
import styles from "../../assets/scss/styles.module.scss";
import Link from "next/link";
import { Tooltip, Typography } from "next-ts-lib";

interface SidebarItem {
  name: string;
  href: string;
  icon: JSX.Element;
}

const sidebarItems: SidebarItem[] = [
  {
    name: "Dashboard",
    href: "/",
    icon: <DashboardIcon />,
  },
  {
    name: "Purchase Order",
    href: "/purchase",
    icon: <PurchaseIcon />,
  },
  {
    name: "Bills",
    href: "/worklogs",
    icon: <BillsIcon />,
  },
  {
    name: "Payments",
    href: "/approvals",
    icon: <PaymentsIcon />,
  },
  {
    name: "Approvals",
    href: "/approvals",
    icon: <ApprovalIcon />,
  },

  {
    name: "Reports",
    href: "/settings",
    icon: <ReportsIcon />,
  },
  {
    name: "Vendors",
    href: "/reports",
    icon: <VendorIcon />,
  },
];

const DashboardItems = ({ pathname, isCollapsed }: any) => {

  return (
    <>
      {sidebarItems.map((item, index) => (
        <Link
          key={index}
          href={item.href}
          className={`mb-3 flex items-center ${isCollapsed ? "pl-4" : "pl-[27px]"} border-l-[4px] hover:bg-whiteSmoke hover:border-primary ${pathname === `${item.href}`
            ? "border-primary bg-whiteSmoke"
            : "border-pureWhite"
            }`}
        >
          {isCollapsed ? (
            <div className=" pl-0 py-[9.65px]">
              <Tooltip content={`${item.name}`} position="right">
                <span className="">{item.icon}</span>
              </Tooltip>
            </div>
          ) : (
            <>
              <span className="py-[17.65px]">{item.icon}</span>
              <span className="pl-[10px] py-[14.5px]">
                <Typography type="h6" className="">{item.name}</Typography>
              </span>
            </>
          )}
        </Link>
      ))}
    </>
  );
};


const Sidebar = ({ setOpen, setSetting, collapse, toggleDrawer }: any) => {
  const pathname = usePathname();
  const [isCollapsed, setCollapse] = useState<boolean>(false);
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [windowSize, setWindowSize] = useState(0);
  const [animate, setAnimate] = useState<string>("");

  const handleResize = () => {
    setWindowSize(window.innerWidth);
  };

  useEffect(() => {
    setIsOpen(toggleDrawer);
  }, [toggleDrawer]);

  useEffect(() => {
    // collapse(isCollapsed);
    setWindowSize(window.innerWidth);
    if (typeof window !== "undefined") {
      window.addEventListener("resize", handleResize);

      return () => {
        window.removeEventListener("resize", handleResize);
      };
    }
  }, [isCollapsed]);

  setTimeout(() => {
    setAnimate("");
  }, 250);

  return (
    <>
      <div
        className={`${isCollapsed ? "lg:w-[79px]" : "lg:w-[214px]"
          } flex flex-col justify-between border-r border-lightSilver lg:h-screen text-darkCharcoal overflow-y-auto overflow-x-hidden`}>
        <div className={`flex flex-col`}>
          <div className={`flex items-center justify-between ${isOpen && "z-[5] bg-white"} `}>
            <span
              className={`py-4 px-6 h-16 w-full flex items-center
          text-primary font-medium text-[24px] lg:border-b border-lightSilver`}>

              <div className={`${animate}`}>
                <PQlogoIcon isCollapsed={isCollapsed} />
              </div>
            </span>
            <span className="lg:hidden">
              <button
                className="flex flex-col h-12 w-12 rounded justify-center items-center group px-3"
                onClick={() => {
                  setIsOpen(!isOpen);
                  setOpen(!isOpen);

                }}
              >
                <div
                  className={`h-1 w-6 my-1 rounded-full bg-darkCharcoal transition ease transform duration-300 ${isOpen
                    ? "rotate-45 translate-y-3 opacity-50 group-hover:opacity-100"
                    : "opacity-50 group-hover:opacity-100"
                    }`}
                />
                <div
                  className={`h-1 w-6 my-1 rounded-full bg-darkCharcoal transition ease transform duration-300 ${isOpen ? "opacity-0" : "opacity-50 group-hover:opacity-100"
                    }`}
                />
                <div
                  className={`h-1 w-6 my-1 rounded-full bg-darkCharcoal transition ease transform duration-300 ${isOpen
                    ? "-rotate-45 -translate-y-3 opacity-50 group-hover:opacity-100"
                    : "opacity-50 group-hover:opacity-100"
                    }`}
                />
              </button>
            </span>
          </div>
          {windowSize <= 1023 ? (
            <div
            className={`flex flex-col absolute top-[79px] z-[5]  bg-white  ${isOpen ? styles.expandDiv : styles.collapsedDiv
              }`}
          >
              <DashboardItems pathname={pathname} isCollapsed={isCollapsed} />
            </div>
          ) : (
            <div className={`mt-[15px] ${animate} h-auto block`}>
              <DashboardItems pathname={pathname} isCollapsed={isCollapsed} />
            </div>
          )}
        </div>
        {windowSize >= 1024 && (
          <span
            className={`py-[32px] pl-[29px] ${isCollapsed ? "pr-[50px]" : "pr-[174px]"
              } border-t border-[#E6E6E6] cursor-pointer`}
            onClick={() => {
              setCollapse(!isCollapsed);
              setAnimate(!isCollapsed ? styles.rightToLeft : styles.leftToRight);
              // setSetting(!isCollapsed);
            }}
          >
            <MenuIcon />
          </span>
        )}
      </div>
    </>
  );
};

export default Sidebar;
