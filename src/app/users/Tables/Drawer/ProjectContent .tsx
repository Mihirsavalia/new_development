import {
    Button,
    Close, Text,
    Typography
} from "next-ts-lib";
import "next-ts-lib/dist/index.css";
import { useEffect, useState } from "react";
import styles from "@/app/assets/scss/styles.module.scss";

interface DrawerProps {
    onOpen: boolean;
    onClose: () => void;
    onEdit?: any;
}

const ProjectContent: React.FC<DrawerProps> = ({ onOpen, onClose, onEdit }) => {

    const [id, setId] = useState<string>("");
    const [idError, setIdError] = useState<boolean>(false);

    const [name, setName] = useState<string>("");
    const [nameError, setNameError] = useState<boolean>(false);

    const handleClose = () => {
        onClose();
    };

    const handleSubmit = (e: any) => {
        e.preventDefault();
        id.trim().length <= 0 && setIdError(true);
        name.trim().length <= 0 && setNameError(true);
    };

    useEffect(() => {
        if (onOpen) {
            setId("");
            setIdError(false);
            setName("");
            setNameError(false);
        }
    }, [onOpen]);

    return (
        <>
            {onOpen && (
                <div
                    className={`fixed top-0 bg-white right-0 h-full xs:!w-5/6 sm:!w-2/4 lg:!w-2/6 z-30 shadow overflow-y-auto ${onOpen ? styles.slideInAnimation : styles.rightAnimation}`}
                >
                    <div className="p-4 flex justify-between items-center border-b border-lightSilver">
                        <Typography type="label" className="!font-bold !text-lg"> ADD Project</Typography>
                        <div className="mx-2 cursor-pointer" onClick={handleClose}>
                            <Close variant="medium" />
                        </div>
                    </div>
                    <div className="flex-1 mx-5 mt-2 mb-12">
                        <div className="flex-1 mt-3">
                            <Text
                                label="ID"
                                id="id"
                                name="id"
                                placeholder="Please Enter ID Name"
                                validate
                                value={id}
                                hasError={idError}
                                getValue={(value: any) => setId(value)}
                                getError={(e: any) => setIdError(e)}
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
                                placeholder="Please Enter Project Name"
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
                        <div className="flex flex-row w-full absolute  bottom-0 right-0 justify-end items-center border-t border-lightSilver">
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
                </div>
            )}
        </>
    );
}

export default ProjectContent