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
const DepartmentContent: React.FC<DrawerProps> = ({ onOpen, onClose, EditId }) => {

    const { CompanyId } = useCompanyContext();

    const [departmentId, setDepartmentId] = useState<string>("");
    const [departmentCode, setDepartmentCode] = useState<string>("");
    const [idHasError, setIdHasError] = useState<boolean>(false);
    const [idError, setIdError] = useState<boolean>(false);

    const [title, setTitle] = useState<string>("");
    const [titleError, setTitleError] = useState<boolean>(false);
    const [titleHasError, setTitleHasError] = useState<boolean>(false);
    const [clicked, setClicked] = useState<boolean>(false);

    const handleClose = () => {
        onClose();
    };

    //Department Get Data API
    const getDepartmentById = async () => {
        const params = {
            CompanyId: CompanyId,
            Id: EditId
        }
        const url = `${process.env.base_url}/department/getbyid`;
        const successCallback = (ResponseData: any) => {
            if (ResponseData !== null && typeof ResponseData === 'object') {
                const { DepartmentId, DepartmentCode, Title } = ResponseData;
                setDepartmentId(DepartmentId || "");
                setDepartmentCode(DepartmentCode.toString() || "");
                setTitle(Title || "");
                setIdHasError(true);
                setTitleHasError(true);
            }
        };
        callAPI(url, params, successCallback);
    };

    const generatedId = () => {
        const minLength = 4;
        const maxLength = 8;
        const length = Math.floor(Math.random() * (maxLength - minLength + 1)) + minLength;
        const randomDigits = Array.from({ length }, () => Math.floor(Math.random() * 10));
        return randomDigits.join('');
    }

    const handleSubmit = async (e: any) => {
        e.preventDefault();
        departmentCode.trim().length <= 0 && setIdError(true);
        title.trim().length <= 0 && setTitleError(true);

        if (!(departmentCode.length <= 0) && !(title.length <= 0)) {
            setClicked(true);
            const params = {
                DepartmentId: departmentId || 0,
                CompanyId: CompanyId,
                DepartmentCode: departmentCode,
                RecordNo: "",
                Title: title,
                Status: "active"
            }
            const url = `${process.env.base_url}/department/save`;
            const successCallback = (ResponseData: any) => {
                if (ResponseData.ResponseStatus === "Failure") {
                    Toast.error("Error", ResponseData.ErrorData.Error);
                }
                else {
                    Toast.success(`Department ${EditId ? "updated" : "added"} successfully.`);
                }
                onClose();
            };
            callAPI(url, params, successCallback);
        }
    };

    useEffect(() => {
        if (onOpen) {
            setDepartmentId("");
            setIdError(false);
            setTitle("");
            setTitleError(false);
            setDepartmentCode("");
            setClicked(false);
        }
        setDepartmentCode('PQ-D' + generatedId())
    }, [onOpen]);

    useEffect(() => {
        if (EditId) {
            getDepartmentById();
        }
    }, [EditId]);

    return (
        <>
            {onOpen && (
                <div
                    className={`fixed top-0 bg-white  right-0 h-full xsm:!w-5/6 sm:!w-2/4 lg:!w-2/6 xl:!w-2/6 2xl:!w-2/6 z-30 shadow overflow-y-auto ${onOpen ? styles.slideInAnimation : styles.rightAnimation}`}
                >
                    <div className="p-4 flex justify-between items-center border-b border-lightSilver">
                        <Typography type="label" className="!font-bold !text-lg"> {EditId ? "Edit" : "Add"} Department</Typography>
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
                                value={departmentCode}
                                readOnly={true}
                                hasError={idError}
                                getValue={(value: any) => setDepartmentCode(value)}
                                getError={(e: any) => setIdHasError(e)}
                            >
                            </Text>
                        </div>
                        <div className="flex-1 mt-3">
                            <Text
                                label="Name"
                                id="name"
                                name="name"
                                placeholder="Please Enter Department Name"
                                validate
                                maxLength={100}
                                hasError={titleError}
                                value={title}
                                getValue={(value: any) => setTitle(value)}
                                getError={(e: any) => setTitleHasError(e)}
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

export default DepartmentContent