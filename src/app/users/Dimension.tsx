import { Button, Close, Modal, ModalAction, ModalContent, ModalTitle, Tooltip, Typography } from 'next-ts-lib';
import React, { useState } from 'react';
import PlusIcon from '@/app/assets/icons/PlusIcon';
import SearchIcon from '@/app/assets/icons/SearchIcon';
import SyncIcon from "@/app/assets/icons/SyncIcon";
import Class from './Tables/Class';
import Department from './Tables/Department';
import Location from './Tables/Location';
import Project from './Tables/Project';
import DrawerOverlay from './DrawerOverlay';

const tabs = [
    { id: "Class", label: "CLASS" },
    { id: "Location", label: "LOCATION" },
    { id: "Department", label: "DEPARTMENT" },
    { id: "Project", label: "PROJECT" },
];

const Dimension: React.FC = () => {
    const [selectedTabIndex, setSelectedTabIndex] = useState<number>(0);
    const [tab, setTab] = useState<string>("Class");
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

            {/* Modal */}
            <Modal
                isOpen={isSyncModalOpen}
                onClose={modalClose}
                width="363px">
                <ModalTitle>
                    <div className="py-3 px-4 font-bold">Remove</div>
                    <div className="" >
                        <Close variant="medium" />
                    </div>
                </ModalTitle>
                <ModalContent>
                    <div className="p-2 my-5">
                        <Typography type='h5' className='!font-normal'>
                            Are you sure you want to sync class ?
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
                            variant="btn-primary">
                            YES
                        </Button>
                    </div>
                </ModalAction>
            </Modal>


            {tab === "Class" && <Class onDrawerOpen={isOpenDrawer} onDrawerClose={handleDrawerClose} />}
            {tab === "Location" && <Location onDrawerOpen={isOpenDrawer} onDrawerClose={handleDrawerClose} />}
            {tab === "Department" && <Department onDrawerOpen={isOpenDrawer} onDrawerClose={handleDrawerClose} />}
            {tab === "Project" && <Project onDrawerOpen={isOpenDrawer} onDrawerClose={handleDrawerClose} />}
            <DrawerOverlay
                isOpen={isOpenDrawer}
                onClose={handleDrawerClose}
            />
        </div>
    )
}

export default Dimension