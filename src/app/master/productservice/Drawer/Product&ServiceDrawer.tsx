import styles from "@/assets/scss/styles.module.scss";
import { useCompanyContext } from "@/context/companyContext";
import { callAPI } from '@/utils/API/callAPI';
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

interface DrawerProps {
    onOpen: boolean;
    onClose: () => void;
    EditId?: number;
}
const ProductContent: React.FC<DrawerProps> = ({ onOpen, onClose, EditId }) => {
    const { CompanyId } = useCompanyContext();

    const [productId, setProductId] = useState<string>("");
    const [idHasError, setIdHasError] = useState<boolean>(false);
    const [idError, setIdError] = useState<boolean>(false);

    const [name, setName] = useState<string>("");
    const [nameError, setNameError] = useState<boolean>(false);
    const [nameHasError, setNameHasError] = useState<boolean>(false);

    const [type, setType] = useState<string>("");
    const [typeError, setTypeError] = useState<boolean>(false);
    const [typeHasError, setTypeHasError] = useState<boolean>(false);

    const [account, setAccount] = useState<any[]>([]);
    const [accountId, setAccountId] = useState<number>(0);
    const [accountError, setAccountError] = useState<boolean>(false);
    const [accountHasError, setAccountHasError] = useState<boolean>(false);

    const handleClose = () => {
        onClose();
    };

    //GET GLAccount API
    const getGLAccount = async () => {
        const params = {
            CompanyId: CompanyId,
        }
        const url = `${process.env.base_url}/account/getdropdown`;
        const successCallback = (ResponseData: any) => {
            if (ResponseData !== null && typeof ResponseData === 'object') {
                setAccount(ResponseData);
            }
        };
        callAPI(url, params, successCallback);
    };

    //Product Data API
    const getProductById = async () => {
        const params = {
            CompanyId: CompanyId,
            Id: EditId
        }
        const url = `${process.env.base_url}/product/getbyid`;
        const successCallback = (ResponseData: any) => {
            if (ResponseData !== null && typeof ResponseData === 'object') {
                const { id, name, type } = ResponseData;
                setProductId(id);
                setName(name);
                setType(type)
            }
        };
        callAPI(url, params, successCallback);
    };

    //Save API
    const handleSubmit = async (e: any) => {
        e.preventDefault();
        productId.trim().length <= 0 && setIdError(true);
        name.trim().length <= 0 && setNameError(true);
        type.trim().length <= 0 && setTypeError(true);
        account.length >= 0 && setAccountError(true);

        if (!(productId.trim().length <= 0) && !(name.trim().length <= 0) && !(type.trim().length <= 0) && !(account.length <= 0)) {
            const params = {
                ItemId: productId || 0,
                RecordNo: "",
                CompanyId: CompanyId,
                Name: name,
                IntacctItemId: "testpo1",
                ItemType: type,
                SKU: null,
                Description: null,
                InventoryAccount: null,
                IntacctVendorID: null,
                SalePrice: null,
                CostPrice: null,
                AsOfDate: null,
                CreatedBy: null,
                CreatedOn: null,
                UpdatedBy: null,
                UpdatedOn: null
            }
            const url = `${process.env.base_url}/product/save`;
            const successCallback = () => {
                Toast.success(`Product ${EditId ? "updated" : "added"} successfully.`);
                onClose();
            };
            callAPI(url, params, successCallback);
        }
    };


    useEffect(() => {
        if (onOpen && EditId) {
            getProductById();
        }
    }, [EditId]);

    useEffect(() => {
        if (onOpen) {
            getGLAccount();
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
                        <Typography type="label" className="!font-bold !text-lg"> {EditId ? "Edit" : "Add"} Item</Typography>
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
                                maxLength={50}
                                value={productId}
                                hasError={idError}
                                getValue={(value: any) => setProductId(value)}
                                getError={(e: any) => setIdHasError(e)}
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
                                maxLength={100}
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
                </div >
            )}
        </>
    );
}

export default ProductContent