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
import styles from "@/app/assets/scss/styles.module.scss";

interface DrawerProps {
    onOpen: boolean;
    onClose: () => void;
    editId?: number;
}
const APTermContent: React.FC<DrawerProps> = ({ onOpen, onClose, editId }) => {

    const [name, setName] = useState<string>("");
    const [nameError, setNameError] = useState<boolean>(false);
    const [nameHasError, setNameHasError] = useState<boolean>(false);

    const [description, setDescription] = useState<string>("");
    const [descriptionError, setDescriptionError] = useState<boolean>(false);
    const [descriptionHasError, setDescriptionHasError] = useState<boolean>(false);

    const [dueDay, setDueDay] = useState<string>("");
    const [dueDayError, setDueDayError] = useState<boolean>(false);
    const [dueDayHasError, setDueDayHasError] = useState<boolean>(false);

    const [dueForm, setDueForm] = useState([]);
    const [dueFormId, setDueFormId] = useState<number>();
    const [dueFormError, setDueFormError] = useState<boolean>(false);
    const [dueFormHasError, setDueFormHasError] = useState<boolean>(false);

    const [discount, setDiscount] = useState<string>("");
    const [discountError, setDiscountError] = useState<boolean>(false);
    const [discountHasError, setDiscountHasError] = useState<boolean>(false);

    const [account, setAccount] = useState([]);
    const [accountId, setAccountId] = useState<number>();
    const [accountError, setAccountError] = useState<boolean>(false);
    const [accountHasError, setAccountHasError] = useState<boolean>(false);

    const handleClose = () => {
        onClose();
    };

    //APTerm Data API
    const getAPTermById = async () => {
        try {
            const token = await localStorage.getItem("token");
            const params = {
                "CompanyId": process.env.CompanyId,
                "Id": editId
            }
            const config = {
                headers: {
                    Authorization: `bearer ${token}`,
                },
            };
            const response = await axios.post(
                `${process.env.base_url}/apTerm/getbyid `,
                params,
                config
            );
            const { ResponseStatus, ResponseData, Message } = response.data;
            if (response.status === 200) {
                if (ResponseStatus === "Success") {
                    if (ResponseData !== null && typeof ResponseData === 'object') {
                        const { name, description, due_day } = ResponseData;
                        setDescription(description);
                        setName(name);
                        setDueDay(due_day)
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
    //GL DueForm List API
    const getDueFormList = async () => {
        try {
            const token = await localStorage.getItem("token");
            const params = {
                "CompanyId": process.env.CompanyId,
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
                        setDueForm(ResponseData);
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
    useEffect(() => {
        getDueFormList();
    }, []);

    //Default Account List API
    const getAccountList = async () => {
        try {
            const token = await localStorage.getItem("token");
            const params = {
                "CompanyId": 81,
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
            console.log(error);
        }
    }

    const handleSubmit = async (e: any) => {
        e.preventDefault();
        description.trim().length <= 0 && setDescriptionError(true);
        name.trim().length <= 0 && setNameError(true);
        dueDay.trim().length <= 0 && setDueDayError(true);
        dueForm.length <= 0 && setDueFormError(true);
        discount.trim().length <= 0 && setDiscountError(true);
        account.length <= 0 && setAccountError(true);

        if (nameHasError && descriptionHasError && dueDayHasError && dueFormHasError && discountHasError && accountHasError) {
            try {
                const token = await localStorage.getItem("token");
                const params = {
                    "Id": 0,
                    "APTermId": editId,
                    "Description": "f4g4",
                    "RecordNo": "",
                    "CompanyId": 80,
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
                    `${process.env.base_url}/apTerm/save`, params,
                    config
                );

                const { ResponseStatus, Message } = response.data;
                if (response.status === 200) {
                    if (ResponseStatus === "Success") {
                        Toast.success(`APTerm ${editId ? "updated" : "added"} successfully.`);
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
            getAPTermById();
        }
    }, [editId]);

    useEffect(() => {
        if (onOpen) {
            setName("");
            setNameError(false);
            setNameHasError(false);

            setDescription("");
            setDescriptionError(false);
            setDescriptionHasError(false);

            setDueDay("");
            setDueDayError(false);
            setDueDayHasError(false);

            setDueForm([]);
            setDueFormError(false);
            setDueFormHasError(false);

            setDiscount("");
            setDiscountError(false);
            setDiscountHasError(false);

            setAccount([]);
            setAccountError(false);
            setAccountHasError(false);
        }
    }, [onOpen]);

    return (
        <>
            {onOpen && (
                <div
                    className={`fixed top-0 bg-white  right-0 h-full xs:!w-5/6 sm:!w-2/4 lg:!w-2/6 xl:!w-2/6 2xl:!w-2/6 z-30 shadow overflow-y-auto ${onOpen ? styles.slideInAnimation : styles.rightAnimation}`}
                >
                    <div className="p-4 flex justify-between items-center border-b border-lightSilver">
                        <Typography type="label" className="!font-bold !text-lg"> ADD Item</Typography>
                        <div className="mx-2 cursor-pointer" onClick={handleClose}>
                            <Close variant="medium" />
                        </div>
                    </div>
                    <div className="flex-1 mx-5 mt-2 mb-12 ">

                        <div className="flex-1 mt-4">
                            <Text
                                label="Name"
                                id="name"
                                name="name"
                                placeholder="Please Enter Name"
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
                        <div className="flex-1 mt-4">
                            <Text
                                label="Description"
                                id="description"
                                name="description"
                                placeholder="Please Enter Description"
                                validate
                                value={description}
                                hasError={descriptionError}
                                getValue={(value: any) => setDescription(value)}
                                getError={(e: any) => setDescriptionHasError(e)}
                                onChange={(e: any) => {
                                    setDescriptionError(true);
                                }}
                            >
                            </Text>
                        </div>
                        <div className="flex-1 mt-4">
                            <Text
                                label="Due Day"
                                id="dueDay"
                                name="dueDay"
                                placeholder="Please Enter Due Day"
                                validate
                                hasError={dueDayError}
                                value={dueDay}
                                getValue={(value: any) => setDueDay(value)}
                                getError={(e: any) => setDueDayHasError(e)}
                                onChange={(e: any) => {
                                    setDueDayError(true);
                                }}
                            ></Text>
                        </div>
                        <div className="flex-1 mt-4">
                            <Select
                                id="dueForm"
                                label="Due Form"
                                options={dueForm}
                                validate
                                defaultValue={dueFormId}
                                getValue={(value: any) => setDueForm(value)}
                                getError={(e: any) => { setDueFormHasError(e) }}
                                hasError={dueFormError}
                            />
                        </div>
                        <div className="flex-1 mt-4">
                            <Text
                                label="Discount"
                                id="discount"
                                name="discount"
                                placeholder="Please Enter Discount"
                                validate
                                hasError={discountError}
                                value={discount}
                                getValue={(value: any) => setDiscount(value)}
                                getError={(e: any) => setDiscountHasError(e)}
                                onChange={(e: any) => {
                                    setDiscountError(true);
                                }}
                            ></Text>
                        </div>
                        <div className="flex-1 mt-4">
                            <Select
                                id="account"
                                label="Default Account"
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

export default APTermContent