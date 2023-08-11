"use client";

import { Button, Close, DataTable, Modal, ModalAction, ModalContent, ModalTitle, Switch, Toast, Tooltip, Typography } from 'next-ts-lib';
import "next-ts-lib/dist/index.css";
import React, { useEffect, useRef, useState } from 'react';
import PlusIcon from '@/app/assets/icons/PlusIcon';
import SearchIcon from '@/app/assets/icons/SearchIcon';
import SyncIcon from "@/app/assets/icons/SyncIcon";
import DrawerOverlay from '@/app/manage/users/DrawerOverlay';
import MeatballsMenuIcon from "@/app/assets/icons/MeatballsMenu";
import Wrapper from '@/app/components/common/Wrapper';
import axios from 'axios';
import APTermContent from './Drawer/ApTermContent';

interface apTermList {
  name: string;
  status: any;
  action: any;
}

const Vendor: React.FC = () => {
  const [isOpenDrawer, setIsOpenDrawer] = useState<boolean>(false);
  const [isEditOpen, setIsEditOpen] = useState<boolean>(false);
  const [isRemoveOpen, setIsRemoveOpen] = useState<boolean>(false);
  const [editId, setEditId] = useState<number | null>();
  const [apTermList, setAPTermList] = useState<apTermList[]>([]);
  const [isSyncModalOpen, setIsSyncModalOpen] = useState<boolean>(false);

  const handleToggleChange = () => {
    setIsOpenDrawer(true);
  };

  const handleDrawerClose = () => {
    setIsOpenDrawer(false);
  }
  const modalClose = () => {
    setIsSyncModalOpen(false);
    setIsRemoveOpen(false);
  };

  //Sync API
  const handleSync = async () => {
    try {
      const token = await localStorage.getItem("token");
      const params = {
        "CompanyId": 80,
      }
      const config = {
        headers: {
          Authorization: `bearer ${token}`,
        },
      };
      const response = await axios.post(
        `${process.env.base_url}/apTerm/sync`,
        params,
        config
      );
      const { ResponseStatus, ResponseData, Message } = response.data;
      if (response.status === 200) {
        if (ResponseStatus === "Success") {
          if (ResponseData !== null && typeof ResponseData === 'object') {
            Toast.success("Success", "APTerm Sync successfully");
          }
        } else {
          if (Message != null) {
            Toast.error("Error", Message);
          }
        }
      }
      else {
        if (Message === null) {
          Toast.error("Error", "Please try again later.");
        } else {
          Toast.error("Error", Message);
        }
      }
    } catch (error) {
      console.error(error);
    }
  }

  const columns = [
    {
      header: "NAME",
      accessor: "name",
      sortable: true,
    },
    {
      header: "DESCRIPTION",
      accessor: "description",
      sortable: false,
    },
    {
      header: "STATUS",
      accessor: "status",
      sortable: false,
    },
    {
      header: "",
      accessor: "action",
      sortable: false,
    },
  ];
  const actionArray = ["Edit", "Remove"];

  const handleKebabChange = (actionName: string, id: number) => {
    setEditId(id);
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
        className="cursor-pointer flex justify-end"
        onClick={() => setOpen(!open)}>
        <MeatballsMenuIcon />
        {open && (
          <React.Fragment>
            <div className="relative z-10 flex justify-center items-center">
              <div className="absolute top-0 right-0 py-2 border border-lightSilver rounded-md bg-pureWhite shadow-lg ">
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

  //APTerm List API
  const getAPTermList = async () => {
    try {
      const params = {
        "FilterObj": {
          "APTermNo": "",
          "Name": "GL1",
          "FullyQualifiedName": "AP GL",
          "APTermType": "",
          "ClosingType": "",
          "NormalBalance": "",
          "CurrentBalance": "",
          "Status": "active",
          "GlobalFilter": ""
        },
        "CompanyId": 80,
        "Index": 1,
        "PageSize": 10
      }
      const token = await localStorage.getItem("token");
      const config = {
        headers: {
          Authorization: `bearer ${token}`,
        },
      };
      const response = await axios.post(
        `${process.env.base_url}/apTerm/getlist`, params,
        config
      );
      const { ResponseStatus, ResponseData, Message } = response.data;
      if (response.status === 200) {
        if (ResponseStatus === "Success") {
          if (ResponseData !== null && typeof ResponseData === 'object') {
            setAPTermList(ResponseData);
          }
        } else {
          if (Message === null) {
            Toast.error("Error", "Please try again later.");
          } else {
            Toast.error("Error", Message);
          }
        }
      }
      else {
        if (Message === null) {
          Toast.error("Error", "Please try again later.");
        } else {
          Toast.error("Error", Message);
        }
      }
    } catch (error) {
      console.error(error);
    }
  }
  useEffect(() => {
    getAPTermList();
  }, []);


  const [tableData, setTableData] = useState([
    {
      name: "John Doe",
      description: "service",
      status: <Switch checked={true} />,
      action: <Actions actions={actionArray} />
    },
    {
      name: "Jane Smith",
      description: "Category",
      status: <Switch checked={false} />,
      action: <Actions actions={actionArray} />
    },
    {
      name: "Bob Johnson",
      description: "service",
      status: <Switch checked={true} />,
      action: <Actions actions={actionArray} />
    }
  ]);

  //Delete Class API 
  const handleAPTermDelete = async () => {
    try {
      const token = await localStorage.getItem("token");
      const params = {
        "CompanyId": 80,
        "Id": 354,
        "RecordNo": "124"
      }
      const config = {
        headers: {
          Authorization: `bearer ${token}`,
        },
      };
      const response = await axios.post(
        `${process.env.base_url}/class/delete `,
        params,
        config
      );
      const { ResponseStatus, ResponseData, Message } = response.data;
      if (response.status === 200) {
        if (ResponseStatus === "Success") {
          if (ResponseData !== null && typeof ResponseData === 'object') {
            Toast.success("Error", "Class Remove successfully");
          }
        } else {
          if (Message != null) {
            Toast.error("Error", Message);
          }
        }
      }
      else {
        if (Message === null) {
          Toast.error("Error", "Please try again later.");
        } else {
          Toast.error("Error", Message);
        }
      }
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <Wrapper masterSettings={true}>
      <div>
        <div className="bg-whiteSmoke flex justify-between items-center">
          <div className="flex items-center py-[10px] px-3">
            <Typography type="h5" className="!font-bold flex justify-center items-center text-center">
              AP Term
            </Typography>

          </div>
          <div className="flex items-center px-[10px]">
            <Tooltip content={"Search"} position="bottom" className='!z-[2]'>
              <SearchIcon />
            </Tooltip>
            <Tooltip content={`Sync GL APTerm`} position="bottom" className='!z-[2]'>
              <div onClick={() => setIsSyncModalOpen(true)}>
                <SyncIcon />
              </div>
            </Tooltip>
            <Button
              className="rounded-full !px-6 "
              variant="btn-primary"
              onClick={handleToggleChange}>
              <Typography type="h6" className="!font-bold flex justify-center items-center text-center"><span className="mr-1"> <PlusIcon /></span> CREATE NEW</Typography>
            </Button>
          </div>
        </div>

        {/* Sync Modal */}
        <Modal
          isOpen={isSyncModalOpen}
          onClose={modalClose}
          width="363px">
          <ModalTitle>
            <div className="py-3 px-4 font-bold">Sync</div>
            <div className="" >
              <Close variant="medium" />
            </div>
          </ModalTitle>
          <ModalContent>
            <div className="px-4 py-6">
              <Typography type='h5' className='!font-normal'>
                Are you sure you want to sync AP Term ?
              </Typography>
            </div>
          </ModalContent>
          <ModalAction>
            <div>
              <Button
                className="rounded-full btn-sm font-semibold mx-2 my-3 !w-16 !h-[36px]"
                variant="btn-outline">
                NO
              </Button>
            </div>
            <div>
              <Button
                className="rounded-full btn-sm font-semibold mx-2 my-3 !w-16 !h-[36px]"
                variant="btn-primary" onClick={handleSync}>
                YES
              </Button>
            </div>
          </ModalAction>
        </Modal>

        {/*Remove Modal */}
        <Modal
          isOpen={isRemoveOpen}
          onClose={modalClose}
          width="363px">
          <ModalTitle>
            <div className="py-3 px-4 font-bold">Remove</div>
            <div className="" >
              <Close variant="medium" />
            </div>
          </ModalTitle>
          <ModalContent>
            <div className="px-4 py-6">
              <Typography type='h5' className='!font-normal'>
                Are you sure you want to remove the apTerm ?
              </Typography>
            </div>
          </ModalContent>
          <ModalAction>
            <div>
              <Button
                className="rounded-full btn-sm font-semibold mx-2 my-3 !w-16 !h-[36px]"
                variant="btn-outline">
                NO
              </Button>
            </div>
            <div>
              <Button
                className="rounded-full btn-sm font-semibold mx-2 my-3 !w-16 !h-[36px]"
                variant="btn-error" onClick={handleAPTermDelete} >
                YES
              </Button>
            </div>
          </ModalAction>
        </Modal>

        {/* DataTable */}
        {tableData.length > 0 && (
          <DataTable
            columns={columns}
            data={tableData}
            headerInvisible={false}
            stickyHeader={true}
            hoverEffect={true}
          />
        )}

        <APTermContent onOpen={isOpenDrawer} onClose={handleDrawerClose} editId={typeof editId === 'number' ? editId : 0} />

        <DrawerOverlay
          isOpen={isOpenDrawer}
          onClose={handleDrawerClose}
        />
      </div>
    </Wrapper>
  )
}

export default Vendor