import { Button, Close, DataTable, Modal, ModalAction, ModalContent, ModalTitle, Switch, Toast, Typography } from 'next-ts-lib';
import React, { useEffect, useRef, useState } from 'react';
import axios from "axios";
import MeatballsMenuIcon from "@/app/assets/icons/MeatballsMenu";
import LocationContent from '../Drawer/LocationContent';

interface locationList {
  locationId: number;
  name: string;
  status: any;
  action: any;
}

interface LocationProps {
  onDrawerOpen: boolean;
  onDrawerClose: () => void;
}

const Location: React.FC<LocationProps> = ({ onDrawerOpen, onDrawerClose }) => {
  const [isEditOpen, setIsEditOpen] = useState<boolean>(false);
  const [isRemoveOpen, setIsRemoveOpen] = useState<boolean>(false);
  const [locationList, setLocationList] = useState<locationList[]>([]);
  const [locationEditId, setLocationEditId] = useState<number | null>();


  const columns = [
    {
      header: "LOCATION ID",
      accessor: "locationId",
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

  //Location List API
  const getLocationList = async () => {
    try {
      const params = {
        "FilterObj": {
          "LocationId": "L1",
          "Name": "Loc1",
          "FullyQualifiedName": "AP Location",
          "Status": "active",
          "GlobalFilter": ""
        },
        "CompanyId":76,
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
        `${process.env.base_url}/location/getlist`, params,
        config
      );
      const { ResponseStatus, ResponseData, Message } = response.data;
      if (response.status === 200) {
        if (ResponseStatus === "Success") {
          if (ResponseData !== null && typeof ResponseData === 'object') {
            setLocationList(ResponseData.List);
            Toast.success("Success", "Location list fetched successfully!.");
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
    getLocationList();
  }, []);

  const actionArray = ["Edit", "Remove"];
  const locationListData = locationList?.map((e: any) => new Object({
    locationId: e.id,
    name: e.first_name,
    status:
      <div>
        {e.is_Active ? <Switch checked={true} /> : <Switch checked={false} />}
      </div>,
    action: <Actions id={e.id} actions={actionArray} />
  }))

  const handleKebabChange = (actionName: string, id: number) => {
    setLocationEditId(id);
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

  //Delete Location API 
  const handleLocationDelete = async () => {
    try {
      const token = await localStorage.getItem("token");
      const params = {
        "CompanyId":76,
        "Id": 354,
        "RecordNo": "124"
      }
      const config = {
        headers: {
          Authorization: `bearer ${token}`,
        },
      };
      const response = await axios.post(
        `${process.env.base_url}/location/delete `,
        params,
        config
      );
      const { ResponseStatus, ResponseData, Message } = response.data;
      if (response.status === 200) {
        if (ResponseStatus === "Success") {
          if (ResponseData !== null && typeof ResponseData === 'object') {
            Toast.success("Error", "Location Remove successfully");
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
      {locationListData.length > 0 && (
        <DataTable
          columns={columns}
          data={locationListData}
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
              Are you sure you want to remove the location ?
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
              variant="btn-error" onClick={handleLocationDelete} >
              YES
            </Button>
          </div>
        </ModalAction>
      </Modal>

      <LocationContent onOpen={onDrawerOpen} onClose={onDrawerClose} locationEditId={typeof locationEditId === 'number' ? locationEditId : 0} />
    </div>
  )
}

export default Location