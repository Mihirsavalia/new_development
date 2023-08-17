"use client";

import "next-ts-lib/dist/index.css";

import { Button, CheckBox, DataTable, Typography } from "next-ts-lib";
import React from "react";
import ChevronLeftIcon from "@/assets/Icons/ChevronLeftIcon";

interface DrawerProps {
    onClose: () => void;
}

const RoleDrawer: React.FC<DrawerProps> = ({ onClose }) => {

    const columns = [
        {
            header: "Module",
            accessor: "Module",
            sortable: false,
        },
        {
            header: "View",
            accessor: "View",
            sortable: false,
        },
        {
            header: "Edit",
            accessor: "Edit",
            sortable: false,

        },
        {
            header: "Create",
            accessor: "Create",
            sortable: false,

        },
        {
            header: "Import",
            accessor: "Import",
            sortable: false,

        },
        {
            header: "Sync",
            accessor: "Sync",
            sortable: false,
        },
    ];

    const data = [
        {
            id: 1,
            Module: "Common",
            details: <DataTable columns={columns} data={[{
                Module: "Vendor",
                View: <CheckBox id={""} />,
                Edit: <CheckBox id={""} />,
                Create: <CheckBox id={""} />,
                Import: <CheckBox id={""} />,
                Sync: <CheckBox id={""} />,
            },
            {
                Module: "Dashboard",
                View: <CheckBox id={""} />,
                Edit: "",
                Create: "",
                Import: "",
                Sync: "",
            },
            {
                Module: "Documents (Inbox + File Upload)",
                View: <CheckBox id={""} />,
                Edit: "",
                Create: <CheckBox id={""} />,
                Import: "",
                Sync: "",
            }
            ]} />
        },
        { Module: "Purchase Order", View: <CheckBox id={"v1"} />, Edit: <CheckBox id={"e1"} />, Create: <CheckBox id={"c1"} /> },
        { Module: "Bill Posting", View: <CheckBox id={"v2"} />, Edit: <CheckBox id={"e2"} />, Create: <CheckBox id={"c2"} />, Import: <CheckBox id={"i1"} /> },
        {
            Module: "Approval",
            details:
                <DataTable columns={columns} data={
                    [
                        {
                            Module: "Bill Approval",
                            View: <CheckBox id={""} />,
                            Edit: "",
                            Create: "",
                            Import: "",
                            Sync: "",
                        },
                        {
                            Module: "Payment Approval",
                            View: <CheckBox id={""} />,
                            Edit: "",
                            Create: "",
                            Import: "",
                            Sync: "",
                        },
                        {
                            Module: "Purchase Approval",
                            View: <CheckBox id={""} />,
                            Edit: "",
                            Create: "",
                            Import: "",
                            Sync: "",
                        }
                    ]} />
        },
        { Module: "Automation", View: <CheckBox id={"v3"} />, Edit: <CheckBox id={"e3"} />, Create: <CheckBox id={"c3"} /> },
        {
            Module: "Master Configuration",
            details:
                <DataTable columns={columns} data={[{
                    Module: "Location",
                    View: <CheckBox id={""} />,
                    Edit: <CheckBox id={""} />,
                    Create: "",
                    Import: "",
                    Sync: <CheckBox id={""} />,
                }, {
                    Module: "Project",
                    View: <CheckBox id={""} />,
                    Edit: <CheckBox id={""} />,
                    Create: "",
                    Import: "",
                    Sync: <CheckBox id={""} />,
                }, {
                    Module: "Class",
                    View: <CheckBox id={""} />,
                    Edit: <CheckBox id={""} />,
                    Create: "",
                    Import: "",
                    Sync: <CheckBox id={""} />,
                }, {
                    Module: "GL Account",
                    View: <CheckBox id={""} />,
                    Edit: <CheckBox id={""} />,
                    Create: "",
                    Import: "",
                    Sync: <CheckBox id={""} />,
                }, {
                    Module: "AP Term",
                    View: <CheckBox id={""} />,
                    Edit: <CheckBox id={""} />,
                    Create: "",
                    Import: "",
                    Sync: <CheckBox id={""} />,
                }, {
                    Module: "Product and Service",
                    View: <CheckBox id={""} />,
                    Edit: <CheckBox id={""} />,
                    Create: "",
                    Import: "",
                    Sync: <CheckBox id={""} />,
                }, {
                    Module: "Description",
                    View: <CheckBox id={""} />,
                    Edit: <CheckBox id={""} />,
                    Create: "",
                    Import: "",
                    Sync: <CheckBox id={""} />,
                }, {
                    Module: "Currency",
                    View: <CheckBox id={""} />,
                    Edit: <CheckBox id={""} />,
                    Create: "",
                    Import: "",
                    Sync: <CheckBox id={""} />,
                }, {
                    Module: "Tax Rate",
                    View: <CheckBox id={""} />,
                    Edit: <CheckBox id={""} />,
                    Create: "",
                    Import: "",
                    Sync: <CheckBox id={""} />,
                }, {
                    Module: "Payment Method",
                    View: <CheckBox id={""} />,
                    Edit: <CheckBox id={""} />,
                    Create: "",
                    Import: "",
                    Sync: <CheckBox id={""} />,
                }, {
                    Module: "Payment Setup",
                    View: <CheckBox id={""} />,
                    Edit: <CheckBox id={""} />,
                    Create: "",
                    Import: "",
                    Sync: <CheckBox id={""} />,
                }, {
                    Module: "AP Data Mapping",
                    View: <CheckBox id={""} />,
                    Edit: <CheckBox id={""} />,
                    Create: "",
                    Import: "",
                    Sync: <CheckBox id={""} />,
                }, {
                    Module: "AP accessor Mapping",
                    View: <CheckBox id={""} />,
                    Edit: <CheckBox id={""} />,
                    Create: "",
                    Import: "",
                    Sync: <CheckBox id={""} />,
                }
                ]} />
        },
        { Module: "Notification", View: <CheckBox id={"v4"} />, Edit: <CheckBox id={"e4"} /> },
        { Module: "Cloud Configuration", View: <CheckBox id={"v5"} />, Edit: <CheckBox id={"e5"} /> },
        {
            Module: "Rights Management",
            details:  <DataTable columns={columns} data={[{
                Module: "Role",
                View: "",
                Edit: <CheckBox id={""} />,
                Create: <CheckBox id={""} />,
                Import: "",
                Sync: "",
            }, {
                Module: "Company",
                View: "",
                Edit: <CheckBox id={""} />,
                Create: <CheckBox id={""} />,
                Import: "",
                Sync: "",
            }, {
                Module: "User",
                View: <CheckBox id={""} />,
                Edit: "",
                Create: <CheckBox id={""} />,
                Import: "",
                Sync: "",
            }]}/>
        },
        {
            Module: "Payments",
            details: 
            <DataTable columns={columns} data={[{
                Module: "Bill to Pay",
                View: <CheckBox id={""} />,
                Edit: <CheckBox id={""} />,
                Create: "",
                Import: "",
                Sync: "",
            }, {
                Module: "Check Cut",
                View: <CheckBox id={""} />,
                Edit: <CheckBox id={""} />,
                Create: "",
                Import: "",
                Sync: "",
            }, {
                Module: "Payment",
                View: <CheckBox id={""} />,
                Edit: <CheckBox id={""} />,
                Create: "",
                Import: "",
                Sync: "",
            }]}/>
        },
        {
            Module: "Reports",
            details: <DataTable columns={columns} data={ [{
                Module: "Bill Analysis",
                View: <CheckBox id={""} />,
                Edit: "",
                Create: "",
                Import: "",
                Sync: "",
            }, {
                Module: "Vendor Aging",
                View: <CheckBox id={""} />,
                Edit: "",
                Create: "",
                Import: "",
                Sync: "",
            }]}/>
        },
    ];

    return (
        <>
            <div className={`flex flex-col h-48`}>
                <div className="py-5 flex justify-between w-auto bg-whiteSmoke">
                    <div className="flex justify-star ml-3">
                        <span className="mx-2 cursor-pointer" onClick={onClose} >
                            <ChevronLeftIcon bgColor="white" />
                        </span>
                        <Typography type="h5" className="!font-bold flex justify-center items-center text-center">Admin Manage Rights</Typography>

                    </div>
                </div>
                {/* Data Table */}
                <div>
                    <DataTable
                        columns={columns}
                        data={data}
                     
                        sticky
                        hoverEffect={true}
                    />
                </div>
                {/* Footer*/}
                <div className="flex sticky bottom-0 bg-white justify-end items-center border-t border-lightSilver">
                    <div className="my-3 mx-5">
                        <Button
                            className="rounded-full font-medium !w-28 mx-3"
                            variant="btn-outline-primary"
                        >
                            CANCLE
                        </Button>
                        <Button
                            type="submit"
                            className={`rounded-full font-medium !w-28`}
                            variant="btn-primary"
                        >
                            SAVE
                        </Button>
                    </div>
                </div>
            </div>
        </>
    );
};
export default RoleDrawer;