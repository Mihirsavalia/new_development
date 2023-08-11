"use client";

import React, { useEffect, useRef, useState } from "react";

// Library Components
import {
  Button,
  Tooltip,
  Modal,
  ModalTitle,
  ModalContent,
  ModalAction,
  Close,
  Toast,
  Avatar,
  DataTable,
  Select,
} from "next-ts-lib";

import axios from "axios";
import AddIcon from "@/assets/Icons/AddIcon";
import ActionIcon from "@/assets/Icons/ActionIcon";
import Drawer from "./Drawer";
import DrawerOverlay from "./DrawerOverlay";
import Wrapper from "@/components/common/Wrapper";
import "next-ts-lib/dist/index.css";
import CompaniesModal from "./CompaniesModal";
import FilterIcon from "@/assets/Icons/FilterIcons";
import { useRouter } from "next/navigation";

// Table Headers
const headers = [
  { header: "Id", accessor: "Id", sortable: true },
  { header: "Company", accessor: "Name", sortable: true },
  { header: "Connected with", accessor: "AccountingTool", sortable: true },
  { header: "Modified Date", accessor: "UpdatedOn", sortable: true },
  { header: "Assign user", accessor: "AssignUsers", sortable: true },
  { header: "", accessor: "action", sortable: false },
];

const options = [
  { label: "Option 1", value: 1 },
  { label: "Option 2", value: 2 },
  { label: "Option 3", value: 3 },
];

const ManageCompanies: React.FC = () => {
  const router = useRouter();
  const filterMenuRef = useRef<HTMLDivElement>(null);


  const [openFilterBox, setOpenFilterBox] = useState<boolean>(false);
  const [openActionBox, setOpenActionBox] = useState<boolean>(false);
  const [openDrawer, setOpenDrawer] = useState<boolean>(false);
  const [openDeactivateModal, setOpenDeactivateModal] =
    useState<boolean>(false);
  const [openActivateModal, setOpenActivateModal] = useState<boolean>(false);
  const [openDisconnectModal, setOpenDisconnectModal] =
    useState<boolean>(false);
  const [openRemoveModal, setOpenRemoveModal] = useState(false);
  const [openCompaniesModal, setOpenCompaniesModal] = useState<boolean>(false);
  const [selectedRowId, setSelectedRowId] = useState<number | null>(null);
  const [qboCompanyData, setQboCompanyData] = useState<any[]| null>(null);
  const [xeroCompanyData, setXeroCompanyData] = useState<any[]| null>(null);
  const [companyList, setCompanyList] = useState<any[]>([]);
  const [accountingTool, setAccountingTool] = useState<number | null>();

  useEffect(() => {
    getCompanyList();
    if (openFilterBox || openActionBox) {
      document.addEventListener("mousedown", handleOutsideClick);
    } else {
      document.removeEventListener("mousedown", handleOutsideClick);
    }
    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  }, [openFilterBox, openActionBox]);

  // Outside Click event handler
  const handleOutsideClick = (event: MouseEvent) => {
    if (
      filterMenuRef.current &&
      !filterMenuRef.current.contains(event.target as Node)
    ) {
      setOpenFilterBox(false);
    }
  };

  // Redirect Url to the QuickBooks page
  const handleConnectQb = async () => {
    try {
      const headers = {
        Authorization: localStorage.getItem("token"),
      };
      const responseConfig = await axios.get(
        `${process.env.base_url}/settings/getconfigbyid?configId=3`,
        {
          headers: headers,
        }
      );

      if (responseConfig.status === 200) {
        const clientId = responseConfig.data.ResponseData[0].Value;
        const redirectUri = responseConfig.data.ResponseData[4].Value;
        const responseType = "code";
        const scope = responseConfig.data.ResponseData[2].Value;
        const state = Math.random().toString(36).substring(7);

        const url = `https://appcenter.intuit.com/connect/oauth2?client_id=${clientId}&redirect_uri=${redirectUri}&response_type=${responseType}&scope=${scope}&state=${state}`;
        window.location.href = url;
      }
    } catch (error: any) {
      console.log(error);
    }
  };

  // Connect to the QuickBooks
  useEffect(() => {
    const qbConnect = async () => {
      try {
        const accessToken = localStorage.getItem("token");
        const headers = {
          Authorization: accessToken,
        };
        const body = {
          code: localStorage.getItem("qbcode"),
          realmId: localStorage.getItem("realmId"),
        };
        if (localStorage.getItem("qbcode") && localStorage.getItem("realmId")) {
          const response = await axios.post(
            `${process.env.base_url}/company/connectqbocompany`,
            body,
            { headers: headers }
          );

          if (response.status === 200) {
            const responseData = response.data.ResponseData;
            setQboCompanyData(responseData);
            setOpenDrawer(true);
            setAccountingTool(2);
          }
        }
      } catch (error) {
        console.log(error);
      }
    };

    qbConnect();
  }, []);

  // Redirect Url to the Xero page
  const handleConnectXero = async () => {
    try {
      const headers = {
        Authorization: localStorage.getItem("token"),
      };
      const responseConfig = await axios.get(
        `${process.env.base_url}/settings/getconfigbyid?configId=4`,
        {
          headers: headers,
        }
      );
      if (responseConfig.status === 200) {
        const client_id = responseConfig.data.ResponseData[0].Value;
        const scope = responseConfig.data.ResponseData[2].Value;
        const redirectUri = responseConfig.data.ResponseData[4].Value;
        const responseType = "code";
        const state = Math.random().toString(36).substring(7);

        const url = `https://login.xero.com/identity/connect/authorize?client_id=${client_id}&redirect_uri=${redirectUri}&response_type=${responseType}&scope=${scope}&&state=${state}`;

        window.location.href = url;
      }
    } catch (error: any) {
      console.log(error);
    }
  };

  // Connect to the Xero
  useEffect(() => {
    const handleXeroIntegration = async () => {
      try {
        const headers = {
          Authorization: localStorage.getItem("token"),
        };
        const body = { Code: localStorage.getItem("xerocode") };

        if (localStorage.getItem("xerocode")) {
          const response = await axios.post(
            `${process.env.base_url}/company/connectxerocompany`,
            body,
            { headers: headers }
          );

          if (response.status === 200) {
            const responseData = response.data.ResponseData;
            setXeroCompanyData(responseData);
            setOpenDrawer(true);
            setAccountingTool(3);
          }
        }
      } catch (error) {
        console.error("Error connecting to Xero:", error);
      }
    };
    handleXeroIntegration();
  }, []);

  // Get All CompanyList
  const getCompanyList = async () => {
    try {
      const accessToken = localStorage.getItem("token");
      const headers = {
        Authorization: accessToken,
      };
      const body = {
        Name: "",
        AccountingTool: 0,
        PageIndex: 1,
        PageSize: 10,
      };

      const response = await axios.post(
        `${process.env.base_url}/company/getlist`,
        body,
        { headers: headers }
      );

      if (response.status === 200) {
        const responseData = response.data.ResponseData.List;
        setCompanyList(responseData);
      }
    } catch (error: any) {
      if (error?.response.status === 401 || 404) {
        router.push("/signin");
      }
      console.log(error);
    }
  };

  // actions menu
  const Actions = ({ actions, id }: any) => {
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

    // Match a action and open a drawer
    const handleActions = (actionType: string, actionId: any) => {
      setSelectedRowId(actionId);
      if (actionType.toLowerCase() === "edit") {
        setOpenDrawer(true);
      }
      if (actionType.toLowerCase() === "deactivate") {
        setOpenDeactivateModal(true);
      }
      if (actionType.toLowerCase() === "activate") {
        setOpenActivateModal(true);
      }
      if (actionType.toLowerCase() === "disconnect") {
        setOpenDisconnectModal(true);
      }
      if (actionType.toLowerCase() === "remove") {
        setOpenRemoveModal(true);
      }
    };

    return (
      <div
        ref={actionsRef}
        className="w-5 h-5 cursor-pointer relative"
        onClick={() => setOpen(!open)}
      >
        <ActionIcon />
        {open && (
          <React.Fragment>
            <div className="relative z-10 flex justify-center items-center">
              <div className="absolute top-1 right-0 py-2 border border-lightSilver rounded-md bg-pureWhite shadow-lg ">
                <ul className="w-40">
                  {actions.map((action: any, index: any) => (
                    <li
                      key={index}
                      onClick={() => {
                        handleActions(action, id);
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

  // Show Table of Contents
  const compData = companyList.map(
    (list) =>
      new Object({
        Id: list.Id,
        Name: (
          <div className="flex items-center gap-1">
            <Avatar variant="small" name={list.Name} />
            {list.Name}
          </div>
        ),
        AccountingTool: (
          <div className="flex items-center gap-1">
            {list.IsConnected ? (
              list.AccountingTool === 1 ? (
                <>
                  <Avatar variant="small" name="Intact" />
                  {"Intact"}
                </>
              ) : list.AccountingTool === 2 ? (
                <>
                  <Avatar variant="small" name="QuickBook" />
                  {"QuickBook"}
                </>
              ) : (
                <>
                  <Avatar variant="small" name="Xero" />
                  {"Xero"}
                </>
              )
            ) : (
              <span className="text-red-500 text-center w-32">
                Disconnected
              </span>
            )}
          </div>
        ),
        UpdatedOn: (
          <div className="text-center w-24">
            {list.UpdatedOn && list.UpdatedOn.split("T")[0]}
          </div>
        ),

        action: (
          <Actions
            id={list.Id}
            actions={[
              "Edit",
              list.IsActive ? "Deactivate" : "Activate",
              "Disconnect",
              "Remove",
            ]}
          />
        ),
      })
  );

  // Perform the actions Deactivate, Activate, Remove and Disconnect
  const performCompanyAction = async (
    selectedRowId: number | null,
    action: number
  ) => {
    try {
      const accessToken = localStorage.getItem("token");
      const headers = {
        Authorization: accessToken,
      };
      const body = {
        CompanyId: selectedRowId,
        Action: action,
      };

      const response = await axios.post(
        `${process.env.base_url}/company/action`,
        body,
        { headers: headers }
      );

      if (response.status === 200) {
        getCompanyList();
        switch (action) {
          case 1:
            Toast.success("Company deactivated successfully");
            break;
          case 2:
            Toast.success("Company disconnected successfully");
            break;
          case 3:
            Toast.success("Company deleted successfully");
            break;
          case 4:
            Toast.success("Company activate successfully");
            break;
          default:
            break;
        }
      }
    } catch (error:any) {
      if (error?.response.status === 401 || 404) {
        router.push("/signin");
      }
      console.log(error);
    }
  };

  const handleFilterBox = () => {
    setOpenFilterBox(!openFilterBox);
  };

  const handleCompaniesModal = () => {
    setOpenCompaniesModal(!openCompaniesModal);
  };

  const handleDeactivateModal = () => {
    setOpenDeactivateModal(!openDeactivateModal);
  };

  const handlActivateModal = () => {
    setOpenActivateModal(!openActivateModal);
  };

  const handleDisconnectModal = () => {
    setOpenDisconnectModal(!openDisconnectModal);
  };

  const handleRemoveModal = () => {
    setOpenRemoveModal(!openRemoveModal);
  };
  
  return (
    <>
    <Wrapper masterSettings={false}>
      {/* Create companies section */}
      <div className="main flex items-center justify-between w-full px-5 py-[15px] bg-[#F6F6F6]">
        <div className="text-[#333] text-base  xs:text-[10px] font-bold">
          <span>Manage Companies</span>
        </div>
        <div className="flex items-center">
          <div className="cursor-pointer z-10" onClick={handleFilterBox}>
            <Tooltip position="bottom" content="Filter">
              <FilterIcon />
            </Tooltip>
          </div>
          <Button
            type="submit"
            variant="btn-primary"
            className="rounded-[300px]"
            onClick={handleCompaniesModal}
          >
            <span className="flex items-center justify-center xs:text-[8px] text-[14px]">
              <AddIcon />
              <span className="text-[14px] font-bold px-1">CREATE COMPANY</span>
            </span>
          </Button>
        </div>
      </div>

      {/*  Create Company Popup */}
      <CompaniesModal
        onOpen={openCompaniesModal}
        onClose={() => setOpenCompaniesModal(false)}
        onConnectQb={handleConnectQb}
        onConnectXero={handleConnectXero}
      />
      {/*  Drawer */}
      <Drawer
        onOpen={openDrawer}
        onClose={() => setOpenDrawer(false)}
        hasEditId={selectedRowId}
        CompanyData={qboCompanyData || xeroCompanyData}
        accountingTool={accountingTool}
      />
      

      {/* Drawer Overlay */}
      <DrawerOverlay isOpen={openDrawer} onClose={() => setOpenDrawer(false)} />

      {/* Deactivate Modal Popup */}
      {openDeactivateModal && (
        <div>
          <Modal
            isOpen={openDeactivateModal}
            onClose={handleDeactivateModal}
            size="md"
          >
            <ModalTitle>
              <div className="py-3 px-4 font-bold">Deactivate</div>
              <div className="" onClick={handleDeactivateModal}>
                <Close variant="medium" />
              </div>
            </ModalTitle>
            <ModalContent>
              <div className="p-2 mb-3">
                Are you sure you want to deactivate the company?
              </div>
            </ModalContent>
            <ModalAction>
              <div>
                <Button
                  className="rounded-full btn-sm font-semibold mx-2 my-3 !w-16 !h-[36px]"
                  variant="btn-outline-primary"
                  onClick={handleDeactivateModal}
                >
                  No
                </Button>
              </div>
              <div>
                <Button
                  className="rounded-full btn-sm font-semibold mx-2 my-3 !w-16 !h-[36px]"
                  variant="btn-primary"
                  onClick={() => performCompanyAction(selectedRowId, 1)}
                >
                  Yes
                </Button>
              </div>
            </ModalAction>
          </Modal>
        </div>
      )}

      {/* Activate Modal Popup */}
      {openActivateModal && (
        <div>
          <Modal
            isOpen={openActivateModal}
            onClose={handlActivateModal}
            size="md"
          >
            <ModalTitle>
              <div className="py-3 px-4 font-bold">Activate</div>
              <div className="" onClick={handlActivateModal}>
                <Close variant="medium" />
              </div>
            </ModalTitle>
            <ModalContent>
              <div className="p-2 mb-3">
                Are you sure you want to activate the company?
              </div>
            </ModalContent>
            <ModalAction>
              <div>
                <Button
                  className="rounded-full btn-sm font-semibold mx-2 my-3 !w-16 !h-[36px]"
                  variant="btn-outline-primary"
                  onClick={handlActivateModal}
                >
                  No
                </Button>
              </div>
              <div>
                <Button
                  className="rounded-full btn-sm font-semibold mx-2 my-3 !w-16 !h-[36px]"
                  variant="btn-primary"
                  onClick={() => performCompanyAction(selectedRowId, 4)}
                >
                  Yes
                </Button>
              </div>
            </ModalAction>
          </Modal>
        </div>
      )}

      {/* Disconnect Modal Popup */}
      {openDisconnectModal && (
        <Modal
          isOpen={openDisconnectModal}
          onClose={handleDisconnectModal}
          width="352px"
        >
          <ModalTitle>
            <div className="py-3 px-4 font-bold">Disconnect</div>
            <div className="" onClick={handleDisconnectModal}>
              <Close variant="medium" />
            </div>
          </ModalTitle>
          <ModalContent>
            <div className="p-2 mb-3">
              Are you sure you want to disconnect the company with accounting
              tool?
            </div>
          </ModalContent>
          <ModalAction>
            <div>
              <Button
                className="rounded-full btn-sm font-semibold mx-2 my-3 !w-16 !h-[36px]"
                variant="btn-outline-primary"
                onClick={handleDisconnectModal}
              >
                No
              </Button>
            </div>
            <div>
              <Button
                className="rounded-full btn-sm font-semibold mx-2 my-3 !w-16 !h-[36px]"
                variant="btn-primary"
                onClick={() => performCompanyAction(selectedRowId, 2)}
              >
                Yes
              </Button>
            </div>
          </ModalAction>
        </Modal>
      )}

      {/* Remove Modal Popup */}
      {openRemoveModal && (
        <Modal
          isOpen={openRemoveModal}
          onClose={handleRemoveModal}
          width="352px"
        >
          <ModalTitle>
            <div className="py-3 px-4 font-bold">Remove</div>
            <div className="" onClick={handleRemoveModal}>
              <Close variant="medium" />
            </div>
          </ModalTitle>
          <ModalContent>
            <div className="p-2 mb-3">
              Are you sure you want to remove the company?
            </div>
          </ModalContent>
          <ModalAction>
            <div>
              <Button
                className="rounded-full btn-sm font-semibold mx-2 my-3 !w-16 !h-[36px]"
                variant="btn-outline-error"
                onClick={handleRemoveModal}
              >
                No
              </Button>
            </div>
            <div>
              <Button
                className="rounded-full btn-sm font-semibold mx-2 my-3 !w-16 !h-[36px]"
                variant="btn-error"
                onClick={() => performCompanyAction(selectedRowId, 3)}
              >
                Yes
              </Button>
            </div>
          </ModalAction>
        </Modal>
      )}

      {/* For Filter menu */}
      <div ref={filterMenuRef}>
        <div className="flex absolute right-52 z-10 -mt-4">
          <div
            className={`${
              openFilterBox
                ? "visible flex justify-center items-center "
                : "hidden"
            } w-fit h-auto border border-lightSilver rounded-md bg-white shadow-md`}
          >
            <div className="w-[458px] h-auto">
              <ul>
                <li className="flex flex-row justify-between items-center px-4 py-3 border-b border-b-lightSilver">
                  <div className="text-black text-[20px] font-[500]">
                    Filter
                  </div>
                  <div onClick={handleFilterBox}>
                    <Close variant="medium" />
                  </div>
                </li>
                <li className="p-3">
                  <Select
                    id="1"
                    defaultValue="All"
                    label="Company"
                    options={options}
                    onSelect={() => {}}
                    type="checkbox"
                    getValue={() => {
                      console.log();
                    }}
                    getError={() => {
                      console.log();
                    }}
                    validate
                  />
                </li>
                <li className="p-3">
                  <Select
                    id="1"
                    defaultValue="All"
                    label="Company"
                    options={options}
                    onSelect={() => {}}
                    type="checkbox"
                    getValue={() => {
                      console.log();
                    }}
                    getError={() => {
                      console.log();
                    }}
                    validate
                  />
                </li>
                <li className="p-3">
                  <Select
                    id="1"
                    defaultValue="All"
                    label="Company"
                    options={options}
                    onSelect={() => {}}
                    type="checkbox"
                    getValue={() => {
                      console.log();
                    }}
                    getError={() => {
                      console.log();
                    }}
                    validate
                  />
                </li>
                <li className="flex flex-row justify-end items-center mt-10 px-4 py-3 border-t border-[#D8D8D8]">
                  <div>
                    <Button
                      onClick={handleFilterBox}
                      className="rounded-full btn-sm mx-2 font-bold"
                      variant="btn-outline-primary"
                    >
                      CANCEL
                    </Button>
                  </div>
                  <div>
                    <Button
                      className="rounded-full btn-sm mx-2 font-bold"
                      variant="btn-primary"
                      onClick={handleFilterBox}
                    >
                      APPLY
                    </Button>
                  </div>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      {/* Table Seaction */}
      {companyList.length > 0 && (
        <DataTable data={compData} columns={headers} stickyHeader={headers} />
      )}
      </Wrapper>
    </>
  );
};

export default ManageCompanies;
