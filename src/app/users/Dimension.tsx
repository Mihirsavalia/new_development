import { Button, Close, Modal, ModalAction, ModalContent, ModalTitle, Toast, Tooltip, Typography } from 'next-ts-lib';
import React, { useState } from 'react';
import PlusIcon from '@/app/assets/icons/PlusIcon';
import SearchIcon from '@/app/assets/icons/SearchIcon';
import SyncIcon from "@/app/assets/icons/SyncIcon";
import Class from './Tables/Class';
import Department from './Tables/Department';
import Location from './Tables/Location';
import Project from './Tables/Project';
import DrawerOverlay from './DrawerOverlay';
import axios from 'axios';

const tabs = [
    { id: "class", label: "CLASS" },
    { id: "location", label: "LOCATION" },
    { id: "department", label: "DEPARTMENT" },
    { id: "project", label: "PROJECT" },
];

const Dimension: React.FC = () => {
    const [selectedTabIndex, setSelectedTabIndex] = useState<number>(0);
    const [tab, setTab] = useState<string>("class");
    const [isOpenDrawer, setIsOpenDrawer] = useState<boolean>(false);
    const [hasEditId, setHasEditId] = useState("");
    const [isSyncModalOpen, setIsSyncModalOpen] = useState<boolean>(false);


    const handleToggleChange = (tab: any) => {
        setIsOpenDrawer(true);
    };
    const handleDrawerClose = () => {
        setIsOpenDrawer(false);
    }
    const modalClose = () => {
        setIsSyncModalOpen(false);
    };
    const handleTabClick = (tabId: string, index: number) => {
        setTab(tabId);
        setSelectedTabIndex(index);
        setIsOpenDrawer(false);
    }

    //Sync API
    const handleSync = async () => {
        try {
            const token = await localStorage.getItem("token");
            const params = {
                "CompanyId": 65,
            }
            const config = {
                headers: {
                    Authorization: `bearer ${token}`,
                },
            };
            const response = await axios.post(
                `${process.env.base_url}/${tab}/sync`,
                params,
                config
            );
            const { ResponseStatus, ResponseData, Message } = response.data;
            if (response.status === 200) {
                if (ResponseStatus === "Success") {
                    if (ResponseData !== null && typeof ResponseData === 'object') {
                        Toast.success("Error", `${tab} Sync successfully`);
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
        <div>
            <div className="bg-whiteSmoke flex justify-between items-center">
                <div className="flex items-center py-[10px] ">
                    {tabs.map((tab: any, index: any) => (
                        <div onClick={() => handleTabClick(tab.id, index)} key={tab.id}>
                            <Typography type="h6"
                                className={`border-r ${index > 2 ? `border-none ` : `border-r-lightSilver`} px-[20px] text-[14px] cursor-pointer ${selectedTabIndex === index
                                    ? "text-primary text-[16px] font-[600]"
                                    : "text-slatyGrey"
                                    }`}
                            >
                                {tab.label}
                            </Typography>
                        </div>
                    ))}

                </div>
                <div className="flex items-center px-[10px]">
                    <Tooltip content={"Search"} position="bottom" className='!z-[2]'>
                        <SearchIcon />
                    </Tooltip>
                    <Tooltip content={`Sync ${tab}`} position="bottom" className='!z-[2]'>
                        <div onClick={() => setIsSyncModalOpen(true)}>
                            <SyncIcon />
                        </div>
                    </Tooltip>
                    <Button
                        className="rounded-full !px-6 "
                        variant="btn-primary"
                        onClick={(e: any) => handleToggleChange(tab)}>
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
                            Are you sure you want to sync {tab} ?
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


            {tab === "class" && <Class onDrawerOpen={isOpenDrawer} onDrawerClose={handleDrawerClose} />}
            {tab === "location" && <Location onDrawerOpen={isOpenDrawer} onDrawerClose={handleDrawerClose} />}
            {tab === "department" && <Department onDrawerOpen={isOpenDrawer} onDrawerClose={handleDrawerClose} />}
            {tab === "project" && <Project onDrawerOpen={isOpenDrawer} onDrawerClose={handleDrawerClose} />}
            <DrawerOverlay
                isOpen={isOpenDrawer}
                onClose={handleDrawerClose}
            />
        </div>
    )
}

export default Dimension