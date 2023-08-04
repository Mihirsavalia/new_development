"use client";
import { Tooltip, Typography } from "next-ts-lib";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import ChevronLeftIcon from "tsconfig.json/app/assets/icons/ChevronLeftIcon";
import ApprovalIcon from "../../assets/icons/ApprovalsIcon";
import BillsIcon from "../../assets/icons/BillsIcon";
import DashboardIcon from "../../assets/icons/DashboardIcon";
import MenuIcon from "../../assets/icons/MenuIcon";
import PQlogoIcon from "../../assets/icons/PQLogo";
import PaymentsIcon from "../../assets/icons/PaymentsIcon";
import PurchaseIcon from "../../assets/icons/PurchaseIcon";
import ReportsIcon from "../../assets/icons/ReportsIcon";
import VendorIcon from "../../assets/icons/VendorIcon";
import styles from "../../assets/scss/styles.module.scss";

interface SidebarProps {
  setOpen: (data: any) => void;
  setSettingSidebar: boolean;
  toggleDrawer: boolean;
  sendSidebarData: (data: any) => void;

}
//Sidebar Props
interface SidebarItem {
  name: string;
  href: string;
  icon: JSX.Element;
}

//Settings Sidebar Props
interface SettingsSection {
  heading: string;
  items: {
    name: string;
    href: string;
  }[];
}

//Sidebar Data
const sidebarItems: SidebarItem[] = [
  {
    name: "Dashboard",
    href: "/users",
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

//Sidebar DashboardItems
const DashboardItems = ({ pathname, isCollapsed }: any) => {
  return (
    <>
      {sidebarItems.map((item, index) => (
        <Link
          key={index}
          href={item.href}
          className={`mb-3 flex items-center ${isCollapsed ? "pl-4" : "pl-[27px]"} border-l-[4px] hover:bg-whiteSmoke hover:border-primary
          ${pathname === `${item.href}`
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

//Settings Sidebar Data
const settings_data: SettingsSection[] = [
  {
    heading: "MASTER",
    items: [
      {
        name: "Vendor",
        href: "/users",
      },
      {
        name: "Dimension",
        href: "/dimension",
      },
      {
        name: "GL Account",
        href: "/gl_account",
      },
      {
        name: "AP Term",
        href: "/ap_term",
      },
      {
        name: "Product Service",
        href: "/product_service",
      },
      {
        name: "Description",
        href: "/description",
      }
    ]
  },
  {
    heading: "Payment Policies",
    items: [
      {
        name: "Currency",
        href: "/currency",
      },
      {
        name: "Tax Rate",
        href: "/tax_rate",
      },
      {
        name: "Payment Method",
        href: "/payment_method",
      },
      {
        name: "Payment Setup",
        href: "/payment_setup",
      }
    ]
  },
  {
    heading: "Setup",
    items: [
      {
        name: "AP Field Mapping",
        href: "/ap_field_mapping",
      },
      {
        name: "AP Data Mapping",
        href: "/ap_data_mapping",
      },
      {
        name: "Notifications",
        href: "/notifications",
      },
      {
        name: "Cloud configuration",
        href: "/cloud_configuration",
      },
      {
        name: "Automation",
        href: "/automation",
      }
    ]
  },
];

//Settings Sidebar SettingItems
const SettingItems = ({ pathname, isCollapsed }: any) => {
  return (
    <>
      {settings_data.map((item, index) => (
        <div key={index}>
          <Typography type="h6" className={`!font-bold flex items-start pl-[20px] ${index > 0 ? "pt-[20px] pb-[5px]" : "pt-[13px] pb-[5px]"}`}>{item.heading}</Typography>
          {item.items.map((subItem, subIndex) => (
            <Link
              href={subItem.href}
              className={`flex items-center pl-[20px]  py-[10px] border-l-2 border-white hover:bg-whiteSmoke hover:border-primary
               ${pathname === `${subItem.href}`
                  ? "border-primary bg-whiteSmoke"
                  : "border-pureWhite"
                }`}
              key={subIndex}
            >
              <Typography type="h6" className=" cursor-pointer">{subItem.name}</Typography>
            </Link>
          ))}
        </div>
      ))}
    </>
  );
};

const Sidebar = ({ setOpen, setSettingSidebar, toggleDrawer, sendSidebarData }: SidebarProps): JSX.Element => {
  const pathname = usePathname();
  const router = useRouter();

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

  const handleSettingChange = () => {
    sendSidebarData(false);
  }

  return (
    <>
      {/* Sidebar Dashboard */}
      <div
        className={`${isCollapsed ? "lg:w-[79px]" : "lg:w-[214px]"
          } flex flex-col justify-between border-r border-lightSilver lg:h-screen text-darkCharcoal overflow-y-auto overflow-x-hidden`}>
        <div className={`flex flex-col`}>
          <div className={`flex items-center sticky top-0 justify-between ${isOpen && "z-[5] bg-white"} `}>
            <span className={`py-4 px-6 h-16 w-full bg-white flex items-center text-primary font-medium text-[24px] lg:border-b border-lightSilver`}>
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
            <>
              <div
                className={`flex w-[183px] flex-col absolute ${setSettingSidebar ? "top-[64px]" : "top-[79px]"} z-[5]  bg-white  ${isOpen ? styles.expandDiv : styles.collapsedDiv
                  }`}
              >
                {setSettingSidebar
                  ? (<>
                    <div className={`flex py-3 sticky ${windowSize<=1023 ?"" :"top-[64px]"} pl-[20px] justify-start`}>
                      <span className=" cursor-pointer mr-2.5" onClick={handleSettingChange}>
                        <ChevronLeftIcon bgColor="whiteSmoke" />
                      </span>
                      <Typography type="h5" className="!font-bold flex justify-center items-center text-center">Configuration</Typography>
                    </div>
                    <div
                      className={`flex flex-col absolute top-[79px] z-[5]  bg-white  ${isOpen ? styles.expandDiv : styles.collapsedDiv
                        }`}
                    ></div>
                    <SettingItems pathname={pathname} />
                  </>)
                  : <DashboardItems pathname={pathname} isCollapsed={isCollapsed} />
                }
              </div>
            </>) : (
            <div className={` ${setSettingSidebar ? "pt-0" : "pt-[15px]"} ${animate} h-auto block`}>
              {setSettingSidebar
                ? (<>
                  <div className="flex py-3 sticky bg-white top-[64px] pl-[20px] justify-start">
                    <span className=" cursor-pointer mr-2.5" onClick={handleSettingChange}>
                      <ChevronLeftIcon bgColor="whiteSmoke" />
                    </span>
                    <Typography type="h5" className="!font-bold flex justify-center items-center text-center">Configuration</Typography>
                  </div>
                  <div
                    className={`flex flex-col absolute top-[79px] z-[5]  bg-white  ${isOpen ? styles.expandDiv : styles.collapsedDiv
                      }`}
                  ></div>
                  <SettingItems pathname={pathname} />
                </>)
                : <DashboardItems pathname={pathname} isCollapsed={isCollapsed} />
              }
            </div>
          )}
        </div>
        {windowSize >= 1024 && (
          !setSettingSidebar && (<span
            className={`py-[30px] pl-[29px] ${isCollapsed ? "pr-[50px]" : "pr-[174px]"
              } border-t  border-[#E6E6E6] cursor-pointer`}
            onClick={() => {
              setCollapse(!isCollapsed);
              setAnimate(!isCollapsed ? styles.rightToLeft : styles.leftToRight);
              // setSetting(!isCollapsed);
            }}
          >
            <MenuIcon />
          </span>)
        )}
      </div>
    </>
  );
};

export default Sidebar;