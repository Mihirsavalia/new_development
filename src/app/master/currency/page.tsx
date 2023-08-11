"use client";

import { Button, Close, DataTable, Modal, ModalAction, ModalContent, ModalTitle, Switch, Toast, Tooltip, Typography } from 'next-ts-lib';
import React, { useEffect, useRef, useState } from 'react';
import PlusIcon from '@/assets/Icons/PlusIcon';
import SearchIcon from '@/assets/Icons/SearchIcon';
import SyncIcon from "@/assets/Icons/SyncIcon";
import DrawerOverlay from '@/app/manage/users/DrawerOverlay';
import MeatballsMenuIcon from "@/assets/Icons/MeatballsMenu";
import Wrapper from '@/components/common/Wrapper';
import axios from 'axios';

interface accountList {
    name: string;
    status: any;
    action: any;
}

const GLAccount: React.FC = () => {
    const [isOpenDrawer, setIsOpenDrawer] = useState<boolean>(false);
    const [isEditOpen, setIsEditOpen] = useState<boolean>(false);
    const [isRemoveOpen, setIsRemoveOpen] = useState<boolean>(false);
    const [editIt, setAccountEditId] = useState<number | null>();
    const [accountList, setAccountList] = useState<accountList[]>([]);
    const [isSyncModalOpen, setIsSyncModalOpen] = useState<boolean>(false);

    const handleToggleChange = () => {
        setIsOpenDrawer(true);
    };

    const handleDrawerClose = () => {
        setIsOpenDrawer(false);
    }
    const modalClose = () => {
        setIsSyncModalOpen(false);
    };

    //Sync API
    const handleSync = async () => {
        try {
            const token = await localStorage.getItem("token");
            const params = {
                "CompanyId":76,
            }
            const config = {
                headers: {
                    Authorization: `bearer ${token}`,
                },
            };
            const response = await axios.post(
                `${process.env.base_url}/account/sync`,
                params,
                config
            );
            const { ResponseStatus, ResponseData, Message } = response.data;
            if (response.status === 200) {
                if (ResponseStatus === "Success") {
                    if (ResponseData !== null && typeof ResponseData === 'object') {
                        Toast.success("Success", "Account Sync successfully");
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

    //Account List API
    const getAccountList = async () => {
        try {
            const params = {
                "FilterObj": {
                    "AccountNo": "",
                    "Name": "GL1",
                    "FullyQualifiedName": "AP GL",
                    "AccountType": "",
                    "ClosingType": "",
                    "NormalBalance": "",
                    "CurrentBalance": "",
                    "Status": "active",
                    "GlobalFilter": ""
                },
                "CompanyId":76,
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
                `${process.env.base_url}/account/getlist`, params,
                config
            );
            console.log("🚀 ~ file: GLAccount.tsx:194 ~ getAccountList ~ response:", response)
            const { ResponseStatus, ResponseData, Message } = response.data;
            if (response.status === 200) {
                if (ResponseStatus === "Success") {
                    if (ResponseData !== null && typeof ResponseData === 'object') {
                        setAccountList(ResponseData);
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
        getAccountList();
    }, []);

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

    return (
        <Wrapper masterSettings={true}>
        <div>
            <div className="bg-whiteSmoke flex justify-between items-center">
                <div className="flex items-center py-[10px] px-3">
                    <Typography type="h5" className="!font-bold flex justify-center items-center text-center">
                        GL Account
                    </Typography>

                </div>
                <div className="flex items-center px-[10px]">
                    <Tooltip content={"Search"} position="bottom" className='!z-[2]'>
                        <SearchIcon />
                    </Tooltip>
                    <Tooltip content={`Sync GL Account`} position="bottom" className='!z-[2]'>
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
                            Are you sure you want to sync GL Account ?
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

            <DrawerOverlay
                isOpen={isOpenDrawer}
                onClose={handleDrawerClose}
            />
        </div>
        </Wrapper>
    )
}

export default GLAccount