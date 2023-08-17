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
const LocationContent: React.FC<DrawerProps> = ({ onOpen, onClose, EditId }) => {
    // const [Id, setId] = useState<string>("");
    // const [idHasError, setIdHasError] = useState<boolean>(false);
    // const [idError, setIdError] = useState<boolean>(false);

    const [description, setDescription] = useState<string>("");
    const [descriptionError, setDescriptionError] = useState<boolean>(false);
    const [descriptionHasError, setDescriptionHasError] = useState<boolean>(false);

    const handleClose = () => {
        onClose();
    };

    //Description Get Data API
    // const getDescriptionById = async () => {
    //     try {
    //         const token = await localStorage.getItem("token");
    //         const params = {
    //             "CompanyId": 86,
    //             "Id": EditId

    //         }
    //         const config = {
    //             headers: {
    //                 Authorization: `bearer ${token}`,
    //             },
    //         };
    //         const response = await axios.post(
    //             `${process.env.base_url}/description/getbyid `,
    //             params,
    //             config
    //         );
    //         const { ResponseStatus, ResponseData, Message } = response.data;
    //         if (response.status === 200) {
    //             if (ResponseStatus === "Success") {
    //                 if (ResponseData !== null && typeof ResponseData === 'object') {
    //                     const { Id, LocationId, Name } = ResponseData;
    //                     // setId(Id || "");
    //                     // setId(LocationId || "");
    //                     setDescription(Name || "");
    //                     // setIdHasError(true);
    //                     setDescriptionHasError(true);
    //                 }
    //             } else {
    //                 if (Message === null) {
    //                     Toast.error("Error", "Please try again later.");
    //                 } else {
    //                     Toast.error("Error", Message);
    //                 }
    //             }
    //         }
    //         else {
    //             if (Message === null) {
    //                 Toast.error("Error", "Please try again later.");
    //             } else {
    //                 Toast.error("Error", Message);
    //             }
    //         }
    //     } catch (error) {
    //     }
    // }

    // const handleIdChange = (value: any) => {
    //     const pattern = /^[a-zA-Z0-9]+$/;
    //     if (pattern.test(value)) {
    //         setIdError(false);
    //         setId(value);
    //     }
    // };

    const handleSubmit = async (e: any) => {
        e.preventDefault();
        // Id.trim().length <= 0 && setIdError(true);
        description.trim().length <= 0 && setDescriptionError(true);

        if (!(description.trim().length <= 0)) {
            try {
                const token = await localStorage.getItem("token");
                const params = {
                    Id: 0,
                    CompanyId: 86,
                    APFieldId: 47,
                    Description: description
                }
                const config = {
                    headers: {
                        Authorization: `bearer ${token}`,
                    },
                };
                const response = await axios.post(
                    `${process.env.base_url}/description/save`, params,
                    config
                );

                const { ResponseStatus, ResponseData, Message } = response.data;
                if (response.status === 200) {
                    if (ResponseStatus === "Success") {
                        if (ResponseData.ResponseStatus === "Failure") {
                            Toast.error("Error", ResponseData.Message);
                        }
                        else {
                            Toast.success(`Description ${EditId ? "updated" : "added"} successfully.`);
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
            }
        }
        else {
            Toast.error("Error", "Please fill required field!");
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
                                onChange={(e: any) => {
                                    setDescriptionError(true);
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
                </div >
            )}
        </>
    );
}

export default LocationContent