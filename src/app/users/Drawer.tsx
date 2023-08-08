import {
    Avatar,
    Button,
    Close,
    Email,
    Select,
    Tel,
    Text,
    Toast,
    Typography
} from "next-ts-lib";
import "next-ts-lib/dist/index.css";
import { useEffect, useState } from "react";
import axios from "axios";
import styles from "@/app/assets/scss/styles.module.scss";
import EditIcon from "@/app/assets/icons/EditIcon";

interface userData {
    id: number;
    name: string;
    email: string;
    phone: number | null;
    country: string;
    state: string;
    timezone: string;
    role: string;
    status: any;
    company: any;
    // imageName: string;
    action: any;
}

interface DrawerProps {
    onOpen: boolean;
    onClose: () => void;
    onData: (formData: FormData) => void;
    editId: number;
}

const Drawer: React.FC<DrawerProps> = ({ onOpen, onClose, onData, editId }) => {

    const [name, setName] = useState<string>("");
    const [nameError, setNameError] = useState<boolean>(false);
    const [email, setEmail] = useState<string>("");
    const [emailError, setEmailError] = useState<boolean>(false);
    const [imagePreview, setImagePreview] = useState<string>("");
    const [userData, setUserData] = useState<userData[]>([]);

    // const [selectedFile, setSelectedFile] = useState(null);
    // const [fileName, setFileName] = useState("");

    const options = [
        { label: "Acme Inc.", value: "Acme Inc." },
        { label: "Tech Corp", value: "Tech Corp" },
        { label: "Software Solutions", value: "Software Solutions" },
        { label: "Tech Innovations", value: "Tech Innovations" },
        { label: "Data Corp", value: "Data Corp" },
    ];

    //User List API
    const getUserData = async () => {
        try {
            const token = await localStorage.getItem("token");
            const config = {
                headers: {
                    Authorization: `bearer ${token}`,
                },
            };
            const response = await axios.get(
                `${process.env.base_url}/user/getbyid?userId=${editId} `,
                config
            );

            if (response.status === 200) {
                if (response.data.ResponseStatus === "Success") {
                    setUserData(response.data.ResponseData);
                } else {
                    const data = response.data.Message;
                    if (data === null) {
                        Toast.error("Error", "Please try again later.");
                    } else {
                        Toast.error("Error", data);
                    }
                }
            }
        } catch (error) {
            console.error(error);
        }
    }
    const handleSubmit = (e: any) => {
        e.preventDefault();
        name.trim().length <= 0 && setNameError(true);
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

    useEffect(() => {
        if (onOpen) {
            setName("");
            setNameError(false);
        }
    }, [onOpen]);

    useEffect(() => {
        getUserData();
        // setEmail(editId ? userData?.email : "")
    }, [editId]);

    return (
        <>

            {onOpen && (
                <div
                    className={`fixed top-0 bg-white right-0 h-full xs:!w-5/6 sm:!w-2/4 lg:!w-2/6 z-30 shadow overflow-y-auto ${onOpen ? styles.slideInAnimation : styles.rightAnimation}`}
                >
                    <div className="p-4 flex justify-between items-center border-b border-lightSilver">
                        <Typography type="label" className="!font-bold !text-lg"> {editId ? "EDIT" : "ADD"} USER</Typography>
                        <div className="mx-2 cursor-pointer" onClick={() => { onClose() }}>
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
                            <Text
                                label="Full Name"
                                id="name"
                                name="name"
                                validate
                                hasError={nameError}
                                value={name}
                                getValue={(value: any) => setName(value)}
                                getError={(e: any) => setNameError(e)}
                                onChange={(e: any) => {
                                    setNameError(true);
                                }}
                            ></Text>
                        </div>
                        <div className="flex-1 mt-3">
                            <Email
                                label="Email"
                                id="email"
                                name="email"
                                type="email"
                                validate
                                hasError={emailError}
                                value={email}
                                getValue={(value: any) => setEmail(value)}
                                getError={(e: any) => setEmailError(e)}
                                onChange={(e: any) => {
                                    setEmailError(true);
                                }}
                            ></Email>
                        </div>
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
                                onClick={handleSubmit}
                                className={`rounded-full font-medium w-28 xs:!px-1`}
                                variant="btn-primary"
                            >
                                <Typography type="h6" className="!font-bold"> SAVE</Typography>
                            </Button>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}

export default Drawer