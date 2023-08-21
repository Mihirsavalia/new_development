"use client";

import DrawerOverlay from '@/app/manage/users/DrawerOverlay';
import MeatballsMenuIcon from "@/assets/Icons/MeatballsMenu";
import PlusIcon from '@/assets/Icons/PlusIcon';
import SearchIcon from '@/assets/Icons/SearchIcon';
import SyncIcon from "@/assets/Icons/SyncIcon";
import Wrapper from '@/components/common/Wrapper';
import { callAPI } from '@/utils/API/callAPI';
import { hasNoToken } from "@/utils/commonFunction";
import { Button, Close, DataTable, Modal, ModalAction, ModalContent, ModalTitle, Switch, Text, Toast, Tooltip, Typography } from 'next-ts-lib';
import "next-ts-lib/dist/index.css";
import { useRouter } from "next/navigation";
import React, { useEffect, useRef, useState } from 'react';
import APTermContent from './Drawer/ApTermDrawer';
import { useCompanyContext } from '@/context/companyContext';

interface apTermList {
  name: string;
  status: any;
  action: any;
}

const Vendor: React.FC = () => {
  const router = useRouter();

  useEffect(() => {
    hasNoToken(router);
  }, [router]);
  const { CompanyId } = useCompanyContext();
  const [isOpenDrawer, setIsOpenDrawer] = useState<boolean>(false);
  const [isEditOpen, setIsEditOpen] = useState<boolean>(false);
  const [isRemoveOpen, setIsRemoveOpen] = useState<boolean>(false);
  const [EditId, setEditId] = useState<number | null>();
  const [apTermList, setAPTermList] = useState<apTermList[]>([]);
  const [isSyncModalOpen, setIsSyncModalOpen] = useState<boolean>(false);
  const [isSearch, setIsSearch] = useState<boolean>(false);
  const [searchValue, setSearchValue] = useState<string>("");
  const [searchHasError, setSearchHasError] = useState<boolean>(false);

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

  //Sync API
  const handleSync = async () => {
    modalClose();
    const params = {
      CompanyId: CompanyId
    };
    const url = `${process.env.base_url}/apTerm/sync`;
    const successCallback = () => {
      Toast.success("Success", "APTerm Sync successfully");
    };
    callAPI(url, params, successCallback);
  };

  //APTerm List API
  const getAPTermList = async () => {
    const params = {
      FilterObj: {
        APTermNo: "",
        Name: "",
        FullyQualifiedName: "",
        APTermType: "",
        ClosingType: "",
        NormalBalance: "",
        CurrentBalance: "",
        Status: "active",
        GlobalFilter: ""
      },
      CompanyId: CompanyId,
      Index: 1,
      PageSize: 1000
    };
    const url = `${process.env.base_url}/apTerm/getlist`;
    const successCallback = (ResponseData: any) => {
      if (ResponseData !== null && typeof ResponseData === 'object') {
        setAPTermList(ResponseData);
      }
    };
    callAPI(url, params, successCallback);
  };
  useEffect(() => {
    getAPTermList();
  }, []);

  //Delete Class API 
  const handleAPTermDelete = async () => {
    modalClose();
    const params = {
      CompanyId: CompanyId,
      Id: 354,
      RecordNo: "124"
    };
    const url = `${process.env.base_url}/apTerm/delete`;
    const successCallback = () => {
      Toast.success("Error", "AP Term Remove successfully");
    };
    callAPI(url, params, successCallback);
  };

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
  const handleSearchValue = (value: string) => {
    setIsSearch(true);
    setSearchValue(value);
  };
  const handleSearchClose = () => {
    setIsSearch(false);
    setSearchValue("");
  };

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
            {isSearch
              ? <div className="flex relative items-center">
                <Text
                  id="searching"
                  name="searching"
                  value={searchValue}
                  placeholder="Search"
                  className='pl-8 border-0 rounded-full'
                  getValue={(value: any) => handleSearchValue(value)}
                  getError={(e: any) => setSearchHasError(e)}
                ></Text>
                <div className="flex absolute left-2 cursor-pointer">
                  <SearchIcon />
                </div>
                {isSearch && (
                  <div
                    className="flex absolute -top-2 -right-2 cursor-pointer"
                    onClick={handleSearchClose}
                  >
                    <Tooltip position="bottom" content="close" className='!z-[2]'>
                      <Close variant="small" />
                    </Tooltip>
                  </div>
                )}
              </div>
              : <Tooltip content={"Search"} position="bottom" className='!z-[2]'>
                <div onClick={() => { setIsSearch(true) }}>
                  <SearchIcon />
                </div>
              </Tooltip>}
            <Tooltip content={`Sync AP Term`} position="bottom" className='!z-[2]'>
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
          width="376px">
          <ModalTitle>
            <div className="py-3 px-4 font-bold">Sync</div>
            <div onClick={modalClose}>
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
                variant="btn-outline" onClick={modalClose}>
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
          width="376px">
          <ModalTitle>
            <div className="py-3 px-4 font-bold">Remove</div>
            <div className="" >
              <Close variant="medium" />
            </div>
          </ModalTitle>
          <ModalContent>
            <div className="px-4 py-6">
              <Typography type='h5' className='!font-normal'>
                Are you sure you want to remove the AP Term ?
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
            sticky
            hoverEffect={true}
          />
        )}

        <APTermContent onOpen={isOpenDrawer} onClose={handleDrawerClose} EditId={typeof EditId === 'number' ? EditId : 0} />

        <DrawerOverlay
          isOpen={isOpenDrawer}
          onClose={handleDrawerClose}
        />
      </div>
    </Wrapper>
  )
}

export default Vendor