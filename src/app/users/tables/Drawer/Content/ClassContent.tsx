import {
    Button,
    Close,
    Email,
    Select,
    Tel,
    Text,
    Typography
} from "next-ts-lib";
import React, { useState } from 'react'
import styles from "../assets/scss/styles.module.scss";

interface FormData {
    id: number | null;
    name: string;
}
interface DrawerProps {
    onOpen: boolean;
    onClose: () => void;
    onEdit?: any;
    tab?: any;
}

const ClassContent: React.FC<DrawerProps> = ({ onOpen, tab, onEdit, onClose }) => {
    const initialFormData: FormData = {
        id: null,
        name: "",
    };
    const [formData, setFormData] = useState<FormData>(initialFormData);
    const [emptyFields, setEmptyFields] = useState({
        id: true,
        name: true,
    });
    const handleInputChange = (field: any, value: any) => {
        setFormData((prevFormData) => ({ ...prevFormData, [field]: value }));
        setEmptyFields((prevEmptyFields) =>
            value.trim() === "" ? { ...prevEmptyFields, [field]: true } : { ...prevEmptyFields, [field]: false }
        );
    };

    const isFormDataEmpty = Object.values(emptyFields).every((value) => value === false);
    const handleSaveData = () => {
        onClose();
        setFormData(initialFormData);
    };
    return (
        <>
            {onOpen && (
                <div
                    className={`fixed top-0 bg-white right-0 h-full xs:!w-5/6 sm:!w-2/4 lg:!w-2/6 z-30 shadow overflow-y-auto ${onOpen ? styles.slideInAnimation : styles.rightAnimation}`}
                >
                    <div className="p-4 flex justify-between items-center border-b border-lightSilver">
                        <Typography type="label" className="!font-bold !text-lg"> ADD CLASS</Typography>
                        <div className="mx-2 cursor-pointer" onClick={() => { onClose(); }}>
                            <Close variant="medium" />
                        </div>
                    </div>
                    <div className="flex-1 mx-5 mt-2 mb-12">
                        <div className="flex-1 mt-3">
                            <Text
                                label="Full Name"
                                id="name"
                                name="name"
                                // value={isEdit ? updatedFormData.name : ""}
                                validate
                                getValue={(value: any) => handleInputChange("name", (value))} getError={function (arg1: boolean): void {
                                    throw new Error("Function not implemented.");
                                }}></Text>
                        </div>
                        <div className="flex flex-row justify-end items-center border-t border-lightSilver">
                            <div className="my-3 mx-5 ">
                                <Button
                                    onClick={onClose}
                                    className="rounded-full font-medium w-28 mx-3 xs:!px-1"
                                    variant="btn-outline-primary"
                                >
                                    <Typography type="h6" className="!font-bold"> CANCLE</Typography>
                                </Button>
                                <Button
                                    type="submit"
                                    onClick={handleSaveData}
                                    className={`rounded-full font-medium w-28 xs:!px-1  ${isFormDataEmpty ? 'opacity-100' : "opacity-30 pointer-events-none"} `}
                                    variant="btn-primary"
                                >
                                    <Typography type="h6" className="!font-bold"> SAVE</Typography>
                                </Button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}

export default ClassContent;