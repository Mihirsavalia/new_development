"use client";
import { useEffect, useState } from "react";
import Image from "next/image";
import { Button, Loader, Password, Toast, Typography } from "next-ts-lib";
import "next-ts-lib/dist/index.css";
import Footer from "@/components/Footer";
import { useRouter, useSearchParams } from "next/navigation";
import axios from "axios";
import { hasToken } from "@/utils/commonFunction";

export default function SetNewPassword() {
  const getToken = useSearchParams();
  const token = getToken.get("token");
  const router = useRouter();
  const [password, setPassword] = useState("");
  const [cPassword, setCPassword] = useState("");
  const [passwordError, setPasswordError] = useState(false);
  const [passwordErrorMsg, setPasswordErrorMsg] = useState("");
  const [cPasswordError, setCPasswordError] = useState(false);
  const [cPasswordErrorMsg, setCPasswordErrorMsg] = useState("");
  const [error, setError] = useState(false);
  const [clicked, setClicked] = useState(false);
  const [passwordHasError, setPasswordHasError] = useState(false);
  const [cPasswordHasError, setCPasswordHasError] = useState(false);

  useEffect(() => {
    hasToken(router);
    if (!token) {
      router.push("/signin");
    }
  }, [router, token]);

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    if (password === "") {
      setPasswordError(true);
      setPasswordErrorMsg("This is required field");
    }
    if (cPassword === "") {
      setCPasswordError(true);
      setCPasswordErrorMsg("This is required field");
    }
    if (password !== cPassword) {
      setError(true);
    } else {
      setError(false);
    }
    if (
      password !== "" &&
      cPassword !== "" &&
      password === cPassword &&
      passwordHasError &&
      cPasswordHasError
    ) {
      setClicked(true);
      try {
        const response = await axios.post(
          `${process.env.api_url}/setpassword`,
          {
            token: token,
            password: password,
          }
        );

        if (response.status === 200) {
          if (response.data.ResponseStatus === "Success") {
            setPassword("");
            setCPassword("");
            setPasswordHasError(false);
            setCPasswordHasError(false);
            setClicked(false);
            const data = response.data.Message;
            if (data === null) {
              Toast.success("Success", "Password set successfully.");
            } else {
              Toast.success("Success", data);
            }
            router.push(`/signin`);
          } else {
            setClicked(false);
            const data = response.data.Message;
            if (data === null) {
              Toast.error("Error", "Please try again.");
            } else {
              Toast.error("Error", data);
            }
          }
        } else {
          setClicked(false);
          const data = response.data.Message;
          if (data === null) {
            Toast.error("Error", "Please try again after sometime.");
          } else {
            Toast.error("Error", data);
          }
        }
      } catch (error) {
        setClicked(false);
        console.error(error);
      }
    } else {
      setClicked(false);
    }
  };

  return (
    <div className="flex flex-col justify-between min-h-screen">
      <div className="flex items-center flex-col pt-5">
        <Image src="/logo.png" alt="Logo" width={194} height={100} priority />
        <div className="flex flex-col items-center justify-center min-h-[80vh]">
          <span className="pb-[25px] text-primary font-bold text-xl lg:text-2xl mx-5 sm:mx-auto">
            Please set a password for your account.
          </span>
          <form
            className="text-start w-full max-w-md py-5 px-3 flex flex-col items-center justify-center"
            onSubmit={handleSubmit}
          >
            <div className="pb-4 w-[300px] lg:w-[356px]">
              <Password
                label="Password"
                name="password"
                getValue={(e) => setPassword(e)}
                getError={(e) => setPasswordHasError(e)}
                hasError={passwordError}
                validate
                errorMessage={passwordErrorMsg}
                minChar={12}
                maxChar={28}
              />
            </div>
            <div className="pb-4 w-[300px] lg:w-[356px]">
              <Password
                label="Confirm Password"
                getValue={(e) => setCPassword(e)}
                getError={(e) => setCPasswordHasError(e)}
                hasError={cPasswordError}
                name="ConfirmpPassword"
                validate
                errorMessage={cPasswordErrorMsg}
                minChar={12}
                maxChar={28}
              />
            </div>
            {error && (
              <span className="text-defaultRed text-sm lg:text-base">
                Password does not match!
              </span>
            )}
            {clicked ? (
              <Loader size="sm" />
            ) : (
              <Button
                type="submit"
                variant="btn-primary"
                className="rounded-full !w-[300px] !font-semibold mt-[20px]"
              >
                CONTINUE
              </Button>
            )}
          </form>
        </div>
      </div>
      <Footer />
    </div>
  );
}
