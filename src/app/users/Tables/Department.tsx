import { Button, Close, DataTable, Modal, ModalAction, ModalContent, ModalTitle, Switch, Typography } from 'next-ts-lib';
import React, { useEffect, useRef, useState } from 'react';
import MeatballsMenuIcon from "@/app/assets/icons/MeatballsMenu";
import DepartmentContent from './Drawer/DepartmentContent';

interface TableData {
  name: string;
  status: any;
  action: any;
}

interface ClassProps {
  onDrawerOpen: boolean;
  onDrawerClose: () => void;
}
const Department: React.FC<ClassProps> = ({ onDrawerOpen, onDrawerClose }) => {
  const [isEditOpen, setIsEditOpen] = useState<boolean>(false);
  const [isRemoveOpen, setIsRemoveOpen] = useState<boolean>(false);

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
  const actionArray = ["Edit", "Remove"];

  const handleKebabChange = (actionName: string, id: number) => {
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

  const [tableData, setTableData] = useState<TableData[]>([
    {
      name: "John Doe",
      status: <Switch checked={true} />,
      action: <Actions actions={actionArray} />
    },
    {
      name: "Jane Smith",
      status: <Switch checked={false} />,
      action: <Actions actions={actionArray} />
    },
    {
      name: "Bob Johnson",
      status: <Switch checked={true} />,
      action: <Actions actions={actionArray} />
    }
  ]);

  return (
    <div>
      {/* DataTable */}
      {tableData.length > 0 && (
        <DataTable
          columns={columns}
          data={tableData}
          headerInvisible={false}
          stickyHeader={true}
          hoverEffect={true}
        />
      )}

      {/* Modal */}
      {isRemoveOpen && (
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
                Are you sure you want to remove the Location ?
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
                variant="btn-error">
                YES
              </Button>
            </div>
          </ModalAction>
        </Modal>
      )}

      <DepartmentContent onOpen={onDrawerOpen} onClose={onDrawerClose} onEdit={tableData} />
    </div>
  )
}

export default Department