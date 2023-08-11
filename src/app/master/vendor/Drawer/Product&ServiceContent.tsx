import {
    Button,
    Close,
    Select,
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
    ed?: number;
}
const ProductContent: React.FC<DrawerProps> = ({ onOpen, onClose, ed }) => {

    const [productId, setProductId] = useState<string>("");
    const [idHasError, setIdHasError] = useState<boolean>(false);
    const [idError, setIdError] = useState<boolean>(false);

    const [name, setName] = useState<string>("");
    const [nameError, setNameError] = useState<boolean>(false);
    const [nameHasError, setNameHasError] = useState<boolean>(false);

    const [type, setType] = useState<string>("");
    const [typeError, setTypeError] = useState<boolean>(false);
    const [typeHasError, setTypeHasError] = useState<boolean>(false);

    const [account, setAccount] = useState([]);
    const [accountId, setAccountId] = useState<number>();
    const [accountError, setAccountError] = useState<boolean>(false);
    const [accountHasError, setAccountHasError] = useState<boolean>(false);

    const handleClose = () => {
        onClose();
    };

    //Product Data API
    const getProductById = async () => {
        try {
            const token = await localStorage.getItem("token");
            const params = {
                "CompanyId":process.env.CompanyId,
                "Id": ed
            }
            const config = {
                headers: {
                    Authorization: `bearer ${token}`,
                },
            };
            const response = await axios.post(
                `${process.env.base_url}/product/getbyid `,
                params,
                config
            );
            const { ResponseStatus, ResponseData, Message } = response.data;
            if (response.status === 200) {
                if (ResponseStatus === "Success") {
                    if (ResponseData !== null && typeof ResponseData === 'object') {
                        const { id, name, type } = ResponseData;
                        setProductId(id);
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
        }
    }
    //GL Account List API
    const getAccountList = async () => {
        try {
            const token = await localStorage.getItem("token");
            const params = {
                "CompanyId":process.env.CompanyId,
            }
            const config = {
                headers: {
                    Authorization: `bearer ${token}`,
                },
            };
            const response = await axios.post(
                `${process.env.base_url}/account/getlist`,
                params,
                config
            );
            const { ResponseStatus, ResponseData, Message } = response.data;
            if (response.status === 200) {
                if (ResponseStatus === "Success") {
                    if (ResponseData !== null && typeof ResponseData === 'object') {
                        setAccount(ResponseData);
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
        }
    }
    useEffect(() => {
        getAccountList();
    }, []);

    const handleSubmit = async (e: any) => {
        e.preventDefault();
        productId.trim().length <= 0 && setIdError(true);
        name.trim().length <= 0 && setNameError(true);
        type.trim().length <= 0 && setTypeError(true);
        account.length <= 0 && setAccountError(true);

        if (idHasError && nameHasError && typeHasError && (account.length<=0)) {
            try {
                const token = await localStorage.getItem("token");
                const params = {
                    "Id": 0,
                    "ProductId": productId,
                    "Description": "f4g4",
                    "RecordNo": "",
                    "CompanyId":76,
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
                    `${process.env.base_url}/product/save`, params,
                    config
                );

                const { ResponseStatus, Message } = response.data;
                if (response.status === 200) {
                    if (ResponseStatus === "Success") {
                        Toast.success(`Product ${ed ? "updated" : "added"} successfully.`);
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
            }
        }
        else {
            Toast.error("Error", "Please fill required field!");
        }
    };

    useEffect(() => {
        if (onOpen && ed) {
            getProductById();
        }
    }, [ed]);

    useEffect(() => {
        if (onOpen) {
            setProductId("");
            setIdError(false);
            setIdHasError(false);
            setName("");
            setNameError(false);
            setNameHasError(false);
            setType("");
            setTypeError(false);
            setTypeHasError(false);
            setAccount([]);
            setAccountError(false);
            setAccountHasError(false);
        }
    }, [onOpen]);

    return (
        <>
            {onOpen && (
                <div
                    className={`fixed top-0 bg-white  right-0 h-full xsm:!w-5/6 sm:!w-2/4 lg:!w-2/6 xl:!w-2/6 2xl:!w-2/6 z-30 shadow overflow-y-auto ${onOpen ? styles.slideInAnimation : styles.rightAnimation}`}
                >
                    <div className="p-4 flex justify-between items-center border-b border-lightSilver">
                        <Typography type="label" className="!font-bold !text-lg"> ADD Item</Typography>
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
                                value={productId}
                                hasError={idError}
                                getValue={(value: any) => setProductId(value)}
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
                        <div className="flex-1 mt-3">
                            <Select
                                id="account"
                                label="GL Account"
                                options={account}
                                validate
                                defaultValue={accountId}
                                getValue={(value: any) => setAccountId(value)}
                                getError={(e: any) => { setAccountHasError(e) }}
                                hasError={accountError}
                            />
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
                </div >
            )}
        </>
    );
}

export default ProductContent