"use client";
import { Typography } from "next-ts-lib";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import ApprovalIcon from "../../assets/icons/ApprovalsIcon";
import BillsIcon from "../../assets/icons/BillsIcon";
import DashboardIcon from "../../assets/icons/DashboardIcon";
import PQlogoIcon from "../../assets/icons/PQLogo";
import PaymentsIcon from "../../assets/icons/PaymentsIcon";
import PurchaseIcon from "../../assets/icons/PurchaseIcon";
import ReportsIcon from "../../assets/icons/ReportsIcon";
import VendorIcon from "../../assets/icons/VendorIcon";
import ChevronLeftIcon from "tsconfig.json/app/assets/icons/ChevronLeftIcon";

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

const settings_data = [
  {
    heading: "MASTER",
    items: [
      "Vendor",
      "Dimension",
      "GL Account",
      "AP Term",
      "Product Service",
      "Description",
    ],
  },
  {
    heading: "Payment Policies",
    items: ["Currency", "Tax Rate", "Payment Method", "Payment Setup"],
  },
  {
    heading: "Setup",
    items: [
      "AP Field Mapping",
      "AP Data Mapping",
      "Notifications",
      "Cloud configuration",
      "Automation",
    ],
  },
];
const SettingItems = ({ pathname, isCollapsed }: any) => {

  return (
    <>
      {settings_data.map((item, index) => (
        <>
          <Typography type="h6" className=" !font-bold flex items-center pl-[20px] py-[13px] border-l-2 hover:bg-whiteSmoke hover:border-primary">{item.heading}</Typography>
          {item.items.map((subItem, subIndex) => (
            <Link
              key={subIndex}
              href=""
              className={`flex items-center pl-[20px] py-[13px] border-l-2 hover:bg-whiteSmoke hover:border-primary `}>
              <Typography type="label" className="">{subItem}</Typography>
            </Link>
          ))}

        </>
      ))}
    </>
  );
};


const Sidebar = ({ setOpen, toggleDrawer }: any) => {
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
        className={`!w-[215px] flex flex-col justify-between border-r border-lightSilver lg:h-screen text-darkCharcoal overflow-y-auto overflow-x-hidden`}>
        <div className={`flex flex-col`}>
          <div className={`flex items-center justify-between`}>
            <span className={`py-4 px-6 h-16 w-full flex items-center border-b border-lightSilver`}>
              <div className={`${animate}`}>
                <PQlogoIcon isCollapsed={isCollapsed} />
              </div>
            </span>
          </div>
          <div className="flex my-2.5 ml-[20px] justify-start">
        <span className=" cursor-pointer mr-2" >
          <ChevronLeftIcon bgColor="whiteSmoke" />
        </span>
        <Typography type="h5" className="!font-bold flex justify-center items-center text-center">Configuration</Typography>
      </div>
          <div className={``}>
            <SettingItems pathname={pathname} isCollapsed={isCollapsed} />
          </div>
        </div>
      </div>
    </>
  );
};

export default Sidebar;