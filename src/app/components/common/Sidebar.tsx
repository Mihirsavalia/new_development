"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import ApprovalIcon from "../../assets/icons/ApprovalsIcon";
import BillsIcon from "../../assets/icons/BillsIcon";
import DashboardIcon from "../../assets/icons/DashboardIcon";
import MenuIcon from "../../assets/icons/MenuIcon";
import PaymentsIcon from "../../assets/icons/PaymentsIcon";
import PurchaseIcon from "../../assets/icons/PurchaseIcon";
import ReportsIcon from "../../assets/icons/ReportsIcon";
import VendorIcon from "../../assets/icons/VendorIcon";
import styles from "../../assets/scss/styles.module.scss";
import PQlogoIcon from "../../assets/icons/PQLogo";
import { Tooltip } from "next-ts-lib";

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
            <div className=" pl-0 py-[9.65px] z-10">
              <Tooltip content={`${item.name}`} position="right">
                <span className="">{item.icon}</span>
              </Tooltip>
            </div>
          ) : (
            <>
              <span className="py-[17.65px]">{item.icon}</span>
              <span className="pl-[10px] py-[14.5px]">{item.name}</span>
            </>
          )}
        </Link>
      ))}
    </>
  );
};

const Sidebar = ({ setOpen }: any) => {
  const pathname = usePathname();
  const [isCollapsed, setCollapse] = useState<boolean>(false);
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [windowSize, setWindowSize] = useState(0);
  const [animate, setAnimate] = useState<string>("");

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
  setTimeout(() => {
    setAnimate("");
  }, 300)

  return (
    <div
      className={` ${isCollapsed ? "lg:w-20" : "lg:w-64"
        } flex flex-col justify-between border-r border-lightSilver lg:h-screen text-darkCharcoal overflow-y-auto overflow-x-hidden xyz`}>
      <div className="flex flex-col">
        <div className="flex items-center justify-between">
          <span
            className={`py-4  pl-7 h-16 w-full flex items-center
          text-primary font-medium text-[24px] lg:border-b border-lightSilver`}>
            <div className={`${animate}`}>
              <PQlogoIcon isCollapsed={isCollapsed} />
            </div>
          </span>

          {/* Close Button */}
          <span className="lg:hidden">
            <button
              className="flex flex-col h-12 w-12 rounded justify-center items-center group pr-5"
              onClick={() => {
                setIsOpen(!isOpen);
                // setOpen(!isOpen);
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
            className={`flex flex-col absolute h-screen top-[66px] bg-pureWhite w-auto`}
          >
            <DashboardItems pathname={pathname} isCollapsed={isCollapsed} />
          </div>
        ) : (
          <div className={`mt-[15px] ${animate} h-auto block`}>
            <DashboardItems pathname={pathname} isCollapsed={isCollapsed} />
          </div>
        )}
      </div>
      {windowSize >= 1023 && (
        <span
          className={`py-7 pl-7 ${isCollapsed ? "pr-[50px]" : "pr-44"
            } border-t border-lightSilver cursor-pointer`}
          onClick={() => {
            setCollapse(!isCollapsed);
            setAnimate(!isCollapsed ? styles.rightToLeft : styles.leftToRight);
          }}
        >
          <MenuIcon />
        </span>
      )}
    </div>
  );
};

export default Sidebar;
