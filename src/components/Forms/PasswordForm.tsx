import React, { useState } from "react";
import { Button, Password, Toast } from "next-ts-lib";
import { ProfileData } from "@/app/profile/page";
import axios from "axios";

type PasswordFormProps = {
  profileData?: ProfileData | null;
  handleEdit: (arg1: boolean, arg2: string) => void;
};

const PasswordForm = ({ profileData, handleEdit }: any) => {
  const [currentPwd, setCurrentPwd] = useState<string>("");
  const [currentPwdErr, setCurrentPwdErr] = useState<boolean>(false);
  const [currentPwdHasNoErr, setCurrentPwdHasNoErr] = useState<boolean>(false);
  const [newPwd, setNewPwd] = useState<string>("");
  const [newPwdErr, setNewPwdErr] = useState<boolean>(false);
  const [newPwdHasNoErr, setNewPwdHasNoErr] = useState<boolean>(false);
  const [confirmPwd, setConfirmPwd] = useState<string>("");
  const [confirmPwdErr, setConfirmPwdErr] = useState<boolean>(false);
  const [confirmPwdHasNoErr, setConfirmPwdHasNoErr] = useState<boolean>(false);
  const [isMatched, setIsMatched] = useState<boolean>(true);

  const token = localStorage.getItem("token");

  const validate = () => {
    return currentPwdHasNoErr &&
      newPwdHasNoErr &&
      confirmPwdHasNoErr &&
      isMatched
      ? true
      : false;
  };

  const updatePassword = async () => {
    await axios
      .post(
        `${process.env.api_profile}/auth/updatepassword`,
        {
          currentPassword: currentPwd,
          newPassword: newPwd,
        },
        {
          headers: {
            Authorization: `bearer ${token}`,
          },
        }
      )
      .then((data) => {
        if (data.data.ResponseStatus === "Success") {
          Toast.success("Profile updated successfully!");
          handleEdit(false, "");
        }
        if (data.data.ResponseStatus === "Failure") {
          Toast.error(
            data.data.Message === null
              ? "Something went wrong!"
              : data.data.Message
          );
          handleEdit(false, "");
        }
      })
      .catch((err) => {
        Toast.error(err === null ? "Something went wrong!" : err);
        handleEdit(false, "");
      });
  };

  const handleSubmit = (e: any) => {
    e.preventDefault();

    currentPwd === "" ? setCurrentPwdErr(true) : setCurrentPwdErr(false);
    newPwd === "" ? setNewPwdErr(true) : setNewPwdErr(false);
    confirmPwd === "" ? setConfirmPwdErr(true) : setConfirmPwdErr(false);
    newPwd === confirmPwd ? setIsMatched(true) : setIsMatched(false);

    if (validate()) {
      updatePassword();
    }
  };
  return (
    <div>
      <form onSubmit={handleSubmit}>
        <div className="flex gap-[20px] flex-col p-[20px] max-h-[78.5vh]">
          <Password
            label="Current Password"
            placeholder="Enter Current Password"
            value={currentPwd}
            validate
            novalidate
            autoComplete="off"
            hasError={currentPwdErr}
            getValue={(value) => setCurrentPwd(value)}
            getError={(err) => setCurrentPwdHasNoErr(err)}
          />
          <Password
            label="New Password"
            placeholder="Enter New Password"
            value={newPwd}
            validate
            autoComplete="off"
            hasError={newPwdErr}
            getValue={(value) => {
              setNewPwd(value);
              value === newPwd ? setIsMatched(true) : setIsMatched(false);
            }}
            getError={(err) => setNewPwdHasNoErr(err)}
          />
          <Password
            label="Confirm Password"
            placeholder="Enter Confirm Password"
            value={confirmPwd}
            validate
            autoComplete="off"
            hasError={confirmPwdErr}
            getValue={(value) => {
              setConfirmPwd(value);
              value === newPwd ? setIsMatched(true) : setIsMatched(false);
            }}
            getError={(err) => setConfirmPwdHasNoErr(err)}
          />
          {!isMatched && (
            <span className="-mt-3 text-defaultRed text-sm lg:text-base">
              Password does not match!
            </span>
          )}
        </div>
        <div className="flex justify-end fixed w-full bottom-0 gap-[20px] p-[9px] bg-pureWhite border-t border-lightSilver">
          <Button
            variant="btn-outline-primary"
            className="rounded-[4px] !h-[36px]"
            onClick={() => handleEdit(false, "")}
          >
            Cancel
          </Button>
          <Button
            variant="btn-primary"
            className="rounded-[4px] !h-[36px]"
            type="submit"
          >
            Save
          </Button>
        </div>
      </form>
    </div>
  );
};

export default PasswordForm;
