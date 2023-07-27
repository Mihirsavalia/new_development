import {
    Avatar,
    Button,
    Close,
    Select,
    Tel,
    TextField
} from "next-ts-lib";
import "next-ts-lib/dist/index.css";
import styles from "../assets/scss/styles.module.scss";
import { useState } from "react";
import EditIcon from "../assets/icons/EditIcon";

interface FormData {
    name: string;
    email: string;
    phone: number | null;
    country: string;
    state: string;
    timezone: string;
    role: string;
    status: string;
    company: string[];
    // imageName: string;
}

interface DrawerProps {
    onOpen: boolean;
    onClose: () => void;
    onData: (formData: FormData) => void;
}

const Drawer: React.FC<DrawerProps> = ({ onOpen, onClose, onData }) => {
    const initialFormData: FormData = {
        name: "",
        email: "",
        phone: null,
        country: "",
        state: "",
        timezone: "",
        role: "",
        status: "",
        company: []
    };
    const [formData, setFormData] = useState<FormData>(initialFormData);

    const [imagePreview, setImagePreview] = useState<string>("");
    // const [selectedFile, setSelectedFile] = useState(null);
    // const [fileName, setFileName] = useState("");

    const options = [
        { label: "Acme Inc.", value: "Acme Inc." },
        { label: "Tech Corp", value: "Tech Corp" },
        { label: "Software Solutions", value: "Software Solutions" },
        { label: "Tech Innovations", value: "Tech Innovations" },
        { label: "Data Corp", value: "Data Corp" },
    ];

    const handleSaveData = () => {
        onData(formData);
        onClose();
        setFormData(initialFormData);
    };

    const onUploadImage = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target?.files && e.target.files[0]) {
            const file = e.target.files[0];
            // setSelectedFile(file);
            // setFileName(file.name);
            const reader = new FileReader();
            reader.onload = function (e) {
                const result = e.target?.result;
                if (result && typeof result === "string") {
                    setImagePreview(result);
                }
            };
            reader.readAsDataURL(file);
        }
    };

    const handleEditIconClick = () => {
        const fileInput = document.getElementById("imageUpload");
        fileInput && fileInput.click();
    };

    const [emptyFields, setEmptyFields] = useState({
        name: true,
        email: true,
        phone: true,
        country: true,
        state: true,
        timezone: true,
        role: true,
    });

    const handleInputChange = (field: any, value: any) => {
        setFormData((prevFormData) => ({ ...prevFormData, [field]: value }));
        setEmptyFields((prevEmptyFields) =>
            value.trim() === "" ? { ...prevEmptyFields, [field]: true } : { ...prevEmptyFields, [field]: false }
        );
    };
    const fullNameRegex = /^\d{1,50}$/g;

    const isFormDataEmpty = Object.values(emptyFields).every((value) => value === false) || fullNameRegex.test(formData.name);;

    return (
        <>
            {onOpen && (
                <div
                    className={`fixed top-0 right-0 h-screen w-2/6 z-30 bg-white shadow overflow-y-auto ${onOpen ? styles.slideInAnimation : styles.slideOutAnimation}`}
                >
                    <div className="p-4 flex justify-between items-center border-b border-lightSilver">
                        <div className="font-bold text-base">ADD USER</div>
                        <div className="mx-2 cursor-pointer" onClick={onClose}>
                            <Close variant="medium" />
                        </div>
                    </div>
                    <div className="flex-1 mx-5 mt-2 mb-12">
                        <div className="relative flex mt-3">
                            <Avatar
                                variant="large"
                                imageUrl={imagePreview}
                            />
                            <div
                                className="absolute bottom-0 left-11 cursor-pointer"
                                onClick={handleEditIconClick}
                            >
                                <EditIcon />
                            </div>

                            <input
                                type="file"
                                id="imageUpload"
                                accept=".png, .jpg, .jpeg"
                                className="hidden"
                                onChange={onUploadImage}
                            />
                        </div>
                        <div className="flex-1 mt-3">
                            <TextField
                                label="Full Name"
                                id="name"
                                name="name"
                                validate
                                getValue={(value: any) => handleInputChange("name", value)}
                            ></TextField>
                        </div>
                        <div className="flex-1 mt-3">
                            <TextField
                                label="Email"
                                id="email"
                                name="email"
                                type="email"
                                validate
                                getValue={(value: any) => handleInputChange("email", value)}
                            ></TextField>
                        </div>
                        <div className="flex-1 mt-3">
                            <Tel
                                label="Telephone"
                                validate
                                required
                                getValue={(value: any) =>
                                    handleInputChange("phone", value)
                                }
                                countryCode
                            />
                        </div>
                        <div className="flex-1 mt-3">
                            <Select
                                label="Country"
                                options={options}
                                id="country"
                                required
                                onSelect={(value: any) =>
                                    handleInputChange("country", value)
                                }
                            />
                        </div>
                        <div className="flex-1 mt-3">
                            <Select
                                label="State"
                                options={options}
                                id="state"
                                required
                                onSelect={(value: any) =>
                                    handleInputChange("state", value)
                                }
                            />
                        </div>
                        <div className="flex-1 mt-3">
                            <Select
                                label="Timezone"
                                options={options}
                                id="timezone"
                                required
                                onSelect={(value: any) =>
                                    handleInputChange("timezone", value)
                                }
                            />
                        </div>
                        <div className="flex-1 mt-3">
                            <Select
                                label="Company"
                                options={options}
                                id="company"
                                required
                                onSelect={(value: any) =>
                                    handleInputChange("company", value)
                                }
                            />
                        </div>
                        <div className="flex-1 mt-3">
                            <Select
                                label="Assign Role"
                                options={options}
                                id="assign_role"
                                required
                                onSelect={(value: any) =>
                                    handleInputChange("role", value)
                                }
                            />
                        </div>
                    </div>
                    <div className="flex flex-row justify-end items-center border-t border-lightSilver">
                        <div className="my-3 mx-5">
                            <Button
                                onClick={onClose}
                                className="rounded-full font-medium !w-28 mx-3"
                                variant="btn-outline-primary"
                            >
                                CANCLE
                            </Button>
                            <Button
                                type="submit"
                                onClick={handleSaveData}
                                className={`rounded-full font-medium !w-28 ${isFormDataEmpty ? 'opacity-100' : "opacity-30 pointer-events-none"} `}
                                variant="btn-primary"
                            >
                                SAVE
                            </Button>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}

export default Drawer