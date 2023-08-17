"use client";

import { Button, Close, DataTable, Loader, Modal, ModalAction, ModalContent, ModalTitle, Switch, Toast, Tooltip, Typography } from 'next-ts-lib';
import React, { useEffect, useRef, useState } from 'react';
import PlusIcon from '@/assets/Icons/PlusIcon';
import SearchIcon from '@/assets/Icons/SearchIcon';
import SyncIcon from "@/assets/Icons/SyncIcon";
import DrawerOverlay from '@/app/manage/users/DrawerOverlay';
import MeatballsMenuIcon from "@/assets/Icons/MeatballsMenu";
import axios from 'axios';
import ProductContent from './Drawer/Product&ServiceContent';
import Wrapper from '@/components/common/Wrapper';
import "next-ts-lib/dist/index.css";

interface productList {
    name: string;
    status: any;
    action: any;
}

const Product_Service: React.FC = () => {
    const [isOpenDrawer, setIsOpenDrawer] = useState<boolean>(false);

    const [isRemoveOpen, setIsRemoveOpen] = useState<boolean>(false);
    const [Id, setId] = useState<number | null>();
    const [productList, setProductList] = useState<productList[]>([]);
    const [isSyncModalOpen, setIsSyncModalOpen] = useState<boolean>(false);
    const [refreshTable, setRefreshTable] = useState<boolean>(false);

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
        // {
        //     header: "ACCOUNT",
        //     accessor: "account",
        //     sortable: false,
        // },
        {
            header: "",
            accessor: "action",
            sortable: false,
        },
    ];

    //Sync API
    const handleSync = async () => {
        modalClose();
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
                        Toast.success("Success", "Product & Service Sync successfully");
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
                        setProductList(ResponseData.AllItems);
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
    }, [refreshTable]);

    const actionArray = ["Edit", "Remove"];

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

    //DataTable Data
    const productListData = productList?.map(
        (e: any) =>
            new Object({
                itemId: e.ItemId,
                name: e.Name,
                type: e.ItemType,
                account: e.account,
                action: <Actions id={e.ItemId} actions={actionArray} />,
            })
    );

    const handleToggleChange = () => {
        setIsOpenDrawer(true);
    };

    const handleDrawerClose = () => {
        setIsOpenDrawer(false);
        setId(null);
        setRefreshTable(prevValue => !prevValue);
    };

    const modalClose = () => {
        setIsSyncModalOpen(false);
        setIsRemoveOpen(false);
    };

    const handleKebabChange = (
        actionName: string,
        id: number,
    ) => {
        setId(id);
        if (actionName === "Edit") {
            setIsOpenDrawer(true);
        }
        if (actionName === "Remove") {
            setIsRemoveOpen(!isRemoveOpen);
        }
    };

    //Delete Product API
    const handleProductDelete = async () => {
        modalClose();
        try {
            const token = await localStorage.getItem("token");
            const params = {
                CompanyId: 86,
                Id: Id,
            };
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
                    if (ResponseData !== null && typeof ResponseData === "object") {
                        Toast.success("Success", "Product Remove successfully");
                        getProductList();
                    }
                } else {
                    if (Message === null) {
                        Toast.error("Error", "Please try again later.");
                    } else {
                        Toast.error("Error", Message);
                    }
                }
            } else {
                if (Message === null) {
                    Toast.error("Error", "Please try again later.");
                } else {
                    Toast.error("Error", Message);
                }
            }
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <Wrapper masterSettings={true}>
            <div>
                <div className="bg-whiteSmoke h-[66px] flex justify-between items-center">
                    <div className="flex items-center py-[10px] px-3">
                        <Typography type="h5" className="!font-bold flex justify-center items-center text-center">
                            Product & Service
                        </Typography>

                    </div>
                    <div className="flex items-center px-[10px]">
                        <Tooltip content={"Search"} position="bottom" className='!z-[2]'>
                            <SearchIcon />
                        </Tooltip>
                        <Tooltip content={`Sync Product & Service`} position="bottom" className='!z-[2] !p-0 !m-0'>
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
                                Are you sure you want to sync product & service ?
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
                {productList.length <= 0 ? <div className="h-[445px] w-full  flex items-center justify-center"><Loader size="md" helperText /></div> :
                    <div className="h-[445px]">
                        {productListData.length > 0 && (
                            <DataTable
                                columns={columns}
                                data={productListData}
                                sticky
                                hoverEffect={true}
                            />
                        )}
                    </div>}

                {/* Remove Modal */}
                <Modal isOpen={isRemoveOpen} onClose={modalClose} width="376px">
                    <ModalTitle>
                        <div className="py-3 px-4 font-bold">Remove</div>
                        <div onClick={modalClose}>
                            <Close variant="medium" />
                        </div>
                    </ModalTitle>
                    <ModalContent>
                        <div className="p-2 my-5">
                            <Typography type="h5" className="!font-normal">
                                Are you sure you want to remove the product ?
                            </Typography>
                        </div>
                    </ModalContent>
                    <ModalAction>
                        <div>
                            <Button
                                className="rounded-full btn-sm font-semibold mx-2 my-3 !w-16 !h-[36px]"
                                variant="btn-outline" onClick={modalClose}
                            >
                                NO
                            </Button>
                        </div>
                        <div>
                            <Button
                                className="rounded-full btn-sm font-semibold mx-2 my-3 !w-16 !h-[36px]"
                                variant="btn-error"
                                onClick={handleProductDelete}
                            >
                                YES
                            </Button>
                        </div>
                    </ModalAction>
                </Modal>

                <ProductContent onOpen={isOpenDrawer} onClose={handleDrawerClose} EditId={typeof Id === 'number' ? Id : 0} />
                <DrawerOverlay
                    isOpen={isOpenDrawer}
                    onClose={handleDrawerClose}
                />
            </div>
        </Wrapper>
    )
}

export default Product_Service