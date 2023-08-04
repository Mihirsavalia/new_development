"use client";

import { Button, Close, Modal, ModalAction, ModalContent, ModalTitle, Switch, Table, Typography } from "next-ts-lib";
import "next-ts-lib/dist/index.css";
import React, { useEffect, useState } from "react";
import KebabMenuIcon from "../assets/icons/KebabMenuIcon";
import PlusIcon from "../assets/icons/PlusIcon";
import Navbar from "../components/common/Navbar";
// import Sidebar from "../components/common/Sidebar";
import Wrapper from "../components/common/Wrapper";
import Drawer from "./Drawer";
import DrawerOverlay from "./DrawerOverlay";
import MultiselectCompany from "./MultiselectCompany";
import RoleDrawer from "./RoleDrawer";

interface FormData {
  id: number;
  name: string;
  email: string;
  phone: number | null;
  country: string;
  state: string;
  timezone: string;
  role: string;
  status: any;
  company: any;
  // imageName: string;
  children?: any
}

const page: React.FC = ({ setSetting }: any) => {
  // Data

  const headers = [
    {
      heading: "#",
      field: "id",
      sort: true,
    },
    {
      heading: "Name",
      field: "name",
      sort: true,
    },
    {
      heading: "E-mail ID",
      field: "email",
      sort: false,
    },
    {
      heading: "Company",
      field: "company",
      sort: false,
    },
    {
      heading: "Roles",
      field: "role",
      sort: true,
    },
    {
      heading: "Status",
      field: "status",
      sort: false,
    },
  ];
  const [userData, setUserData] = useState<FormData[]>([
    {
      id: 1,
      name: "John Doe",
      email: "john.doe@example.com",
      phone: 1234567890,
      country: "United States",
      state: "California",
      timezone: "Pacific Time",
      role: "Admin",
      status: <Switch checked />,
      company: <MultiselectCompany width={48} />,
      children: [
        {
          id: 11,
          childName: "Child 1",
          childAge: 5,
          // Level 2 children
          children: [
            {
              id: 111,
              childName: "Grandchild 1",
              childAge: 2,
              // Add more nested levels if needed...
            },
          ],
        },
      ],
    },
    {
      id: 2,
      name: "Jane Smith",
      email: "jane.smith@example.com",
      phone: 1234561111,
      country: "Canada",
      state: "Ontario",
      timezone: "Eastern Time",
      role: "User",
      status: <Switch />,
      company: <MultiselectCompany width={48} />,
      children: [
        {
          id: 12,
          childName: "Child 2",
          childAge: 8,
          // Level 2 children
          children: [
            {
              id: 121,
              childName: "Grandchild 2",
              childAge: 4,
              // Add more nested levels if needed...
            },
          ],
        },
      ],
    },
    {
      id: 3,
      name: "Bob Johnson",
      email: "bob.johnson@example.com",
      phone: 9876543210,
      country: "United Kingdom",
      state: "England",
      timezone: "GMT",
      role: "Manager",
      status: <Switch checked />,

      company: <MultiselectCompany width={48} />,
      children: [
        {
          id: 12,
          childName: "Child 2",
          childAge: 8,
          // Level 2 children
          children: [
            {
              id: 121,
              childName: "Grandchild 2",
              childAge: 4,
              // Add more nested levels if needed...
            },
          ],
        },
      ],
    },

  ]);

  const [kebabMenuOpen, setKebabMenuOpen] = useState<string>("");
  const [isManageOpen, setIsManageOpen] = useState<boolean>(false);
  const [isEditOpen, setIsEditOpen] = useState<boolean>(false);
  const [isRemoveOpen, setIsRemoveOpen] = useState<boolean>(false);
  const [isCollapsed, setCollapse] = useState<boolean>(false);


  const handleKebabChange = (actionId: string) => {
    if (actionId === "Manage Rights") {
      setIsManageOpen(!isManageOpen)
    }
    if (actionId === "Edit") {
      setIsEditOpen(!isEditOpen)
    }
    if (actionId === "Remove") {
      setIsRemoveOpen(!isRemoveOpen)
    }
  };

  const modalClose = () => {
    setIsRemoveOpen(false);
  };

  const actionButtons = (
    <div className="flex items-center relative justify-evenly cursor-pointer rounded-full">
      <KebabMenuIcon />
    </div>
  );
  const actions = [actionButtons];
  const actionArray = ["Manage Rights", "Edit", "Remove"];

  // States
  const [isToggleOpen, setIsToggleOpen] = useState<boolean>(false);

  const handleToggleChange = () => {
    setIsToggleOpen(true);
  };

  const onDrawerData = (data: any) => {
    userData.push(data);
  };

  // const collapse = (data: any) => {
  //   setCollapse(data);
  // };

  const [mobileOpen, setMobileOpen] = useState<boolean>(false);
  const [Collapsed, setCollapsed] = useState<boolean>(false);
  const [drawer, setDrawer] = useState<boolean>(false);
  const [windowSize, setWindowSize] = useState(0);

  const isOpen = (arg: any) => {
    setMobileOpen(arg);
    setDrawer(arg)
  };
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
  const [isPageSetting, setIsPageSetting] = useState<boolean>(false);

  const wrapperData = (data: any) => {
    console.log("🚀 ~ file: page.tsx:227 ~ wrapperData ~ data:", data)
    setIsPageSetting(data);
  };
  
  return (
    <>
      <Wrapper setWrapperSetting={wrapperData}>
        {isPageSetting ? <div>Setting Drawer</div>
          :
          <div>
            {isManageOpen ? <RoleDrawer onClose={() => setIsManageOpen(false)} />
              : <div>
                {/* NavBar */}
                <div className="p-5 flex justify-between w-auto  bg-whiteSmoke ">
                  <div className="flex justify-star mx-3">
                    <Typography type="h5" className="!font-bold flex justify-center items-center text-center">Manage Users</Typography>
                  </div>
                  <div className="flex justify-end mx-3">
                    <Button
                      className="rounded-full !px-6 "
                      variant="btn-primary"
                      onClick={handleToggleChange}>
                      <Typography type="h6" className="!font-bold flex justify-center items-center text-center"><span className="mr-1"> <PlusIcon /></span> CREATE USER</Typography>
                    </Button>
                  </div>
                </div>

                {/* Data Table */}
                <div>
                  {userData.length > 0 && (
                    <Table
                      data={userData}
                      headers={headers}
                      actions={actions}
                      getRowId={(userData: any) => {
                        setKebabMenuOpen(userData);
                      }}
                      actionDesc={actionArray}
                      getAction={(value: any) => {
                        handleKebabChange(value);
                      }}
                      className={`!h-[424px]`}
                      sticky
                      sortable
                      action
                      actionSticky
                    />
                  )}
                </div>
              </div>}


            {isRemoveOpen && (
              <Modal
                isOpen={isRemoveOpen}
                onClose={modalClose}
                width="352px"
              >
                <ModalTitle>
                  <div className="py-3 px-4 font-bold">Remove</div>

                  <div className="" >
                    <Close variant="medium" />
                  </div>
                </ModalTitle>

                <ModalContent>
                  <div className="p-2 my-5">
                    Are you sure you want to remove the user ?
                  </div>
                </ModalContent>

                <ModalAction>
                  <div>
                    <Button
                      className="rounded-full btn-sm font-semibold mx-2 my-3 !w-16 !h-[36px]"
                      variant="btn-outline-error"
                    >
                      No
                    </Button>
                  </div>

                  <div>
                    <Button
                      className="rounded-full btn-sm font-semibold mx-2 my-3 !w-16 !h-[36px]"
                      variant="btn-error"
                    >
                      Yes
                    </Button>
                  </div>
                </ModalAction>
              </Modal>
            )}

            {/*  Drawer */}
            <Drawer
              onOpen={isToggleOpen || isEditOpen}
              onClose={() => { setIsToggleOpen(false), setIsEditOpen(false) }}
              onData={onDrawerData}
              drawerFor={isToggleOpen && "Add" || isEditOpen && "Edit" || ""}
            />
            {/* Drawer Overlay */}
            <DrawerOverlay
              isOpen={isToggleOpen || isEditOpen}
              onClose={() => { setIsToggleOpen(false), setIsEditOpen(false) }}
            />
          </div>}
      </Wrapper>
    </>
  );
};

export default page;