"use client";

import { Button, Close, DataTable, Modal, ModalAction, ModalContent, ModalTitle, Switch, Toast, Tooltip, Typography } from 'next-ts-lib';
import React, { useEffect, useRef, useState } from 'react';
import PlusIcon from '@/assets/Icons/PlusIcon';
import SearchIcon from '@/assets/Icons/SearchIcon';
import SyncIcon from "@/assets/Icons/SyncIcon";
import DrawerOverlay from '@/app/manage/users/DrawerOverlay';
import MeatballsMenuIcon from "@/assets/Icons/MeatballsMenu";
import axios from 'axios';
import ProductContent from './Drawer/Product&ServiceContent';
import Wrapper from '@/components/common/Wrapper';

interface productList {
    name: string;
    status: any;
    action: any;
}

const Product_Service: React.FC = () => {
    const [isOpenDrawer, setIsOpenDrawer] = useState<boolean>(false);
    const [isEditOpen, setIsEditOpen] = useState<boolean>(false);
    const [isRemoveOpen, setIsRemoveOpen] = useState<boolean>(false);
    const [editId, setEditId] = useState<number | null>();
    const [productList, setProductList] = useState<productList[]>([]);
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
                "CompanyId": 86,
            }
            const config = {
                headers: {
                    Authorization: `bearer ${token}`,
                },
            };
            const response = await axios.post(
                `${process.env.base_url}/productandservice/sync`,
                params,
                config
            );
            const { ResponseStatus, ResponseData, Message } = response.data;
            if (response.status === 200) {
                if (ResponseStatus === "Success") {
                    if (ResponseData !== null && typeof ResponseData === 'object') {
                        Toast.success("Error", "Product & Service Sync successfully");
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
        setEditId(id);
        if (actionName === "Edit") {
            setIsEditOpen(!isEditOpen)
        }
        if (actionName === "Remove") {
            setIsRemoveOpen(!isRemoveOpen)
        }
    };

    // Action
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
    //DataTable Data
    // const productListData = productList?.map(
    //     (e: any) =>
    //         new Object({
    //             name: e.Name,
    //             status: (
    //                 <div>
    //                     {e.Status == "active" ? (
    //                         <Switch checked={true} />
    //                     ) : (
    //                         <Switch checked={false} />
    //                     )}
    //                 </div>
    //             ),
    //             action: <Actions id={e.Id} recNo={e.RecordNo} actions={actionArray} />,
    //         })
    // );
    //Product List API
    const getProductList = async () => {
        try {
            const params = {
                "ProductSerObject": {
                    "Name": "",
                    "Type": "",
                    "Description": "",
                    "UnitPrice": "",
                    "Status": "",
                    "GlobalFilter": ""
                },
                "CompanyId": 86,
                "PageSize": 100,
                "Index": 1
            }
            const token = await localStorage.getItem("token");
            const config = {
                headers: {
                    Authorization: `bearer ${token}`,
                },
            };
            const response = await axios.post(
                `${process.env.base_url}/productandservice/getlist`, params,
                config
            );
            const { ResponseStatus, ResponseData, Message } = response.data;
            if (response.status === 200) {
                if (ResponseStatus === "Success") {
                    if (ResponseData !== null && typeof ResponseData === 'object') {
                        setProductList(ResponseData);
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
        getProductList();
    }, []);

    return (
        <Wrapper masterSettings={true}>

            <div>
                <div className="bg-whiteSmoke flex justify-between items-center">
                    <div className="flex items-center py-[10px] px-3">
                        <Typography type="h5" className="!font-bold flex justify-center items-center text-center">
                            Product & Service
                        </Typography>

                    </div>
                    <div className="flex items-center px-[10px]">
                        <Tooltip content={"Search"} position="bottom" className='!z-[2]'>
                            <SearchIcon />
                        </Tooltip>
                        <Tooltip content={`Sync Product & Service`} position="bottom" className='!z-[2]'>
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
                                Are you sure you want to sync product & service ?
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
                {/* {productListData.length > 0 && (
                    <DataTable
                        columns={columns}
                        data={productListData}
                        headerInvisible={false}
                        stickyHeader={true}
                        hoverEffect={true}
                    />
                )} */}

                <ProductContent onOpen={isOpenDrawer} onClose={handleDrawerClose} editId={typeof editId === 'number' ? editId : 0} />

                <DrawerOverlay
                    isOpen={isOpenDrawer}
                    onClose={handleDrawerClose}
                />
            </div>
        </Wrapper>
    )
}

export default Product_Service