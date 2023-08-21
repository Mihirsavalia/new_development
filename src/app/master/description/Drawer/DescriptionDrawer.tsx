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
const LocationContent: React.FC<DrawerProps> = ({ onOpen, onClose, EditId }) => {
    // const [Id, setId] = useState<string>("");
    // const [idHasError, setIdHasError] = useState<boolean>(false);
    // const [idError, setIdError] = useState<boolean>(false);
    const { CompanyId } = useCompanyContext();

    const [description, setDescription] = useState<string>("");
    const [descriptionError, setDescriptionError] = useState<boolean>(false);
    const [descriptionHasError, setDescriptionHasError] = useState<boolean>(false);

    const handleClose = () => {
        onClose();
    };

    const handleSubmit = async (e: any) => {
        e.preventDefault();
        // Id.trim().length <= 0 && setIdError(true);
        description.trim().length <= 0 && setDescriptionError(true);

        if (!(description.trim().length <= 0)) {
            const params = {
                Id: 0,
                CompanyId: CompanyId,
                APFieldId: 47,
                Description: description
            }
            const url = `${process.env.base_url}/description/save`;
            const successCallback = (ResponseData: any) => {
                if (ResponseData.ResponseStatus === "Failure") {
                    Toast.error("Error", ResponseData.Message);
                }
                else {
                    Toast.success(`Description ${EditId ? "updated" : "added"} successfully.`);
                }
                onClose();
            };
            callAPI(url, params, successCallback);
        }
    };

    useEffect(() => {
        if (onOpen) {
            // setId("");
            // setIdError(false);
            setDescription("");
            setDescriptionError(false);
        }
    }, [onOpen]);

    // useEffect(() => {
    //     if (EditId) {
    //         getDescriptionById();
    //     }
    // }, [EditId]);


    return (
        <>
            {onOpen && (
                <div
                    className={`fixed top-0 bg-white  right-0 h-full xsm:!w-5/6 sm:!w-2/4 lg:!w-2/6 xl:!w-2/6 2xl:!w-2/6 z-30 shadow overflow-y-auto ${onOpen ? styles.slideInAnimation : styles.rightAnimation}`}
                >
                    <div className="p-4 flex justify-between items-center border-b border-lightSilver">
                        <Typography type="label" className="!font-bold !text-lg"> {EditId ? "Edit" : "Add"} Description</Typography>
                        <div className="mx-2 cursor-pointer" onClick={handleClose}>
                            <Close variant="medium" />
                        </div>
                    </div>
                    <div className="flex-1 mx-5 mt-2 mb-12 ">
                        {/* <div className="flex-1 mt-3">
                            <Text
                                label="ID"
                                id="id"
                                name="id"
                                placeholder="Please Enter ID"
                                validate
                                value={Id}
                                hasError={idError}
                                getValue={(value: any) => handleIdChange(value)}
                                getError={(e: any) => setIdHasError(e)}
                                onChange={(e: any) => {
                                    setIdError(true);
                                }}
                            >
                            </Text>
                        </div> */}
                        <div className="flex-1 mt-3">
                            <Text
                                label="Description"
                                id="description"
                                name="description"
                                placeholder="Please Enter Description"
                                validate
                                maxLength={200}
                                hasError={descriptionError}
                                value={description}
                                getValue={(value: any) => setDescription(value)}
                                getError={(e: any) => setDescriptionHasError(e)}
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

export default LocationContent