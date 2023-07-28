"use client";

import "next-ts-lib/dist/index.css";

import React from "react";
import Navbar from "../layouts/Navbar";
import { Table, CheckBox, Button } from "next-ts-lib";
import ChevronLeftIcon from "../assets/icons/ChevronLeftIcon";

const RoleDrawer: React.FC = () => {
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
        { module: "Common" },
        { module: "Purchase Order", view: <CheckBox id={"v1"} />, edit: <CheckBox id={"e1"} />, create: <CheckBox id={"c1"} /> },
        { module: "Bill Posting", view: <CheckBox id={"v2"} />, edit: <CheckBox id={"e2"} />, create: <CheckBox id={"c2"} />, import: <CheckBox id={"i1"} /> },
        { module: "Approval" },
        { module: "Automation", view: <CheckBox id={"v3"} />, edit: <CheckBox id={"e3"} />, create: <CheckBox id={"c3"} /> },
        { module: "Master Configuration" },
        { module: "Notification", view: <CheckBox id={"v4"} />, edit: <CheckBox id={"e4"} /> },
        { module: "Cloud Configuration", view: <CheckBox id={"v5"} />, edit: <CheckBox id={"e5"} /> },
        { module: "Rights Management" },
        { module: "Payments" },
        { module: "Reports" },
    ]
    // const checkbox =  {
    //   view: (item: any) =>  <CheckBox id={""} /> 
    // }

    return (
        <>
            <Navbar>
                <div className={`flex flex-col h-48`}>
                    <div className="py-5 flex justify-between w-auto bg-whiteSmoke">
                        <div className="flex justify-star ml-3">
                            <label className="mx-2 cursor-pointer" >
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
                            className={`!h-[439px] !z-0`}
                            sticky
                        // JsxComponents={checkbox}
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
            </Navbar>
        </>
    );
};
export default RoleDrawer;