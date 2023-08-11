import { useEffect, useState } from "react";
import axios from "axios";
import {
    Button,
    Close,
    Text,
    Toast,
    Typography
} from "next-ts-lib";
import "next-ts-lib/dist/index.css";
import styles from "@/app/assets/scss/styles.module.scss";

interface DrawerProps {
    onOpen: boolean;
    onClose: () => void;
    editId?: number;
}
const AccountContent: React.FC<DrawerProps> = ({ onOpen, onClose, editId }) => {

    const [accountId, setAccountId] = useState<string>("");
    const [idHasError, setIdHasError] = useState<boolean>(false);
    const [idError, setIdError] = useState<boolean>(false);

    const [name, setName] = useState<string>("");
    const [nameError, setNameError] = useState<boolean>(false);
    const [nameHasError, setNameHasError] = useState<boolean>(false);

    const [type, setType] = useState<string>("");
    const [typeError, setTypeError] = useState<boolean>(false);
    const [typeHasError, setTypeHasError] = useState<boolean>(false);



    const handleClose = () => {
        onClose();
    };

    //Account Data API
    const getAccountById = async () => {
        try {
            const token = await localStorage.getItem("token");
            const params = {
                "CompanyId":process.env.CompanyId,
                "Id": editId
            }
            const config = {
                headers: {
                    Authorization: `bearer ${token}`,
                },
            };
            const response = await axios.post(
                `${process.env.base_url}/account/getbyid `,
                params,
                config
            );
            const { ResponseStatus, ResponseData, Message } = response.data;
            if (response.status === 200) {
                if (ResponseStatus === "Success") {
                    if (ResponseData !== null && typeof ResponseData === 'object') {
                        const { id, name, type } = ResponseData;
                        setAccountId(id);
                        setName(name);
                        setType(type)
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
            console.log(error);
        }
    }

    const handleSubmit = async (e: any) => {
        e.preventDefault();
        accountId.trim().length <= 0 && setIdError(true);
        name.trim().length <= 0 && setNameError(true);
        type.trim().length <= 0 && setTypeError(true);

        if (idHasError && nameHasError && typeHasError) {
            try {
                const token = await localStorage.getItem("token");
                const params = {
                    "Id": 0,
                    "AccountId": accountId,
                    "Description": "f4g4",
                    "RecordNo": "",
                    "CompanyId":process.env.CompanyId,
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
                    `${process.env.base_url}/account/save`, params,
                    config
                );

                const { ResponseStatus, Message } = response.data;
                if (response.status === 200) {
                    if (ResponseStatus === "Success") {
                        Toast.success(`Account ${editId ? "updated" : "added"} successfully.`);
                        onClose();
                    } else {
                        onClose();
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
                console.log(error);
            }
        }
        else {
            Toast.error("Error", "Please fill required field!");
        }
    };

    useEffect(() => {
        if (onOpen && editId) {
            getAccountById();
        }
    }, [editId]);

    useEffect(() => {
        if (onOpen) {
            setAccountId("");
            setIdError(false);
            setIdHasError(false);
            setName("");
            setNameError(false);
            setNameHasError(false);
            setType("");
            setTypeError(false);
            setTypeHasError(false);
        }
    }, [onOpen]);

    return (
        <>
            {onOpen && (
                <div
                    className={`fixed top-0 bg-white  right-0 h-full xs:!w-5/6 sm:!w-2/4 lg:!w-2/6 xl:!w-2/6 2xl:!w-2/6 z-30 shadow overflow-y-auto ${onOpen ? styles.slideInAnimation : styles.rightAnimation}`}
                >
                    <div className="p-4 flex justify-between items-center border-b border-lightSilver">
                        <Typography type="label" className="!font-bold !text-lg"> ADD Account</Typography>
                        <div className="mx-2 cursor-pointer" onClick={handleClose}>
                            <Close variant="medium" />
                        </div>
                    </div>
                    <div className="flex-1 mx-5 mt-2 mb-12 ">
                        <div className="flex-1 mt-3">
                            <Text
                                label="Item ID"
                                id="id"
                                name="id"
                                placeholder="Please Enter Item ID"
                                validate
                                value={accountId}
                                hasError={idError}
                                getValue={(value: any) => setAccountId(value)}
                                getError={(e: any) => setIdHasError(e)}
                                onChange={(e: any) => {
                                    setIdError(true);
                                }}
                            >
                            </Text>
                        </div>
                        <div className="flex-1 mt-3">
                            <Text
                                label="Item Name"
                                id="name"
                                name="name"
                                placeholder="Please Enter Item Name"
                                validate
                                hasError={nameError}
                                value={name}
                                getValue={(value: any) => setName(value)}
                                getError={(e: any) => setNameHasError(e)}
                                onChange={(e: any) => {
                                    setNameError(true);
                                }}
                            ></Text>
                        </div>
                        <div className="flex-1 mt-3">
                            <Text
                                label="Item Type"
                                id="itemType"
                                name="itemType"
                                placeholder="Please Enter Item Type"
                                validate
                                hasError={typeError}
                                value={type}
                                getValue={(value: any) => setType(value)}
                                getError={(e: any) => setTypeHasError(e)}
                                onChange={(e: any) => {
                                    setTypeError(true);
                                }}
                            ></Text>
                        </div>
                    </div>
                    <span className="flex absolute bottom-16 w-full right-0 border-t border-lightSilver"></span>
                    <div className={`flex fixed  bottom-0 right-0 justify-end items-center`}>
                        <div className="py-3 px-5">
                            <Button
                                onClick={onClose}
                                className="rounded-full font-medium w-28 mx-3 xs:!px-1"
                                variant="btn-outline-primary"
                            >
                                <Typography type="h6" className="!font-bold"> CANCLE</Typography>
                            </Button>
                            <Button
                                type="submit"
                                onClick={handleSubmit}
                                className={`rounded-full font-medium w-28 xs:!px-1`}
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

export default AccountContent