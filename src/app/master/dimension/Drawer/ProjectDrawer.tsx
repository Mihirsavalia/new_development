import styles from "@/assets/scss/styles.module.scss";
import { useCompanyContext } from "@/context/companyContext";
import { callAPI } from "@/utils/API/callAPI";
import { Button, Close, Text, Toast, Typography } from "next-ts-lib";
import "next-ts-lib/dist/index.css";
import { useEffect, useState } from "react";

interface DrawerProps {
    onOpen: boolean;
    onClose: () => void;
    EditId?: number;
}
const ProjectContent: React.FC<DrawerProps> = ({ onOpen, onClose, EditId }) => {
    const { CompanyId, AccountingTools } = useCompanyContext();
    
    const AccountingTool = AccountingTools;
    const [Id, setId] = useState<string>("");
    const [projectId, setProjectId] = useState<string>("");
    const [idHasError, setIdHasError] = useState<boolean>(false);
    const [idError, setIdError] = useState<boolean>(false);

    const [name, setName] = useState<string>("");
    const [nameError, setNameError] = useState<boolean>(false);
    const [nameHasError, setNameHasError] = useState<boolean>(false);
    const [clicked, setClicked] = useState<boolean>(false);

    const handleClose = () => {
        onClose();
    };

    //Project Get Data API
    const getProjectById = async () => {
        const params = {
            CompanyId: CompanyId,
            Id: EditId
        }
        const url = `${process.env.base_url}/project/getbyid`;
        const successCallback = (ResponseData: any) => {
            if (ResponseData !== null && typeof ResponseData === 'object') {
                const { Id, ProjectId, Name } = ResponseData;
                setId(Id || "");
                setProjectId(ProjectId || "");
                setName(Name || "");
                setIdHasError(true);
                setNameHasError(true);
            }
        };
        callAPI(url, params, successCallback);
    };

    const handleIdChange = (value: any) => {
        const pattern = /^[a-zA-Z0-9]*$/;
        if (pattern.test(value)) {
            setIdError(false);
            setProjectId(value);
        }
    };

    const generatedId = () => {
        const result =Math.floor((Math.random() * 10000) + 1)
        return result;
    }


    const handleSubmit = async (e: any) => {
        e.preventDefault();
        projectId.trim().length <= 0 && setIdError(true);
        name.trim().length <= 0 && setNameError(true);

        if (!(projectId.length <= 0) && !(name.length <= 0)) {
            setClicked(true);
            const params = {
                Id: Id || 0,
                ProjectId: projectId,
                RecordNo: "",
                CompanyId: CompanyId,
                Name: name,
                Description: "f4g4",
                Category: "Capitalized",
                Status: "active"
            }
            const url = `${process.env.base_url}/project/save`;
            const successCallback = (ResponseData: any) => {
                if (ResponseData.ResponseStatus === "Failure") {
                    Toast.error("Error", ResponseData.Message);
                }
                else {
                    Toast.success(`Project ${EditId ? "updated" : "added"} successfully.`);
                }
                onClose();
            };
            callAPI(url, params, successCallback);
        }
    };

    useEffect(() => {
        if (EditId) {
            getProjectById();
        }
    }, [EditId]);

    useEffect(() => {
        if (onOpen) {
            setProjectId("");
            setIdError(false);
            setName("");
            setNameError(false);
            setClicked(false);
        }
        if (AccountingTool != 1) {
            setProjectId('PQ-P' +generatedId())
        }
    }, [onOpen]);

    return (
        <>
            {onOpen && (
                <div
                    className={`fixed top-0 bg-white  right-0 h-full xsm:!w-5/6 sm:!w-2/4 lg:!w-2/6 xl:!w-2/6 2xl:!w-2/6 z-30 shadow overflow-y-auto ${onOpen ? styles.slideInAnimation : styles.rightAnimation}`}
                >
                    <div className="p-4 flex justify-between items-center border-b border-lightSilver">
                        <Typography type="label" className="!font-bold !text-lg"> {EditId ? "Edit" : "Add"} Project</Typography>
                        <div className="mx-2 cursor-pointer" onClick={handleClose}>
                            <Close variant="medium" />
                        </div>
                    </div>
                    <div className="flex-1 mx-5 mt-2 mb-12 ">
                        <div className="flex-1 mt-3">
                            <Text
                                label="ID"
                                id="id"
                                name="id"
                                placeholder="Please Enter ID Name"
                                validate
                                readOnly={EditId ? false : true}
                                value={projectId}
                                hasError={idError}
                                getValue={(value: any) => handleIdChange(value)}
                                getError={(e: any) => setIdHasError(e)}
                            >
                            </Text>
                        </div>
                        <div className="flex-1 mt-3">
                            <Text
                                label="Name"
                                id="name"
                                name="name"
                                placeholder="Please Enter Project Name"
                                validate
                                maxLength={100}
                                hasError={nameError}
                                value={name}
                                getValue={(value: any) => setName(value)}
                                getError={(e: any) => setNameHasError(e)}
                            ></Text>
                        </div>
                    </div>
                    <span className="flex absolute bottom-16 w-full right-0 border-t border-lightSilver"></span>
                    <div className={`flex fixed  bottom-0 right-0 justify-end items-center`}>
                        <div className="py-3 px-5">
                            <Button
                                onClick={onClose}
                                className="rounded-full font-medium w-28 mx-3 xsm:!px-1"
                                variant="btn-outline-primary"
                            >
                                <Typography type="h6" className="!font-bold"> CANCEL</Typography>
                            </Button>
                            <Button
                                type="submit"
                                onClick={handleSubmit}
                                className={`rounded-full font-medium w-28 xsm:!px-1  ${clicked && "opacity-50 pointer-events-none"}`}
                                variant="btn-primary"
                            >
                                <Typography type="h6" className="!font-bold"> SAVE</Typography>
                            </Button>
                        </div>
                    </div>
                </div >
            )}
        </>
    );
}

export default ProjectContent