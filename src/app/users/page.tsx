"use client";

import { Button, Close, DataTable, Modal, ModalAction, ModalContent, ModalTitle, Switch, Table, Typography } from "next-ts-lib";
import "next-ts-lib/dist/index.css";
import React, { useEffect, useRef, useState } from "react";
import KebabMenuIcon from "../assets/icons/KebabMenuIcon";
import PlusIcon from "../assets/icons/PlusIcon";
import Navbar from "../components/common/Navbar";
import Wrapper from "../components/common/Wrapper";
import Drawer from "./Drawer";
import DrawerOverlay from "./DrawerOverlay";
import MultiselectCompany from "./MultiselectCompany";
import RoleDrawer from "./RoleDrawer";
import Dimension from "./Dimension";

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
  action: any;
}


const page: React.FC = () => {
  const [isToggleOpen, setIsToggleOpen] = useState<boolean>(false);
  const [isManageOpen, setIsManageOpen] = useState<boolean>(false);
  const [isEditOpen, setIsEditOpen] = useState<boolean>(false);
  const [isRemoveOpen, setIsRemoveOpen] = useState<boolean>(false);
  const [isPageSetting, setIsPageSetting] = useState<boolean>(false);

  const columns = [
    {
      header: "#",
      accessor: "id",
      sortable: true,
    },
    {
      header: "Name",
      accessor: "name",
      sortable: true,
    },
    {
      header: "E-mail ID",
      accessor: "email",
      sortable: false,
    },
    {
      header: "Company",
      accessor: "company",
      sortable: false,
    },
    {
      header: "Roles",
      accessor: "role",
      sortable: true,
    },
    {
      header: "Status",
      accessor: "status",
      sortable: false,
    },
    {
      header: "Action",
      accessor: "action",
      sortable: false,
    },
  ];
  const actionArray = ["Manage Rights", "Edit", "Remove"];

  const handleKebabChange = (actionName: string, id: number) => {
    if (actionName === "Manage Rights") {
      setIsManageOpen(!isManageOpen)
    }
    if (actionName === "Edit") {
      setIsEditOpen(!isEditOpen)
    }
    if (actionName === "Remove") {
      setIsRemoveOpen(!isRemoveOpen)
    }
  };

  const Actions = ({ actions, id }: any) => {
    const actionsRef = useRef<HTMLDivElement>(null);
    const [open, setOpen] = useState(false);
    const handleOutsideClick = (event: MouseEvent) => {
      if (
        actionsRef.current &&
        !actionsRef.current.contains(event.target as Node)
      ) {
        setOpen(false);
      }
    };
    useEffect(() => {
      window.addEventListener("click", handleOutsideClick);
      return () => {
        window.removeEventListener("click", handleOutsideClick);
      };
    }, []);
    return (
      <div
        ref={actionsRef}
        className="w-5 h-5 cursor-pointer relative"
        onClick={() => setOpen(!open)}>
        <KebabMenuIcon />
        {open && (
          <React.Fragment>
            <div className="relative z-10 flex justify-center items-center">
              <div className="absolute top-1 right-0 py-2 border border-lightSilver rounded-md bg-pureWhite shadow-lg ">
                <ul className="w-40">
                  {actions.map((action: any, index: any) => (
                    <li
                      key={index}
                      onClick={() => { handleKebabChange(action, id) }}
                      className="flex w-full h-9 px-3 hover:bg-lightGray !cursor-pointer">
                      <div className="flex justify-center items-center ml-2 cursor-pointer">
                        <label className="inline-block text-xs cursor-pointer">
                          {action}
                        </label>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </React.Fragment>
        )}
      </div>
    );
  };

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
      status: <Switch checked={true} />,
      company: <div className="!z-50"><MultiselectCompany width={24} /></div>,
      action: <Actions actions={actionArray} />
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
      status: <Switch checked={false} />,
      company: <MultiselectCompany width={48} />,
      action: <Actions actions={actionArray} />
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
      status: <Switch checked={true} />,
      company: <MultiselectCompany width={48} />,
      action: <Actions actions={actionArray} />
    },
  ]);

  const modalClose = () => {
    setIsRemoveOpen(false);
  };

  const handleToggleChange = () => {
    setIsToggleOpen(true);
  };

  const onDrawerData = (data: any) => {
    userData.push(data);
  };

  const wrapperData = (data: any) => {
    setIsPageSetting(data);
  };

  return (
    <>
      <Wrapper setWrapperSetting={wrapperData}>
        {!isPageSetting ?
          <div><Dimension /></div>
          : <div>
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
                    <DataTable
                      columns={columns}
                      data={userData}
                      headerInvisible={false}
                      stickyHeader={true}
                      hoverEffect={true}
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