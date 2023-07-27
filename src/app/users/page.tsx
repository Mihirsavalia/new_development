"use client";

import { Button, Table, Typography } from "next-ts-lib";
import "next-ts-lib/dist/index.css";
import React, { useState } from "react";
import KebabMenuIcon from ".././assets/icons/kebabIcon";
import styles from "../assets/scss/styles.module.scss";
import Sidebar from "../components/common/Sidebar";
import DrawerOverlay from "./DrawerOverlay";
import Drawer from "./Drawer";
import NavBar from "../layouts/NavBar";
interface FormData {
  id: number;
  name: string;
  email: string;
  phone: number | null;
  country: string;
  state: string;
  timezone: string;
  role: string;
  status: string;
  company: string[];
  // imageName: string;
}

const page: React.FC = () => {
  // Data

  const headers = [
    {
      heading: "#",
      field: "id",
      sort: true,
    },
    {
      heading: "Name",
      field: "name",
      sort: true,
    },
    {
      heading: "E-mail ID",
      field: "email",
      sort: false,
    },
    {
      heading: "Company",
      field: "company",
      sort: false,
    },
    {
      heading: "Roles",
      field: "role",
      sort: true,
    },
    {
      heading: "Status",
      field: "status",
      sort: true,
    },
  ];
  const [userData, setUserData] = useState<FormData[]>([
    {
      id: 1,
      name: "John Doe",
      email: "john.doe@example.com",
      phone: 1234567890,
      country: "United States",
      state: "California",
      timezone: "Pacific Time",
      role: "Admin",
      status: "Active",
      company: ["Acme Inc.", "Tech Corp."],
    },
    {
      id: 2,
      name: "Jane Smith",
      email: "jane.smith@example.com",
      phone: 1234561111,
      country: "Canada",
      state: "Ontario",
      timezone: "Eastern Time",
      role: "User",
      status: "Inactive",
      company: ["Acme Inc.", "Tech Corp."],
    },
    {
      id: 3,
      name: "Bob Johnson",
      email: "bob.johnson@example.com",
      phone: 9876543210,
      country: "United Kingdom",
      state: "England",
      timezone: "GMT",
      role: "Manager",
      status: "Active",
      company: ["Acme Inc.", "Tech Corp.", "DevCo."],
    },
  ]);

  const [kebabMenuOpen, setKebabMenuOpen] = useState<boolean>(false);
  const [selectedRowId, setSelectedRowId] = useState<number | null>(null);

  const handleRowClick = (id: number) => {
    setSelectedRowId(id);
    setKebabMenuOpen(!kebabMenuOpen);
  }

  const actionButtons = (
    <span className="flex items-center relative justify-evenly">
      <div onClick={(id: any) => handleRowClick(id)} className="cursor-pointer rounded-full">
        <KebabMenuIcon />
      </div>
    </span>
  );
  const actions = [actionButtons];

  // States
  const [isToggleOpen, setIsToggleOpen] = useState<boolean>(false);

  const handleToggleChange = () => {
    setIsToggleOpen(true);
  };

  const onDrawerData = (data: any) => {
    userData.push(data);
  };

  return (
    <>
      <NavBar>


        <div className={`flex flex-col w-full`}>
          {/* NavBar */}
          <div className="p-4 flex justify-between w-auto  bg-whiteSmoke">
            <div className="flex justify-star mx-3">
              <label className="!font-bold text-base flex justify-center items-center text-center">
                Manage Users
              </label>
            </div>
            <div className="flex justify-end mx-3">
              <Button
                className="rounded-full flex font-medium !px-7"
                variant="btn-primary"
                onClick={handleToggleChange}
              >
                <label className="text-xl">+</label> CREATE USER
              </Button>
            </div>
          </div>

          {/* Data Table */}
          <div>
            {userData.length > 0 && (
              <Table
                data={userData}
                headers={headers}
                actions={actions}
                getRowId={handleRowClick}
                sortable
                sticky
                action
                className={`!h-full`}
              />
            )}
          </div>
          <div className={`${kebabMenuOpen ? "visible absolute z-30 top-5 right-11" : "hidden"
            } w-fit h-auto py-2 border border-lightSilver rounded-md bg-white shadow-lg`}>
            <div className="w-40 h-auto">
              <ul className="w-40">
                <li className="flex w-full h-9 px-3 hover:bg-lightGray cursor-pointer">
                  <div className="flex justify-center items-center ml-2 cursor-pointer">
                    <Typography type="label" className="inline-block text-xs ">
                      Manage Rights{selectedRowId}
                    </Typography>
                  </div>
                </li>
              </ul>
            </div>
          </div>
          {/*  Drawer */}
          <Drawer
            onOpen={isToggleOpen}
            onClose={() => setIsToggleOpen(false)}
            onData={onDrawerData}
          />
          {/* Drawer Overlay */}
          <DrawerOverlay
            isOpen={isToggleOpen}
            onClose={() => setIsToggleOpen(false)}
          />
        </div>
      </NavBar>

    </>
  );
};

export default page;