import styles from "@/assets/scss/styles.module.scss";
import { useCompanyContext } from "@/context/companyContext";
import { callAPI } from '@/utils/API/callAPI';
import axios from "axios";
import {
    Button,
    Close,
    Text,
    Toast,
    Typography
} from "next-ts-lib";
import "next-ts-lib/dist/index.css";
import { useEffect, useState } from "react";

interface DrawerProps {
    onOpen: boolean;
    onClose: () => void;
    EditId?: number;
}
const AccountContent: React.FC<DrawerProps> = ({ onOpen, onClose, EditId }) => {
    const { CompanyId } = useCompanyContext();

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

    //Account Get Data API
    const getAccountById = async () => {
        const params = {
            CompanyId: CompanyId,
            Id: EditId
        }
        const url = `${process.env.base_url}/account/getdropdown`;
        const successCallback = (ResponseData: any) => {
            if (ResponseData !== null && typeof ResponseData === 'object') {
                const { GLAccountId, Name, AccountType } = ResponseData;
                setAccountId(GLAccountId);
                setName(Name);
                setType(AccountType)
            }
        };
        callAPI(url, params, successCallback);
    };
    useEffect(() => {
        if (onOpen && EditId) {
            getAccountById();
        }
    }, [EditId]);

    const handleSubmit = async (e: any) => {
        e.preventDefault();
        accountId.trim().length <= 0 && setIdError(true);
        name.trim().length <= 0 && setNameError(true);
        type.trim().length <= 0 && setTypeError(true);

        if (idHasError && nameHasError && typeHasError) {
            const params = {
                Id: 0,
                AccountId: accountId,
                Description: "f4g4",
                RecordNo: "",
                CompanyId: process.env.CompanyId,
                Name: name,
                ParentId: "",
                ParentName: "",
                Status: "active",
                FullyQualifiedName: ""
            }
            const url = `${process.env.base_url}/account/getdropdown`;
            const successCallback = (ResponseData: any) => {
                Toast.success(`Account ${EditId ? "updated" : "added"} successfully.`);
                onClose();
            };
            callAPI(url, params, successCallback);
        }
    };

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
            <div
                className={`fixed top-0 bg-white  right-0 h-full xsm:!w-5/6 sm:!w-2/4 lg:!w-2/6 xl:!w-2/6 2xl:!w-2/6 z-30 shadow overflow-y-auto ${onOpen ? "translate-x-0" : "translate-x-full"
                    } transition-transform duration-300 ease-in-out`}
            >
                        <div className="p-4 flex justify-between items-center border-b border-lightSilver">
                            <Typography type="label" className="!font-bold !text-lg"> Add Account</Typography>
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
                                ></Text>
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
                                ></Text>
                            </div>
                        </div>
                        <span className="flex absolute bottom-16 w-full right-0 border-t border-lightSilver"></span>
                        <div className={`flex fixed bg-white  bottom-0 right-0 justify-end items-center`}>
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
                                    className={`rounded-full font-medium w-28 xsm:!px-1`}
                                    variant="btn-primary"
                                >
                                    <Typography type="h6" className="!font-bold"> SAVE</Typography>
                                </Button>
                            </div>
                        </div>
            </div>
        </>
    );
}

export default AccountContent