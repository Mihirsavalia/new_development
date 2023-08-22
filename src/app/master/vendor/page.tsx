"use client";

import DrawerOverlay from '@/app/manage/users/DrawerOverlay';
import MeatballsMenuIcon from "@/assets/Icons/MeatballsMenu";
import PlusIcon from '@/assets/Icons/PlusIcon';
import SearchIcon from '@/assets/Icons/SearchIcon';
import SyncIcon from "@/assets/Icons/SyncIcon";
import Wrapper from '@/components/common/Wrapper';
import { useCompanyContext } from '@/context/companyContext';
import { callAPI } from '@/utils/API/callAPI';
import { hasNoToken } from "@/utils/commonFunction";
import { Button, Close, DataTable, Loader, Modal, ModalAction, ModalContent, ModalTitle, Text, Toast, Tooltip, Typography } from 'next-ts-lib';
import "next-ts-lib/dist/index.css";
import { useRouter } from "next/navigation";
import React, { useEffect, useRef, useState } from 'react';

interface accountList {
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
    const [accountEditId, setAccountEditId] = useState<number | null>();
    const [accountList, setAccountList] = useState<accountList[]>([]);
    const [isSyncModalOpen, setIsSyncModalOpen] = useState<boolean>(false);
    const [isSearch, setIsSearch] = useState<boolean>(false);
    const [searchValue, setSearchValue] = useState<string>("");
    const [searchHasError, setSearchHasError] = useState<boolean>(false);

    const columns = [
        {
            header: "ITEM ID",
            accessor: "itemId",
            sortable: true,
        },
        {
            header: "NAME",
            accessor: "name",
            sortable: true,
        },
        {
            header: "TYPE",
            accessor: "type",
            sortable: false,
        },
        {
            header: "ACCOUNT",
            accessor: "account",
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
        const url = `${process.env.base_url}/vendor/sync`;
        const successCallback = () => {
            Toast.success("Vendor Sync successfully");
        };
        callAPI(url, params, successCallback);
    };

    //Account List API
    const getAccountList = async () => {
        modalClose();
        // const params = {
        //     FilterObj: {
        //         AccountNo: "",
        //         Name: "",
        //         FullyQualifiedName: "",
        //         AccountType: "",
        //         ClosingType: "",
        //         NormalBalance: "",
        //         CurrentBalance: "",
        //         Status: "active",
        //         GlobalFilter: ""
        //     },
        //     CompanyId: CompanyId,
        //     Index: 1,
        //     PageSize: 1000
        // }
        // const url = `${process.env.base_url}/vendor/getlist`;
        // const successCallback = (ResponseData: any) => {
        //     if (ResponseData !== null && typeof ResponseData === 'object') {
        //         setAccountList(ResponseData);
        //     }
        // };
        // callAPI(url, params, successCallback);
    };
    useEffect(() => {
        getAccountList();
    }, []);

    //Delete Class API 
    const handleVendorDelete = async () => {
        modalClose();
        // const params = {
        //     CompanyId: CompanyId,
        //     Id: 354,
        //     RecordNo: "124"
        // };
        // const url = `${process.env.base_url}/vendor/delete`;
        // const successCallback = () => {
        //     Toast.success("Error", "Vendor Remove successfully");
        // };
        // callAPI(url, params, successCallback);
    };

    const actionArray = ["Edit", "Remove"];

    const handleKebabChange = (actionName: string, id: number) => {
        setAccountEditId(id);
        if (actionName === "Edit") {
            setIsEditOpen(!isEditOpen)
        }
        if (actionName === "Remove") {
            setIsRemoveOpen(!isRemoveOpen)
        }
    };
    //Action
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
            <div className="relative w-full flex justify-end">
                <div
                    ref={actionsRef}
                    className="cursor-pointer w-10 flex justify-center items-center"
                    onClick={() => setOpen(!open)}
                >
                    <MeatballsMenuIcon />
                    {open && (
                        <React.Fragment>
                            <div className="absolute z-10 top-7 right-1 flex justify-center items-center">
                                <div className="py-2 border border-lightSilver rounded-md bg-pureWhite shadow-lg ">
                                    <ul className="w-40">
                                        {actions.map((action: any, index: any) => (
                                            <li
                                                key={index}
                                                onClick={() => {
                                                    handleKebabChange(action, id);
                                                }}
                                                className="flex w-full h-9 px-3 hover:bg-lightGray !cursor-pointer"
                                            >
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
            </div>
        );
    };

    const handleToggleChange = () => {
        setIsOpenDrawer(true);
    };

    const handleDrawerClose = () => {
        setIsOpenDrawer(false);
    }
    const modalClose = () => {
        setIsSyncModalOpen(false);
    };
    const handleSearchValue = (value: string) => {
        setIsSearch(true);
        setSearchValue(value);
    };
    const handleSearchClose = () => {
        setIsSearch(false);
        setSearchValue("");
    };

    const [tableData, setTableData] = useState([
        {
            itemId: "V-616",
            name: "John Doe",
            type: "service",
            account: "AP",
            action: <Actions actions={actionArray} />
        },
        {
            itemId: "V-615",
            name: "Jane Smith",
            type: "Category",
            account: "AP",
            action: <Actions actions={actionArray} />
        },
        {
            itemId: "V-620",
            name: "Bob Johnson",
            type: "service",
            account: "AP BI",
            action: <Actions actions={actionArray} />
        }
    ]);

    return (<>
        <Wrapper masterSettings={true}>
            <div>
                <div className="bg-whiteSmoke h-[66px] flex justify-between items-center">
                    <div className="flex items-center py-[10px] px-3">
                        <Typography type="h5" className="!font-bold flex justify-center items-center text-center">
                            Vendor
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
                        <Tooltip content={`Sync Vendor`} position="bottom" className='!z-[2] !p-0 !m-0'>
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
                                Are you sure you want to sync Vendor ?
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
                                variant="btn-error" onClick={handleVendorDelete} >
                                YES
                            </Button>
                        </div>
                    </ModalAction>
                </Modal>

                {/* DataTable */}
                {tableData.length <= 0 ? <div className="h-[445px] w-full  flex items-center justify-center"><Loader size="md" helperText /></div> :
                    <div className="h-[445px]">
                        {tableData.length > 0 && (
                            <DataTable
                                columns={columns}
                                data={tableData}

                                sticky
                                hoverEffect={true}
                            />
                        )}
                    </div>}
                <DrawerOverlay
                    isOpen={isOpenDrawer}
                    onClose={handleDrawerClose}
                />
            </div>
        </Wrapper>
    </>
    )
}

export default Vendor