"use client";

import axios from "axios";
import { Button, Close, DataTable, Modal, ModalAction, ModalContent, ModalTitle, Switch, Toast, Typography } from "next-ts-lib";
import "next-ts-lib/dist/index.css";
import React, { useEffect, useRef, useState } from "react";

import KebabMenuIcon from "@/assets/Icons/KebabMenuIcon";
import PlusIcon from "@/assets/Icons/PlusIcon";
import Wrapper from "@/components/common/Wrapper";
import Drawer from "./Drawer";
import DrawerOverlay from "./DrawerOverlay";
import RoleDrawer from "./RoleDrawer";

interface userData {
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

  const [isOpenDrawer, setIsOpenDrawer] = useState<boolean>(false);
  const [isManageOpen, setIsManageOpen] = useState<boolean>(false);
  const [isEditOpen, setIsEditOpen] = useState<boolean>(false);
  const [isRemoveOpen, setIsRemoveOpen] = useState<boolean>(false);
  const [isPageSetting, setIsPageSetting] = useState<boolean>(false);
  const [editId, setEditId] = useState<number | null>();
  const [userData, setUserData] = useState<userData[]>([]);

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
    setEditId(id);
    if (actionName === "Manage Rights") {
      setIsManageOpen(!isManageOpen)
    }
    if (actionName === "Edit") {
      setIsOpenDrawer(!isEditOpen)
    }
    if (actionName === "Remove") {
      setIsRemoveOpen(!isRemoveOpen)
    }
  };

  const handleDrawerClose = () => {
    setIsOpenDrawer(false);
    setEditId(null);
  }
  //User List API
  const getUserDataList = async () => {
    try {
      const params = {
        "GlobalSearch": "",
        "StatusFilter": null, //ALL= null, Active = 1, InActive = 0
        "PageIndex": 1,
        "PageSize": 100
      }
      const token = await localStorage.getItem("token");
      const config = {
        headers: {
          Authorization: `bearer ${token}`,
        },
      };
      const response = await axios.post(
        `${process.env.base_url}/user/getlist`, params,
        config
      );

      if (response.status === 200) {
        if (response.data.ResponseStatus === "Success") {
          setUserData(response.data.ResponseData.List);
        } else {
          const data = response.data.Message;
          if (data === null) {
            Toast.error("Error", "Please try again later.");
          } else {
            Toast.error("Error", data);
          }
        }
      }
    } catch (error) {
      console.error(error);
    }
  }

  //Update User Status API
  const updateStatus = async () => {
    try {
      const params = {
        "Id": 96,
        "Status": false
      }
      const token = await localStorage.getItem("token");
      const config = {
        headers: {
          Authorization: `bearer ${token}`,
        },
      };
      const response = await axios.post(
        `${process.env.base_url}/user/updatestatus`, params,
        config
      );

      if (response.status === 200) {
        if (response.data.ResponseStatus === "Success") {
          setUserData(response.data.ResponseData.List);
        } else {
          const data = response.data.Message;
          if (data === null) {
            Toast.error("Error", "Please try again later.");
          } else {
            Toast.error("Error", data);
          }
        }
      }
    } catch (error) {
      console.error(error);
    }
  }

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

  const updatedUserData = userData?.map((e: any) => new Object({
    id: e.id,
    name: e.first_name,
    email: e.email,
    company: e.company,
    role: e.role,
    status:
      <div>
        {e.is_Active ? <Switch checked={true} /> : <Switch checked={false} />}
      </div>,
    action: <Actions id={e.id} actions={actionArray} />
  }))

  const modalClose = () => {
    setIsRemoveOpen(false);
  };

  const handleToggleChange = () => {
    setIsOpenDrawer(true);
  };



  useEffect(() => {
    getUserDataList();
  }, []);

  return (
    <>
      <Wrapper masterSettings={false}>
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
              <div className="!h-[27.8rem] border-b border-lightSilver ">
                {userData.length > 0 && (
                  <DataTable
                    columns={columns}
                    data={updatedUserData}
                    // headerInvisible={false}
                    sticky
                    hoverEffect={true}
                  />
                )}
              </div>
            </div>}


          {/* Remove Modal */}
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

          {/*  Drawer */}
          <Drawer
            onOpen={isOpenDrawer}
            onClose={handleDrawerClose}
            editId={typeof editId === 'number' ? editId : 0}
          />
          {/* Drawer Overlay */}
          <DrawerOverlay
            isOpen={isOpenDrawer}
            onClose={handleDrawerClose}
          />
        </div>
      </Wrapper>
    </>
  );
};

export default page;