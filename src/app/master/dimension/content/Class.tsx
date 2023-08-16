import {
    Button,
    Close,
    DataTable,
    Modal,
    ModalAction,
    ModalContent,
    ModalTitle,
    Switch,
    Toast,
    Typography,
} from "next-ts-lib";
import React, { useEffect, useRef, useState } from "react";
import axios from "axios";
import MeatballsMenuIcon from "@/assets/Icons/MeatballsMenu";
import ClassContent from "../Drawer/ClassContent";
import DrawerOverlay from "@/app/manage/users/DrawerOverlay";

interface classList {
    name: string;
    status: any;
    action: any;
}

interface ClassProps {
    onDrawerOpen: boolean;
    onDrawerClose: () => void;
}

const Class: React.FC<ClassProps> = ({ onDrawerOpen, onDrawerClose }) => {
    const [isOpenDrawer, setIsOpenDrawer] = useState<boolean>(false);
    const [isRemoveOpen, setIsRemoveOpen] = useState<boolean>(false);
    const [classList, setClassList] = useState<classList[]>([]);
    const [Id, setId] = useState<number | null>();
    const [RecordNo, setRecordNo] = useState<number | null>();
    const [refreshTable, setRefreshTable] = useState<boolean>(false);

    const columns = [
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

    //Class List API
    const getClassList = async () => {
        try {
            const params = {
                FilterObj: {
                    ClassId: "",
                    Name: "",
                    FullyQualifiedName: "",
                    Status: "",
                    GlobalFilter: "",
                },
                CompanyId: 86,
                Index: 1,
                PageSize: 100,
            };

            const token = await localStorage.getItem("token");
            const config = {
                headers: {
                    Authorization: `bearer ${token}`,
                },
            };
            const response = await axios.post(
                `${process.env.base_url}/class/getlist`,
                params,
                config
            );
            const { ResponseStatus, ResponseData, Message } = response.data;
            if (response.status === 200) {
                if (ResponseStatus === "Success") {
                    if (ResponseData !== null && typeof ResponseData === "object") {
                        setClassList(ResponseData.List);
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
    useEffect(() => {
        getClassList();
    }, [refreshTable]);

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
            <div
                ref={actionsRef}
                className="cursor-pointer flex justify-end"
                onClick={() => setOpen(!open)}
            >
                <MeatballsMenuIcon />
                {open && (
                    <React.Fragment>
                        <div className="relative z-10 flex justify-center items-center">
                            <div className="absolute top-7 right-1 py-2 border border-lightSilver rounded-md bg-pureWhite shadow-lg ">
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
        );
    };

    //DataTable Data
    const classListData = classList?.map(
        (e: any) =>
            new Object({
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
        id: number,
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
        setId(null);
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

    //Delete Class API
    const handleClassDelete = async () => {
        try {
            const token = await localStorage.getItem("token");
            const params = {
                CompanyId: 86,
                Id: Id,
                RecordNo: RecordNo,
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
                        Toast.success("Success", "Class Remove successfully");
                        getClassList();
                    }
                } else {
                    if (Message != null) {
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
        <div>
            {/* DataTable */}
            <div className="h-[445px]">
                {classListData.length > 0 && (
                    <DataTable
                        columns={columns}
                        data={classListData}
                        headerInvisible={false}
                        stickyHeader={true}
                        hoverEffect={true}
                    />
                )}
            </div>

            {/* Remove Modal */}
            <Modal isOpen={isRemoveOpen} onClose={modalClose} width="363px">
                <ModalTitle>
                    <div className="py-3 px-4 font-bold">Remove</div>
                    <div className="">
                        <Close variant="medium" />
                    </div>
                </ModalTitle>
                <ModalContent>
                    <div className="p-2 my-5">
                        <Typography type="h5" className="!font-normal">
                            Are you sure you want to remove the class ?
                        </Typography>
                    </div>
                </ModalContent>
                <ModalAction>
                    <div>
                        <Button
                            className="rounded-full btn-sm font-semibold mx-2 my-3 !w-16 !h-[36px]"
                            variant="btn-outline"
                        >
                            NO
                        </Button>
                    </div>
                    <div>
                        <Button
                            className="rounded-full btn-sm font-semibold mx-2 my-3 !w-16 !h-[36px]"
                            variant="btn-error"
                            onClick={handleClassDelete}
                        >
                            YES
                        </Button>
                    </div>
                </ModalAction>
            </Modal>

            <ClassContent onOpen={isOpenDrawer} onClose={handleDrawerClose} EditId={typeof Id === "number" ? Id : 0} />
            <DrawerOverlay isOpen={isOpenDrawer} onClose={handleDrawerClose} />
        </div>
    );
};

export default Class;
