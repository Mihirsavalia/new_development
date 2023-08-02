import React, { useEffect, useRef, useState } from "react";
import Link from "next/link";

// components
import { Avatar, Badge, Close, Select, TextField, Tooltip } from "next-ts-lib";

// icons
import Bell from "../../assets/icons/BellIcon";
import Setting from "../../assets/icons/SettingIcon";
import Help from "../../assets/icons/HelpIcon";
import Sync from "../../assets/icons/SyncIcon";
import BI from "../../assets/icons/BiIcon";
// import Close from "../../assets/icons/Close";
import SearchIcon from "../../assets/icons/SearchIcon";

// dummy data
const companies = [
  { value: "1", label: "Company 1" },
  { value: "2", label: "Company 2" },
  { value: "3", label: "Company 3" },
  { value: "4", label: "Company 4" },
  { value: "5", label: "Company 5" },
  { value: "6", label: "Company 6" },
  { value: "7", label: "Company 7" },
  { value: "8", label: "Company 8" },
  { value: "9", label: "Company 9" },
  { value: "10", label: "Company 10" },
  { value: "11", label: "Company 11" },
];
const settings_data = [
  {
    heading: "General Setting",
    items: ["Manage Company", "Manage Users", "Manage Roles"],
  },
  {
    heading: "Masters",
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

const NavbarX = () => {
  const navbarX_elements = [
    <NotificationButton />,
    <HelpButton />,
    <SettingButton />,
    <SyncButton />,
    <SwitchToBIButton />,
    <ProfileButton />,
  ];

  const [searchValue, setSearchValue] = useState<string>("");
  const [searching, setSearching] = useState<boolean>(false);

  const handleSearchValue = (value: string) => {
    setSearching(true);
    setSearchValue(value);
  };

  const handleSearchClose = () => {
    setSearchValue("");
    setSearching(false);
  };

  return (
    <div className="px-[10px] h-[64px] flex items-center justify-between border-b border-[#d8d8d8]">
      <div className="w-[40%] flex gap-3">
        <div className="mt-[2px] h-[50px] w-[50%] flex items-center">
          <Select
            onSelect={() => console.log()}
            options={companies}
            id="companies"
            search
          />
        </div>
        <div className="flex relative items-center">
          <TextField
            value={searchValue}
            className="pl-10 pr-10"
            getValue={handleSearchValue}
            onSubmit={() => console.log("hii")}
          />
          <div className="flex absolute left-2 cursor-pointer">
            <SearchIcon />
          </div>
          {searching && (
            <div
              className="flex absolute -right-2 cursor-pointer"
              onClick={handleSearchClose}
            >
              <Tooltip position="bottom" content="close">
                <Close variant="small" />
              </Tooltip>
            </div>
          )}
        </div>
      </div>
      <div className="flex items-center gap-5">
        {navbarX_elements.map((element, index) => (
          <React.Fragment key={index}>{element}</React.Fragment>
        ))}
      </div>
    </div>
  );
};

export default NavbarX;

// custom JSX Elements

const NotificationButton = () => {
  const [open, setOpen] = useState(false);
  return (
    <>
      <div className="relative cursor-pointer">
        <div onClick={() => setOpen(!open)}>
          <Bell />
        </div>
        <div className="absolute -top-2 left-[6px]">
          <Badge
            badgetype="error"
            variant="dot"
          // text={notifications.length.toString()}
          />
        </div>
        {/* {open && (
          <div className="py-2 w-36 bg-slate-200 shadow-md rounded absolute top-3 right-4 z-50">
            {notifications.map((element, index) => (
              <Link
                key={index}
                href="#"
                className="h-8 w-full pl-3 flex items-center hover:bg-slate-300"
              >
                {element}
              </Link>
            ))}
          </div>
        )} */}
      </div>
    </>
  );
};

const HelpButton = () => {
  const [open, setOpen] = useState(false);
  return (
    <>
      <div className="relative cursor-pointer">
        <div onClick={() => setOpen(!open)}>
          <Help />
        </div>
        {/* {open && (
          <div className="py-2 w-36 bg-slate-200 shadow-md rounded absolute top-3 right-4 z-50">
            {notifications.map((element, index) => (
              <Link
                key={index}
                href="#"
                className="h-8 w-full pl-3 flex items-center hover:bg-slate-300"
              >
                {element}
              </Link>
            ))}
          </div>
        )} */}
      </div>
    </>
  );
};

const SettingButton = () => {
  const [open, setOpen] = useState(false);
  const settingRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleOutsideClick = (event: MouseEvent) => {
      if (
        settingRef.current &&
        !settingRef.current.contains(event.target as Node)
      ) {
        setOpen(false);
      }
    };

    window.addEventListener("click", handleOutsideClick);

    return () => {
      window.removeEventListener("click", handleOutsideClick);
    };
  }, []);

  return (
    <>
      <div ref={settingRef} className="relative cursor-pointer">
        <div onClick={() => setOpen(!open)}>
          <Setting />
        </div>
        {open && (
          <div className=" !z-[3] p-8 w-[700px] bg-white shadow-lg absolute top-7 right-0 flex justify-center gap-10">
            {settings_data.map((data, index) => (
              <div className="flex flex-col gap-4" key={index}>
                <span className="pb-3 font-semibold border-b border-b-[#d8d8d8]">
                  {data.heading}
                </span>
                {data.items.map((element, index) => (
                  <Link
                    key={index}
                    href="/users"
                    className="font-light text-sm hover:text-[#02b89d]"
                  >
                    {element}
                  </Link>
                ))}
              </div>
            ))}
          </div>
        )}
      </div>
    </>
  );
};

const SyncButton = () => {
  return (
    <div className="cursor-pointer">
      <Sync />
    </div>
  );
};

const SwitchToBIButton = () => {
  return (
    <div
      className="cursor-pointer"
      onClick={() => (window.location.href = "#")}
    >
      <BI />
    </div>
  );
};

const ProfileButton = () => {
  const [open, setOpen] = useState(false);
  return (
    <>
      <div className="relative cursor-pointer">
        <div onClick={() => setOpen(!open)}>
          <Avatar variant="small" />
        </div>
        {/* {open && (
          <div className="py-2 w-36 bg-slate-200 shadow-md rounded absolute right-6 z-50">
            <Link
              href="/signin"
              className="h-8 w-full pl-3 flex items-center hover:bg-slate-300"
            >
              Logout
            </Link>
          </div>
        )} */}
      </div>
    </>
  );
};
