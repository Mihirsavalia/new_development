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
    first_name: string,
    last_name: string,
    email: string;
    phone: number | null;
    address: string,
    user_image: string,
    country_id: number,
    state_id: number,
    city_id: number,
    postal_code: number,
    time_zone: number,
    companyIds: any
}
interface DrawerProps {
    onOpen: boolean;
    onClose: () => void;
    editId: number;
}

const Drawer: React.FC<DrawerProps> = ({ onOpen, onClose, editId }) => {

    const [id, setId] = useState<number>()
    const [name, setName] = useState<string>("");
    const [nameError, setNameError] = useState<boolean>(false);
    const [email, setEmail] = useState<string>("");
    const [emailError, setEmailError] = useState<boolean>(false);
    const [phone, setPhone] = useState<string>("");
    const [phoneError, setPhoneError] = useState<boolean>(false);

    const [imagePreview, setImagePreview] = useState<string>("");
    const [userData, setUserData] = useState<userData[]>([]);
    const [country, setCountry] = useState([]);
    const [countryId, setCountryId] = useState<number>();
    const [countryError, setCountryError] = useState<boolean>(false);
    const [state, setState] = useState([]);
    const [stateId, setStateId] = useState<number>();
    const [stateError, setStateError] = useState<boolean>(false);

    // const [selectedFile, setSelectedFile] = useState(null);
    // const [fileName, setFileName] = useState("");

    const options = [
        { label: "Acme Inc.", value: "Acme Inc." },
        { label: "Tech Corp", value: "Tech Corp" },
        { label: "Software Solutions", value: "Software Solutions" },
        { label: "Tech Innovations", value: "Tech Innovations" },
        { label: "Data Corp", value: "Data Corp" },
    ];

    //Country List API
    const getCountryList = async () => {
        try {
            const token = await localStorage.getItem("token");
            const config = {
                headers: {
                    Authorization: `bearer ${token}`,
                },
            };
            const response = await axios.get(
                `${process.env.select_url}/country/list`,
                config
            );
            const { ResponseStatus, ResponseData, Message } = response.data;
            if (response.status === 200) {
                if (ResponseStatus === "Success") {
                    if (ResponseData !== null && typeof ResponseData === 'object') {
                        setCountry(ResponseData);
                    }
                } else {
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
            console.error(error);
        }
    }
    //State List API
    const getStateList = async () => {
        try {
            const token = await localStorage.getItem("token");
            const config = {
                headers: {
                    Authorization: `bearer ${token}`,
                },
            };
            const response = await axios.get(
                `${process.env.select_url}/state/list?countryId=${countryId}`,
                config
            );
            const { ResponseStatus, ResponseData, Message } = response.data;
            if (response.status === 200) {
                if (ResponseStatus === "Success") {
                    if (ResponseData !== null && typeof ResponseData === 'object') {
                        setState(ResponseData);
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
            console.error(error);
        }
    }

    useEffect(() => {
        getCountryList();
        getStateList();
    }, []);

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
            const { ResponseStatus, ResponseData, Message } = response.data;
            if (response.status === 200) {
                if (ResponseStatus === "Success") {
                    if (ResponseData !== null && typeof ResponseData === 'object') {
                        const { id, first_name, email, phone } = ResponseData;
                        setId(id);
                        setName(first_name || "");
                        setEmail(email || "");
                        setPhone(phone || null);
                    }
                } else {
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
            console.error(error);
        }
    }

    //Save Data API
    const handleSubmit = async (e: any) => {
        e.preventDefault();
        name.trim().length <= 0 && setNameError(true);
        email.trim().length <= 0 && setEmailError(true);
        phone.trim().length <= 0 && setPhoneError(true);

        const [firstName, ...lastNamePart] = name.split(" ");
        const lastName = lastNamePart.join(" ");

        try {
            const token = await localStorage.getItem("token");
            const params = {
                "id": id || 0,
                "first_name": firstName,
                "last_name": lastName,
                "email": email,
                "phone": phone,
                "address": "Ahmedabad",
                "user_image": "9f651597-26cc-11ee-b910-005056aa5530",
                "country_id": countryId,
                "state_id": 12,
                "city_id": 12,
                "postal_code": "1111123456",
                "time_zone": 2,
                "companyIds": []
            }
            const config = {
                headers: {
                    Authorization: `bearer ${token}`,
                },
            };
            const response = await axios.post(
                `${process.env.base_url}/user/save`, params,
                config
            );

            const { ResponseStatus, Message } = response.data;
            if (response.status === 200) {
                if (ResponseStatus === "Success") {
                    Toast.success(`User ${editId ? "updated" : "added"} successfully.`);
                    onClose();
                } else {
                    onClose();
                    if (Message != null) {
                        Toast.error(Message);
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
            console.error(error);
        }
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
            setId(0);
            setName("");
            setNameError(false);
            setEmail("");
            setEmailError(false);
            setPhone("");
            setPhoneError(false);
        }
    }, [onOpen]);


    useEffect(() => {
        getUserData();
    }, [editId]);

    return (
        <>
            {onOpen && (
                <div
                    className={`fixed top-0 bg-white right-0 h-full xs:!w-5/6 sm:!w-2/4 lg:!w-2/6 z-30 shadow overflow-y-auto ${onOpen ? styles.slideInAnimation : styles.rightAnimation
                        }`}
                >
                    <div className="p-4 flex justify-between items-center border-b border-lightSilver">
                        <Typography type="label" className="!font-bold !text-lg">
                            {" "}
                            {editId ? "EDIT" : "ADD"} USER
                        </Typography>
                        <div
                            className="mx-2 cursor-pointer"
                            onClick={() => {
                                onClose();
                            }}
                        >
                            <Close variant="medium" />
                        </div>
                    </div>
                    <div className="flex-1 mx-5 mt-2 mb-12">
                        <div className="relative flex mt-3">
                            <Avatar variant="large" imageUrl={imagePreview} />
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
                                maxLength={50}
                                pattern="/^\d{1,50}$/g"
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
                                label="Email-ID"
                                id="email"
                                name="email"
                                type="email"
                                validate
                                readOnly={editId ? true : false}
                                disabled={editId ? true : false}
                                hasError={emailError}
                                value={email}
                                getValue={(value: any) => setEmail(value)}
                                getError={(e: any) => setEmailError(e)}
                                onChange={(e: any) => {
                                    setEmailError(true);
                                }}
                            ></Email>
                        </div>
                        <div className="flex-1 mt-3">
                            <Tel
                                label="Telephone"
                                validate
                                required
                                hasError={phoneError}
                                value={phone}
                                getValue={(value: any) => setPhone(value.slice(4))}
                                countryCode
                                max={10}
                                getError={(e: any) => setPhoneError(e)}
                                onChange={(e: any) => {
                                    setPhoneError(true);
                                }}
                            />
                        </div>
                        <div className="flex-1 mt-3">
                            <Select
                                id="country"
                                label="Country"
                                options={country}
                                validate
                                defaultValue={countryId}
                                getValue={(value: any) => { setCountryId(value), console.log(value) }}
                                getError={(e: any) => { setCountryError(e) }}
                                hasError={countryError}
                            />
                        </div>
                        <div className="flex-1 mt-3">
                            <Select
                                id="state"
                                label="State"
                                options={state}
                                validate
                                defaultValue={stateId}
                                getValue={(value: any) => setStateId(value)}
                                getError={(e: any) => { setStateError(e) }}
                                hasError={stateError}
                            />
                        </div>
                    </div>
                    <div className="flex flex-row justify-end items-center border-t border-lightSilver">
                        <div className="my-3 mx-5 ">
                            <Button
                                onClick={onClose}
                                className="rounded-full font-medium w-28 mx-3 xs:!px-1"
                                variant="btn-outline-primary"
                            >
                                <Typography type="h6" className="!font-bold">
                                    {" "}
                                    CANCLE
                                </Typography>
                            </Button>
                            <Button
                                type="submit"
                                onClick={handleSubmit}
                                className={`rounded-full font-medium w-28 xs:!px-1`}
                                variant="btn-primary"
                            >
                                <Typography type="h6" className="!font-bold">
                                    {" "}
                                    SAVE
                                </Typography>
                            </Button>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}

export default Drawer