"use client";

import "next-ts-lib/dist/index.css";

import { Button, CheckBox, Table } from "next-ts-lib";
import React from "react";
import ChevronLeftIcon from "../assets/icons/ChevronLeftIcon";

interface DrawerProps {
    onClose: () => void;
}

const RoleDrawer: React.FC<DrawerProps> = ({ onClose }) => {
    const headers = [
        {
            heading: "Module",
            field: "module",
            sort: false,
        },
        {
            heading: "View",
            field: "view",
            sort: false,
        },
        {
            heading: "Edit",
            field: "edit",
            sort: false,

        },
        {
            heading: "Create",
            field: "create",
            sort: false,

        },
        {
            heading: "Import",
            field: "import",
            sort: false,

        },
        {
            heading: "Sync",
            field: "Viggew",
            sort: false,
        },
    ];

    const data = [
        {
            id: 1,
            module: "Common", children: [{
                id: "Vendor",
                view: <CheckBox id={""} />,
                Edit: <CheckBox id={""} />,
                Create: <CheckBox id={""} />,
                import: <CheckBox id={""} />,
                Sync: <CheckBox id={""} />,
            },
            {
                id: "Dashboard",
                view: <CheckBox id={""} />,
                Edit: "",
                Create: "",
                import: "",
                Sync: "",
            },
            {
                id: "Documents (Inbox + File Upload)",
                view: <CheckBox id={""} />,
                Edit: "",
                Create: <CheckBox id={""} />,
                import: "",
                Sync: "",
            }
            ]
        },
        { module: "Purchase Order", view: <CheckBox id={"v1"} />, edit: <CheckBox id={"e1"} />, create: <CheckBox id={"c1"} /> },
        { module: "Bill Posting", view: <CheckBox id={"v2"} />, edit: <CheckBox id={"e2"} />, create: <CheckBox id={"c2"} />, import: <CheckBox id={"i1"} /> },
        {
            module: "Approval",
            children: [
                {
                    id: "Bill Approval",
                    view: <CheckBox id={""} />,
                    Edit: "",
                    Create: "",
                    import: "",
                    Sync: "",
                },
                {
                    id: "Payment Approval",
                    view: <CheckBox id={""} />,
                    Edit: "",
                    Create: "",
                    import: "",
                    Sync: "",
                },
                {
                    id: "Purchase Approval",
                    view: <CheckBox id={""} />,
                    Edit: "",
                    Create: "",
                    import: "",
                    Sync: "",
                }
            ]
        },
        { module: "Automation", view: <CheckBox id={"v3"} />, edit: <CheckBox id={"e3"} />, create: <CheckBox id={"c3"} /> },
        {
            module: "Master Configuration",
            children: [{
                id: "Location",
                view: <CheckBox id={""} />,
                Edit: <CheckBox id={""} />,
                Create: "",
                import: "",
                Sync: <CheckBox id={""} />,
            }, {
                id: "Project",
                view: <CheckBox id={""} />,
                Edit: <CheckBox id={""} />,
                Create: "",
                import: "",
                Sync: <CheckBox id={""} />,
            }, {
                id: "Class",
                view: <CheckBox id={""} />,
                Edit: <CheckBox id={""} />,
                Create: "",
                import: "",
                Sync: <CheckBox id={""} />,
            }, {
                id: "GL Account",
                view: <CheckBox id={""} />,
                Edit: <CheckBox id={""} />,
                Create: "",
                import: "",
                Sync: <CheckBox id={""} />,
            }, {
                id: "AP Term",
                view: <CheckBox id={""} />,
                Edit: <CheckBox id={""} />,
                Create: "",
                import: "",
                Sync: <CheckBox id={""} />,
            }, {
                id: "Product and Service",
                view: <CheckBox id={""} />,
                Edit: <CheckBox id={""} />,
                Create: "",
                import: "",
                Sync: <CheckBox id={""} />,
            }, {
                id: "Description",
                view: <CheckBox id={""} />,
                Edit: <CheckBox id={""} />,
                Create: "",
                import: "",
                Sync: <CheckBox id={""} />,
            }, {
                id: "Currency",
                view: <CheckBox id={""} />,
                Edit: <CheckBox id={""} />,
                Create: "",
                import: "",
                Sync: <CheckBox id={""} />,
            }, {
                id: "Tax Rate",
                view: <CheckBox id={""} />,
                Edit: <CheckBox id={""} />,
                Create: "",
                import: "",
                Sync: <CheckBox id={""} />,
            }, {
                id: "Payment Method",
                view: <CheckBox id={""} />,
                Edit: <CheckBox id={""} />,
                Create: "",
                import: "",
                Sync: <CheckBox id={""} />,
            }, {
                id: "Payment Setup",
                view: <CheckBox id={""} />,
                Edit: <CheckBox id={""} />,
                Create: "",
                import: "",
                Sync: <CheckBox id={""} />,
            }, {
                id: "AP Data Mapping",
                view: <CheckBox id={""} />,
                Edit: <CheckBox id={""} />,
                Create: "",
                import: "",
                Sync: <CheckBox id={""} />,
            }, {
                id: "AP Field Mapping",
                view: <CheckBox id={""} />,
                Edit: <CheckBox id={""} />,
                Create: "",
                import: "",
                Sync: <CheckBox id={""} />,
            },]
        },
        { module: "Notification", view: <CheckBox id={"v4"} />, edit: <CheckBox id={"e4"} /> },
        { module: "Cloud Configuration", view: <CheckBox id={"v5"} />, edit: <CheckBox id={"e5"} /> },
        {
            module: "Rights Management",
            children: [{
                id: "Role",
                view: "",
                Edit: <CheckBox id={""} />,
                Create: <CheckBox id={""} />,
                import: "",
                Sync: "",
            }, {
                id: "Company",
                view: "",
                Edit: <CheckBox id={""} />,
                Create: <CheckBox id={""} />,
                import: "",
                Sync: "",
            }, {
                id: "User",
                view: <CheckBox id={""} />,
                Edit: "",
                Create: <CheckBox id={""} />,
                import: "",
                Sync: "",
            }]
        },
        {
            module: "Payments",
            children: [{
                id: "Bill to Pay",
                view: <CheckBox id={""} />,
                Edit: <CheckBox id={""} />,
                Create: "",
                import: "",
                Sync: "",
            }, {
                id: "Check Cut",
                view: <CheckBox id={""} />,
                Edit: <CheckBox id={""} />,
                Create: "",
                import: "",
                Sync: "",
            }, {
                id: "Payment",
                view: <CheckBox id={""} />,
                Edit: <CheckBox id={""} />,
                Create: "",
                import: "",
                Sync: "",
            }]
        },
        {
            module: "Reports",
            children: [{
                id: "Bill Analysis",
                view: <CheckBox id={""} />,
                Edit: "",
                Create: "",
                import: "",
                Sync: "",
            }, {
                id: "Vendor Aging",
                view: <CheckBox id={""} />,
                Edit: "",
                Create: "",
                import: "",
                Sync: "",
            }]
        },
    ];
    // const checkbox =  {
    //   view: (item: any) =>  <CheckBox id={""} /> 
    // }

    return (
        <>
            <div className={`flex flex-col h-48`}>
                <div className="py-5 flex justify-between w-auto bg-whiteSmoke">
                    <div className="flex justify-star ml-3">
                        <label className="mx-2 cursor-pointer" onClick={onClose} >
                            <ChevronLeftIcon />
                        </label>
                        <label className="!font-bold text-base flex justify-center items-center text-center">
                            Admin Manage Rights
                        </label>
                    </div>
                </div>
                {/* Data Table */}
                <div>
                    <Table
                        data={data}
                        headers={headers}
                        getRowId={(data: any) => {
                            console.log(data);
                            data.id
                        }}
                        expandable
                        sortable
                        sticky
                        className={`!h-[431px]`}
                    />
                </div>
                {/* Footer*/}
                <div className="flex justify-end items-center border-t border-lightSilver">
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