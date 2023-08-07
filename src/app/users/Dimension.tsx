import { Button, Tooltip, Typography } from 'next-ts-lib';
import React, { useState } from 'react'
import SearchIcon from '../assets/icons/SearchIcon';
import SyncIcon from "../assets/icons/SyncIcon";
import Class from './tables/Class';
import Location from './tables/Location';
import Department from './tables/Department';
import Project from './tables/Project';
import PlusIcon from '../assets/icons/PlusIcon';
import Drawer from './Drawer';
import DrawerOverlay from './DrawerOverlay';

const tabs = [
    { id: "Class", label: "CLASS" },
    { id: "Location", label: "LOCATION" },
    { id: "Department", label: "DEPARTMENT" },
    { id: "Project", label: "PROJECT" },
];

const Dimension = () => {
    const [selectedTabIndex, setSelectedTabIndex] = useState<number>(0);
    const [tab, setTab] = useState<string>("Class");
    const [openDrawer, setOpenDrawer] = useState(false);
    const [hasEditId, setHasEditId] = useState("");
    const [isToggleOpen, setIsToggleOpen] = useState<boolean>(false);

    // To Toggle Drawer
    const handleDrawerOpen = () => {
        // setOpenDrawer(true);
    };

    const handleDrawerClose = () => {
        // setOpenDrawer(false);
        // setHasEditId("");
    }

    const handleToggleChange = () => {
        setIsToggleOpen(true);
    };

    const handleTabClick = (tabId: string, index: number) => {
        setTab(tabId);
        setSelectedTabIndex(index);
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
                    <Tooltip content={"Search"} position="bottom">
                        <SearchIcon />
                    </Tooltip>
                    <Tooltip content={`Sync ${tab}`} position="bottom">
                        <SyncIcon />
                    </Tooltip>
                    <Button
                        className="rounded-full !px-6 "
                        variant="btn-primary"
                        onClick={handleToggleChange}>
                        <Typography type="h6" className="!font-bold flex justify-center items-center text-center"><span className="mr-1"> <PlusIcon /></span> CREATE NEW</Typography>
                    </Button>
                </div>
            </div>
            {/*  Drawer */}
            <Drawer
                onOpen={openDrawer}
                tab={tab}
                onClose={handleDrawerClose}
            />

            {/* Drawer Overlay */}
            <DrawerOverlay
                isOpen={openDrawer}
                onClose={handleDrawerClose}
            />

            {tab === "Class" && <Class onOpen={handleDrawerOpen} />}
            {tab === "Location" && <Location onOpen={handleDrawerOpen} />}
            {tab === "Department" && <Department onOpen={handleDrawerOpen} />}
            {tab === "Project" && <Project onOpen={handleDrawerOpen} />}
        </div>
    )
}

export default Dimension