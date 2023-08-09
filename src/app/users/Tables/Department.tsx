import { Button, Close, DataTable, Modal, ModalAction, ModalContent, ModalTitle, Switch, Toast, Typography } from 'next-ts-lib';
import React, { useEffect, useRef, useState } from 'react';
import axios from "axios";
import MeatballsMenuIcon from "@/app/assets/icons/MeatballsMenu";
import DepartmentContent from './Drawer/DepartmentContent';

interface departmentList {
  name: string;
  status: any;
  action: any;
}

interface DepartmentProps {
  onDrawerOpen: boolean;
  onDrawerClose: () => void;
}

const Department : React.FC<DepartmentProps> = ({ onDrawerOpen, onDrawerClose }) => {
  const [isEditOpen, setIsEditOpen] = useState<boolean>(false);
  const [isRemoveOpen, setIsRemoveOpen] = useState<boolean>(false);
  const [departmentList, setDepartmentList] = useState<departmentList[]>([]);
  const [departmentEditId, setDepartmentEditId] = useState<number | null>();


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

  //Department List API
  const getDepartmentList = async () => {
    try {
      const params = {
        "FilterObj": {
          "Status": "active",
          "ClassId": "",
          "Name": ""
        },
        "CompanyId": 69,
        "Index": 1,
        "PageSize": 10
      }
      const token = await localStorage.getItem("token");
      const config = {
        headers: {
          Authorization: `bearer ${token}`,
        },
      };
      const response = await axios.post(
        `${process.env.base_url}/department/getlist`, params,
        config
      );
      const { ResponseStatus, ResponseData, Message } = response.data;
      if (response.status === 200) {
        if (ResponseStatus === "Success") {
          if (ResponseData !== null && typeof ResponseData === 'object') {
            setDepartmentList(ResponseData);
          }
        } else {
          if (Message === null) {
            Toast.error("Error", "Please try again later.");
          } else {
            Toast.error("Error", Message);
          }
        }
      }
      else {
        if (Message === null) {
          Toast.error("Error", "Please try again later.");
        } else {
          Toast.error("Error", Message);
        }
      }
    } catch (error) {
      console.error(error);
    }
  }
  useEffect(() => {
    getDepartmentList();
  }, []);

  const actionArray = ["Edit", "Remove"];
  const departmentListData = departmentList?.map((e: any) => new Object({
    name: e.first_name,
    status:
      <div>
        {e.is_Active ? <Switch checked={true} /> : <Switch checked={false} />}
      </div>,
    action: <Actions id={e.id} actions={actionArray} />
  }))

  const handleKebabChange = (actionName: string, id: number) => {
    setDepartmentEditId(id);
    if (actionName === "Edit") {
      setIsEditOpen(!isEditOpen)
    }
    if (actionName === "Remove") {
      setIsRemoveOpen(!isRemoveOpen)
    }
  };

  const modalClose = () => {
    setIsRemoveOpen(false);
  };

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
    return (
      <div
        ref={actionsRef}
        className="cursor-pointer flex justify-end"
        onClick={() => setOpen(!open)}>
        <MeatballsMenuIcon />
        {open && (
          <React.Fragment>
            <div className="relative z-10 flex justify-center items-center">
              <div className="absolute top-0 right-0 py-2 border border-lightSilver rounded-md bg-pureWhite shadow-lg ">
                <ul className="w-40">
                  {actions.map((action: any, index: any) => (
                    <li
                      key={index}
                      onClick={() => { handleKebabChange(action, id) }}
                      className="flex w-full h-9 px-3 hover:bg-lightGray !cursor-pointer">
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

  //Delete Department API 
  const handleDepartmentDelete = async () => {
    try {
      const token = await localStorage.getItem("token");
      const params = {
        "CompanyId": 65,
        "Id": 354,
        "RecordNo": "124"
      }
      const config = {
        headers: {
          Authorization: `bearer ${token}`,
        },
      };
      const response = await axios.post(
        `${process.env.base_url}/department/delete `,
        params,
        config
      );
      const { ResponseStatus, ResponseData, Message } = response.data;
      if (response.status === 200) {
        if (ResponseStatus === "Success") {
          if (ResponseData !== null && typeof ResponseData === 'object') {
            Toast.success("Error", "Department Remove successfully");
          }
        } else {
          if (Message != null) {
            Toast.error("Error", Message);
          }
        }
      }
      else {
        if (Message === null) {
          Toast.error("Error", "Please try again later.");
        } else {
          Toast.error("Error", Message);
        }
      }
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <div>
      {/* DataTable */}
      {departmentListData.length > 0 && (
        <DataTable
          columns={columns}
          data={departmentListData}
          headerInvisible={false}
          stickyHeader={true}
          hoverEffect={true}
        />
      )}

      {/* Modal */}
      <Modal
        isOpen={isRemoveOpen}
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
              Are you sure you want to remove the department ?
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
              variant="btn-error" onClick={handleDepartmentDelete} >
              YES
            </Button>
          </div>
        </ModalAction>
      </Modal>

      <DepartmentContent onOpen={onDrawerOpen} onClose={onDrawerClose} departmentEditId={typeof departmentEditId === 'number' ? departmentEditId : 0} />
    </div>
  )
}

export default Department