import {
    Button,
    Close,
    Text,
    Toast,
    Typography
} from "next-ts-lib";
import "next-ts-lib/dist/index.css";
import { useEffect, useState } from "react";
import axios from "axios";
import styles from "@/assets/scss/styles.module.scss";

interface DrawerProps {
    onOpen: boolean;
    onClose: () => void;
    EditId?: number;
}
const ClassContent: React.FC<DrawerProps> = ({ onOpen, onClose, EditId }) => {

    const [Id, setId] = useState<string>("");
    const [classId, setClassId] = useState<string>("");
    const [idHasError, setIdHasError] = useState<boolean>(false);

    const [idError, setIdError] = useState<boolean>(false);

    const [name, setName] = useState<string>("");
    const [nameError, setNameError] = useState<boolean>(false);
    const [nameHasError, setNameHasError] = useState<boolean>(false);

    const handleClose = () => {
        onClose();
    };

    //Class Data API
    const getClassById = async () => {
        try {
            const token = await localStorage.getItem("token");
            const params = {
                "CompanyId": 86,
                "Id": EditId
            }
            const config = {
                headers: {
                    Authorization: `bearer ${token}`,
                },
            };
            const response = await axios.post(
                `${process.env.base_url}/class/getbyid `,
                params,
                config
            );
            const { ResponseStatus, ResponseData, Message } = response.data;
            if (response.status === 200) {
                if (ResponseStatus === "Success") {
                    if (ResponseData !== null && typeof ResponseData === 'object') {
                        const { Id, ClassId, Name } = ResponseData;
                        setId(Id || "");
                        setClassId(ClassId || "");
                        setName(Name || "");
                        setIdHasError(true);
                        setNameHasError(true);
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
            console.log(error);
        }
    }

    const handleIdChange = (value: any) => {
        const pattern = /^[a-zA-Z0-9]+$/;
        if (pattern.test(value)) {
            setIdError(false);
            setClassId(value);
        }
    };

    const handleSubmit = async (e: any) => {
        e.preventDefault();
        classId.trim().length <= 0 && setIdError(true);
        name.trim().length <= 0 && setNameError(true);

        if (!(classId.length <= 0) && !(name.length <= 0)) {
            try {
                const token = await localStorage.getItem("token");
                const params = {
                    "Id": Id || 0,
                    "ClassId": classId,
                    "Description": name,
                    "RecordNo": "",
                    "CompanyId": 86,
                    "Name": name,
                    "ParentId": "",
                    "ParentName": "",
                    "Status": "active",
                    "FullyQualifiedName": ""
                }
                const config = {
                    headers: {
                        Authorization: `bearer ${token}`,
                    },
                };
                const response = await axios.post(
                    `${process.env.base_url}/class/save`, params,
                    config
                );

                const { ResponseStatus, ResponseData, Message } = response.data;
                if (response.status === 200) {
                    if (ResponseStatus === "Success") {
                        if (ResponseData.ResponseStatus === "Failure") {
                            Toast.error("Error", ResponseData.Message);
                        }
                        else {
                            Toast.success(`Class ${EditId ? "updated" : "added"} successfully.`);
                        }
                        onClose();
                    } else {
                        onClose();
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
                console.log(error);

            }
        }
        else {
            Toast.error("Error", "Please fill required field!");
        }
    };

    useEffect(() => {
        if (onOpen) {
            setId("");
            setClassId("");
            setIdError(false);
            setName("");
            setNameError(false);
        }
    }, [onOpen]);

    useEffect(() => {
        if (EditId) {
            getClassById();
        }
    }, [EditId]);

    return (
        <>
            {onOpen && (
                <div
                    className={`fixed top-0 bg-white  right-0 h-full xsm:!w-5/6 sm:!w-2/4 lg:!w-2/6 xl:!w-2/6 2xl:!w-2/6 z-30 shadow overflow-y-auto ${onOpen ? styles.slideInAnimation : styles.rightAnimation}`}
                >
                    <div className="p-4 flex justify-between items-center border-b border-lightSilver">
                        <Typography type="label" className="!font-bold !text-lg">{EditId ? "Edit" : "Add"} Class</Typography>
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
                                value={classId}
                                hasError={idError}
                                getValue={(value: any) => handleIdChange(value)}
                                getError={(e: any) => setIdHasError(e)}
                                onChange={(e: any) => {
                                    setIdError(true);
                                }}
                            >
                            </Text>
                        </div>
                        <div className="flex-1 mt-3">
                            <Text
                                label="Name"
                                id="name"
                                name="name"
                                placeholder="Please Enter Class Name"
                                validate
                                maxLength={100}
                                hasError={nameError}
                                value={name}
                                getValue={(value: any) => setName(value)}
                                getError={(e: any) => setNameHasError(e)}
                                onChange={(e: any) => {
                                    setNameError(true);
                                }}
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
                                <Typography type="h6" className="!font-bold"> CANCLE</Typography>
                            </Button>
                            <Button
                                type="submit"
                                onClick={handleSubmit}
                                className={`rounded-full font-medium w-28 xsm:!px-1`}
                                variant="btn-primary"
                            >
                                <Typography type="h6" className="!font-bold"> SAVE</Typography>
                            </Button>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}

export default ClassContent