import React, { useEffect, useRef, useState } from "react";
import Link from "next/link";

// components
import { Avatar, Badge, Close, Select, Text, Tooltip } from "next-ts-lib";

// icons
import Bell from "../../assets/icons/BellIcon";
import Setting from "../../assets/icons/SettingIcon";
import Help from "../../assets/icons/HelpIcon";
import Sync from "../../assets/icons/SyncFilledIcon";
import BI from "../../assets/icons/BiIcon";
// import Close from "../../assets/icons/Close";
import SearchIcon from "../../assets/icons/SearchIcon";

interface NavbarProps {
  setSetting: (data: any) => void;
}

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

const global_settings = [
  {
    heading: "Global Setting",
    items: [
      { name: "Manage Company", href: "/manage/companies" },
      { name: "Manage Users", href: "/manage/users" },
      { name: "Manage Roles", href: "/manage/roles" },
    ],
  },
];

const settings_data = [
  {
    heading: "MASTER",
    items: [
      {
        name: "Vendor",
        href: "/vendor",
      },
      {
        name: "Dimension",
        href: "/dimension",
      },
      {
        name: "GL Account",
        href: "/glaccount",
      },
      {
        name: "AP Term",
        href: "/apterm",
      },
      {
        name: "Product Service",
        href: "/productservice",
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

const Navbar = ({ setSetting }: NavbarProps): JSX.Element => {
  const navbarX_elements = [
    <NotificationButton />,
    <HelpButton />,
    <SettingButton setSetting={setSetting} />,
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
            getValue={function (value: any): void {
              throw new Error("Function not implemented.");
            }}
            getError={function (arg1: boolean): void {
              throw new Error("Function not implemented.");
            }}
          />
        </div>
        <div className="flex relative items-center">
          <Text
            value={searchValue}
            className="pl-10 pr-10"
            getValue={handleSearchValue}
            onSubmit={() => console.log("hii")}
            getError={function (arg1: boolean): void {
              throw new Error("Function not implemented.");
            }}
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

export default Navbar;

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

const SettingButton = ({ setSetting }: any) => {
  const [open, setOpen] = useState(false);
  const settingRef = useRef<HTMLDivElement>(null);

  const handleSettingChange = () => {
    setSetting(true);
  };

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
          <div className=" flex flex-row !z-[3] p-8 w-[700px] bg-white shadow-lg absolute top-7 right-0  justify-center gap-10">
            <div className="flex flex-col bg-lightGray border-r-2 border-lightSilver ">
              {global_settings.map((data, index) => (
                <div className="  flex flex-col gap-4" key={index}>
                  <span className="pb-3 font-semibold border-b border-b-[#d8d8d8]">
                    {data.heading}
                  </span>
                  {data.items.map((element, index) => (
                    <Link
                      key={index}
                      href="/users"
                      className="font-light text-sm hover:text-[#02b89d]"
                    >
                      {element.name}
                    </Link>
                  ))}
                </div>
              ))}
            </div>
            {settings_data.map((data, index) => (
              <div className="flex flex-col gap-4" key={index}>
                <span className="pb-3 font-semibold border-b border-b-[#d8d8d8]">
                  {data.heading}
                </span>
                {data.items.map((element, index) => (
                  <Link
                    key={index}
                    href={`/master/${element.href}`}
                    onClick={handleSettingChange}
                    className="font-light text-sm hover:text-[#02b89d]"
                  >
                    {element.name}
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
