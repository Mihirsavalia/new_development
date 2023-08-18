import axios from "axios";
import { Toast } from "next-ts-lib";

export const callAPI = async (url: any, params: any, successCallback: any) => {
    try {
        const token = await localStorage.getItem("token");
        const config = {
            headers: {
                Authorization: `bearer ${token}`,
            },
        };
        const response = await axios.post(url, params, config);
        const { ResponseStatus, ResponseData, Message } = response.data;
        if (response.status === 200) {
            if (ResponseStatus === "Success") {
                    successCallback(ResponseData);
            } else {
                if (Message === null) {
                    Toast.error("Error", "Please try again later.");
                } else {
                    Toast.error("Error", Message);
                }
            }
        } else {
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