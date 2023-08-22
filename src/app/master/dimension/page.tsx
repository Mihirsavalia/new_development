"use client"
import PlusIcon from '@/assets/Icons/PlusIcon';
import SearchIcon from '@/assets/Icons/SearchIcon';
import SyncIcon from "@/assets/Icons/SyncIcon";
import Wrapper from '@/components/common/Wrapper';
import { callAPI } from '@/utils/API/callAPI';
import { hasNoToken } from "@/utils/commonFunction";
import { Button, Close, Modal, ModalAction, ModalContent, ModalTitle, Text, Toast, Tooltip, Typography } from 'next-ts-lib';
import "next-ts-lib/dist/index.css";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from 'react';
import Class from './Content/ClassContent';
import Department from './Content/DepartmentContent';
import Location from './Content/LocationContent';
import Project from './Content/ProjectContent';
import { useCompanyContext } from '@/context/companyContext';

const tabs = [
    { id: "class", label: "CLASS" },
    { id: "location", label: "LOCATION" },
    { id: "department", label: "DEPARTMENT" },
    { id: "project", label: "PROJECT" },
];

const Dimension: React.FC = () => {
    const router = useRouter();

    useEffect(() => {
        hasNoToken(router);
    }, [router]);
    const { CompanyId } = useCompanyContext();
    const [selectedTabIndex, setSelectedTabIndex] = useState<number>(0);
    const [tab, setTab] = useState<string>("class");
    const [isOpenDrawer, setIsOpenDrawer] = useState<boolean>(false);
    const [isSyncModalOpen, setIsSyncModalOpen] = useState<boolean>(false);

    const [isSearch, setIsSearch] = useState<boolean>(false);
    const [searchValue, setSearchValue] = useState<string>("");
    const [searchHasError, setSearchHasError] = useState<boolean>(false);

    //Sync API
    const handleSync = async () => {
        modalClose();
        const params = {
            CompanyId: CompanyId
        }
        const url = `${process.env.base_url}/${tab}/sync`;
        const successCallback = () => {
            Toast.success(`${tab} sync successfully`);
        };
        callAPI(url, params, successCallback);
    };

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
            <div className="bg-whiteSmoke h-[66px] flex justify-between items-center">
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

                    <Tooltip content={`Sync ${tab}`} position="bottom" className='!z-[2] !p-0 !m-0'>
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
                            Are you sure you want to sync {tab} ?
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


            {tab === "class" && <Class onDrawerOpen={isOpenDrawer} onDrawerClose={handleDrawerClose} />}
            {tab === "location" && <Location onDrawerOpen={isOpenDrawer} onDrawerClose={handleDrawerClose} />}
            {tab === "department" && <Department onDrawerOpen={isOpenDrawer} onDrawerClose={handleDrawerClose} />}
            {tab === "project" && <Project onDrawerOpen={isOpenDrawer} onDrawerClose={handleDrawerClose} />}
        </Wrapper>
    )
}

export default Dimension