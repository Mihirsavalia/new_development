import DrawerOverlay from "@/app/manage/users/DrawerOverlay";
import MeatballsMenuIcon from "@/assets/Icons/MeatballsMenu";
import { callAPI } from "@/utils/API/callAPI";
import { Button, Close, DataTable, Loader, Modal, ModalAction, ModalContent, ModalTitle, Switch, Toast, Typography } from 'next-ts-lib';
import React, { useEffect, useRef, useState } from "react";
import ProjectContent from "../Drawer/ProjectDrawer";
import { useCompanyContext } from "@/context/companyContext";

interface projectList {
    name: string;
    status: any;
    action: any;
}

interface ProjectProps {
    onDrawerOpen: boolean;
    onDrawerClose: () => void;
}

const Project: React.FC<ProjectProps> = ({ onDrawerOpen, onDrawerClose }) => {
    const { CompanyId } = useCompanyContext();
    const [isOpenDrawer, setIsOpenDrawer] = useState<boolean>(false);
    const [isRemoveOpen, setIsRemoveOpen] = useState<boolean>(false);
    const [projectList, setProjectList] = useState<projectList[]>([]);
    const [Id, setId] = useState<string>();
    const [RecordNo, setRecordNo] = useState<number | null>();
    const [refreshTable, setRefreshTable] = useState<boolean>(false);

    const columns = [
        {
            header: "PROJECT ID",
            accessor: "id",
            sortable: true,
        },
        {
            header: "NAME",
            accessor: "name",
            sortable: true,
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

    //Project List API
    const getProjectList = async () => {
        const params = {
            FilterObj: {
                ProjectId: "",
                Name: "",
                Category: "",
                Status: "active",
                GlobalFilter: "",
            },
            CompanyId: CompanyId,
            Index: 1,
            PageSize: 1000,
        };
        const url = `${process.env.base_url}/project/getlist`;
        const successCallback = (ResponseData: any) => {
            if (ResponseData !== null && typeof ResponseData === "object") {
                setProjectList(ResponseData.List);
            }
        };
        callAPI(url, params, successCallback);
    };
    useEffect(() => {
        getProjectList();
    }, [refreshTable]);


    //Delete Project API
    const handleProjectDelete = async () => {
        modalClose();
        const params = {
            CompanyId: CompanyId,
            Id: Id,
            RecordNo: RecordNo,
        };
        const url = `${process.env.base_url}/project/delete`;
        const successCallback = () => {
            Toast.success("Success", "Project Remove successfully");
            getProjectList();
        };
        callAPI(url, params, successCallback);
    };

    const actionArray = ["Edit", "Remove"];

    // Action
    const Actions = ({ actions, id, recNo }: any) => {
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
                                                    handleKebabChange(action, id, recNo);
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
    const projectListData = projectList?.map(
        (e: any) =>
            new Object({
                id: e.ProjectId,
                name: e.Name,
                status: (
                    <div>
                        {e.Status == "active" ? (
                            <Switch checked={true} />
                        ) : (
                            <Switch checked={false} />
                        )}
                    </div>
                ),
                action: <Actions id={e.Id} recNo={e.RecordNo} actions={actionArray} />,
            })
    );

    const handleKebabChange = (
        actionName: string,
        id: string,
        RecordNo: number
    ) => {
        setId(id);
        if (actionName === "Edit") {
            setIsOpenDrawer(true);
        }
        if (actionName === "Remove") {
            setRecordNo(RecordNo);
            setIsRemoveOpen(!isRemoveOpen);
        }
    };

    const handleDrawerClose = () => {
        setIsOpenDrawer(false);
        setId("");
        setRefreshTable(prevValue => !prevValue);
        onDrawerClose();
    };

    useEffect(() => {
        setIsOpenDrawer(onDrawerOpen);
    }, [onDrawerOpen]);

    useEffect(() => {
        if (isOpenDrawer) {
            handleDrawerClose();
        }
    }, [onDrawerClose]);

    const modalClose = () => {
        setIsRemoveOpen(false);
    };

    return (
        <>
            {/* DataTable */}
            {projectList.length <= 0 ? <div className="h-[445px] w-full flex items-center justify-center"><Loader size="md" helperText /></div> :
                <div className="h-[445px]">
                    {projectListData.length > 0 ? (
                        <DataTable
                            columns={columns}
                            data={projectListData}
                            sticky
                            hoverEffect={true}
                        />
                    ) : <span className="flex justify-center">There is no data available at the moment.</span>}
                </div>
            }
            {/* Remove Modal */}
            <Modal isOpen={isRemoveOpen} onClose={modalClose} width="376px">
                <ModalTitle>
                    <div className="py-3 px-4 font-bold">Remove</div>
                    <div onClick={modalClose}>
                        <Close variant="medium" />
                    </div>
                </ModalTitle>
                <ModalContent>
                    <div className="px-4 my-5">
                        <Typography type="h5" className="!font-normal">
                            Are you sure you want to remove the project ?
                        </Typography>
                    </div>
                </ModalContent>
                <ModalAction>
                    <div>
                        <Button
                            className="rounded-full btn-sm font-semibold mx-2 my-3 !w-16 !h-[36px]"
                            variant="btn-outline"
                            onClick={modalClose}
                        >
                            NO
                        </Button>
                    </div>
                    <div>
                        <Button
                            className="rounded-full btn-sm font-semibold mx-2 my-3 !w-16 !h-[36px]"
                            variant="btn-error"
                            onClick={handleProjectDelete}
                        >
                            YES
                        </Button>
                    </div>
                </ModalAction>
            </Modal>

            <ProjectContent onOpen={isOpenDrawer} onClose={handleDrawerClose} EditId={typeof Id === "number" ? Id : 0} />
            <DrawerOverlay isOpen={isOpenDrawer} onClose={handleDrawerClose} />

        </>);
};

export default Project;
