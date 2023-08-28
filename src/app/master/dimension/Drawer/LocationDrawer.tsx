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
    locationData: any;
}
const LocationContent: React.FC<DrawerProps> = ({ onOpen, onClose, EditId, locationData }) => {
    const { CompanyId } = useCompanyContext();
    const [Id, setId] = useState<string>("");
    const [locationId, setLocationId] = useState<string>("");
    const [idHasError, setIdHasError] = useState<boolean>(false);
    const [idError, setIdError] = useState<boolean>(false);

    const [name, setName] = useState<string>("");
    const [nameError, setNameError] = useState<boolean>(false);
    const [nameHasError, setNameHasError] = useState<boolean>(false);
    const [clicked, setClicked] = useState<boolean>(false);
    const [lastGeneratedId, setLastGeneratedId] = useState<string>("");

    const handleClose = () => {
        onClose();
    };

    //Location Get Data API
    const getLocationById = async () => {
        const params = {
            CompanyId: CompanyId,
            Id: EditId
        }
        const url = `${process.env.base_url}/location/getbyid`;
        const successCallback = (ResponseData: any) => {
            if (ResponseData !== null && typeof ResponseData === 'object') {
                const { Id, LocationId, Name } = ResponseData;
                setId(Id || "");
                setLocationId(LocationId || "");
                setName(Name || "");
                setIdHasError(true);
                setNameHasError(true);
            }
        };
        callAPI(url, params, successCallback);
    };

    const generatedId = () => {
        if (!lastGeneratedId) {
            const lastValue = locationData[0]?.LocationId || 'PQ-L0000';
            const lastCounter = parseInt(lastValue.substr(4));
            const newCounter = lastCounter + 1;
            const newId = `PQ-L${newCounter.toString().padStart(4, '0')}`;
            return newId;
        } else {
            return lastGeneratedId;
        }
    };

    //Save Data API
    const handleSubmit = async (e: any) => {
        e.preventDefault();
        locationId.trim().length <= 0 && setIdError(true);
        name.trim().length <= 0 && setNameError(true);

        if (!(locationId.length <= 0) && !(name.length <= 0)) {
            setClicked(true);
            const params = {
                CompanyId: CompanyId,
                Id: Id || 0,
                Name: name,
                RecordNo: "",
                Status: "active",
                FullyQualifiedName: "",
                LocationId: locationId,
                ParentId: "",
                ParentName: "",
                TaxId: ""
            }
            const url = `${process.env.base_url}/location/save`;
            const successCallback = (ResponseData: any) => {
                if (ResponseData.ResponseStatus === "Failure") {
                    Toast.error("Error", ResponseData.ErrorData.Error);
                }
                else {
                    Toast.success(`Location ${EditId ? "updated" : "added"} successfully.`);
                }
                onClose();
            };
            callAPI(url, params, successCallback);
        }
    };

    useEffect(() => {
        if (onOpen) {
            setId("");
            setLocationId("");
            setIdError(false);
            setName("");
            setNameError(false);
            setClicked(false);
        }
        if (onOpen && !EditId) {
            setLocationId(generatedId())
        }
    }, [onOpen, EditId]);

    useEffect(() => {
        if (EditId) {
            getLocationById();
        }
    }, [EditId]);

    return (
        <>
            <div
                className={`fixed top-0 bg-white  right-0 h-full xsm:!w-5/6 sm:!w-2/4 lg:!w-2/6 xl:!w-2/6 2xl:!w-2/6 z-30 shadow overflow-y-auto ${onOpen ? "translate-x-0" : "translate-x-full"
                    } transition-transform duration-300 ease-in-out`}
            >
                <div className="p-4 flex justify-between items-center border-b border-lightSilver">
                    <Typography type="label" className="!font-bold !text-lg"> {EditId ? "Edit" : "Add"} Location</Typography>
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
                            readOnly={true}
                            hasError={idError}
                            getValue={(value: any) => setLocationId(value)}
                            getError={(e: any) => setIdHasError(e)}
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
                            maxLength={100}
                            hasError={nameError}
                            value={name}
                            getValue={(value: any) => setName(value)}
                            getError={(e: any) => setNameHasError(e)}
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
            </div>
        </>
    );
}

export default LocationContent