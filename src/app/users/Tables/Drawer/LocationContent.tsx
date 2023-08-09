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
import styles from "@/app/assets/scss/styles.module.scss";

interface DrawerProps {
    onOpen: boolean;
    onClose: () => void;
    locationEditId?: number;
}
const LocationContent: React.FC<DrawerProps> = ({ onOpen, onClose, locationEditId }) => {

    const [locationId, setLocationId] = useState<string>("");
    const [idHasError, setIdHasError] = useState<boolean>(false);
    const [idError, setIdError] = useState<boolean>(false);

    const [name, setName] = useState<string>("");
    const [nameError, setNameError] = useState<boolean>(false);
    const [nameHasError, setNameHasError] = useState<boolean>(false);

    const handleClose = () => {
        onClose();
    };

    //Location Data API
    const getLocationById = async () => {
        try {
            const token = await localStorage.getItem("token");
            const params = {
                "CompanyId": 69,
                "Id": locationEditId

            }
            const config = {
                headers: {
                    Authorization: `bearer ${token}`,
                },
            };
            const response = await axios.post(
                `${process.env.base_url}/location/getbyid `,
                params,
                config
            );
            const { ResponseStatus, ResponseData, Message } = response.data;
            if (response.status === 200) {
                if (ResponseStatus === "Success") {
                    if (ResponseData !== null && typeof ResponseData === 'object') {
                        const { id, name } = ResponseData;
                        setLocationId(id);
                        setName(name);
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

    const handleSubmit = async (e: any) => {
        e.preventDefault();
        locationId.trim().length <= 0 && setIdError(true);
        name.trim().length <= 0 && setNameError(true);

        if (idHasError && nameHasError) {
            try {
                const token = await localStorage.getItem("token");
                const params = {
                    "Id": 0,
                    "LocationId": locationId,
                    "Description": "f4g4",
                    "RecordNo": "",
                    "CompanyId": 12,
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
                    `${process.env.base_url}/location/save`, params,
                    config
                );

                const { ResponseStatus, Message } = response.data;
                if (response.status === 200) {
                    if (ResponseStatus === "Success") {
                        Toast.success(`Location ${locationEditId ? "updated" : "added"} successfully.`);
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
        if (onOpen && locationEditId) {
            getLocationById();
        }
    }, [locationEditId]);

    useEffect(() => {
        if (onOpen) {
            setLocationId("");
            setIdError(false);
            setName("");
            setNameError(false);
        }
    }, [onOpen]);

    return (
        <>
            {onOpen && (
                <div
                    className={`fixed top-0 bg-white  right-0 h-full xs:!w-5/6 sm:!w-2/4 lg:!w-2/6 xl:!w-2/6 2xl:!w-2/6 z-30 shadow overflow-y-auto ${onOpen ? styles.slideInAnimation : styles.rightAnimation}`}
                >
                    <div className="p-4 flex justify-between items-center border-b border-lightSilver">
                        <Typography type="label" className="!font-bold !text-lg"> ADD Location</Typography>
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
                                value={locationId}
                                hasError={idError}
                                getValue={(value: any) => setLocationId(value)}
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
                                placeholder="Please Enter Location Name"
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

export default LocationContent