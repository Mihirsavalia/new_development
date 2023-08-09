import { Button, Close, DataTable, Modal, ModalAction, ModalContent, ModalTitle, Switch, Toast, Typography } from 'next-ts-lib';
import React, { useEffect, useRef, useState } from 'react';
import axios from "axios";
import MeatballsMenuIcon from "@/app/assets/icons/MeatballsMenu";
import ProjectContent from './Drawer/ProjectContent ';

interface projectList {
  name: string;
  status: any;
  action: any;
}

interface ProjectProps {
  onDrawerOpen: boolean;
  onDrawerClose: () => void;
}

const Project : React.FC<ProjectProps> = ({ onDrawerOpen, onDrawerClose }) => {
  const [isEditOpen, setIsEditOpen] = useState<boolean>(false);
  const [isRemoveOpen, setIsRemoveOpen] = useState<boolean>(false);
  const [projectList, setProjectList] = useState<projectList[]>([]);
  const [projectEditId, setProjectEditId] = useState<number | null>();


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

  //Project List API
  const getProjectList = async () => {
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
        `${process.env.base_url}/project/getlist`, params,
        config
      );
      const { ResponseStatus, ResponseData, Message } = response.data;
      if (response.status === 200) {
        if (ResponseStatus === "Success") {
          if (ResponseData !== null && typeof ResponseData === 'object') {
            setProjectList(ResponseData);
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
    getProjectList();
  }, []);

  const actionArray = ["Edit", "Remove"];
  const projectListData = projectList?.map((e: any) => new Object({
    name: e.first_name,
    status:
      <div>
        {e.is_Active ? <Switch checked={true} /> : <Switch checked={false} />}
      </div>,
    action: <Actions id={e.id} actions={actionArray} />
  }))

  const handleKebabChange = (actionName: string, id: number) => {
    setProjectEditId(id);
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

  //Delete Project API 
  const handleProjectDelete = async () => {
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
        `${process.env.base_url}/project/delete `,
        params,
        config
      );
      const { ResponseStatus, ResponseData, Message } = response.data;
      if (response.status === 200) {
        if (ResponseStatus === "Success") {
          if (ResponseData !== null && typeof ResponseData === 'object') {
            Toast.success("Error", "Project Remove successfully");
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
      {projectListData.length > 0 && (
        <DataTable
          columns={columns}
          data={projectListData}
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
              Are you sure you want to remove the project ?
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
              variant="btn-error" onClick={handleProjectDelete} >
              YES
            </Button>
          </div>
        </ModalAction>
      </Modal>

      <ProjectContent onOpen={onDrawerOpen} onClose={onDrawerClose} projectEditId={typeof projectEditId === 'number' ? projectEditId : 0} />
    </div>
  )
}

export default Project