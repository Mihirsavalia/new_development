import { DataTable, Switch } from 'next-ts-lib';
import React, { useEffect, useRef, useState } from 'react'
import MeatballsMenuIcon from "../../assets/icons/MeatballsMenu";

interface TableData {
  name: string;
  status: any;
  action: any;
}
const Project = ({ onOpen, onEdit }: any) => {
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
        className="w-8 h-8 cursor-pointer relative"
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
    },
  ]);

  return (
    <div>
      {tableData.length > 0 && (
        <DataTable
          columns={columns}
          data={tableData}
          headerInvisible={false}
          stickyHeader={true}
          hoverEffect={true}
        />
      )}
    </div>
  )
}

export default Project