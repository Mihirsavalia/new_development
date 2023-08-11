"use client";
import Image from "next/image";
import Link from "next/link";

import {
  Button,
  CheckBox,
  Email,
  Loader,
  Password,
  Toast,
  Tooltip,
  Typography,
} from "next-ts-lib";
import "next-ts-lib/dist/index.css";
import Google from "../../assets/Icons/Google";
import Qb from "../../assets/Icons/Qb";
import Footer from "@/components/Footer";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import { hasToken } from "@/utils/commonFunction";

export default function Home() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [emailError, setEmailError] = useState(false);
  const [emailHasNoError, setEmailHasNoError] = useState(false);
  const [password, setPassword] = useState("");
  const [passwordError, setPasswordError] = useState(false);
  const [passwordHasNoError, setPasswordHasNoError] = useState(false);
  const [checked, setChecked] = useState(false);
  const [clicked, setClicked] = useState(false);

  useEffect(() => {
    hasToken(router);
  }, [router, emailHasNoError, passwordHasNoError]);

  const handleLoginGoogle = () => {
    const clientId = process.env.GOOGLE_CLIENT_ID;
    const redirectUri = process.env.REDIRECT_URI;
    const responseType = "id_token token";
    const scope = "email profile";

    const url = `https://accounts.google.com/o/oauth2/auth?client_id=${clientId}&redirect_uri=${redirectUri}&response_type=${responseType}&scope=${scope}`;
    window.location.href = url;
  };

  const handleLoginQuickBooks = async () => {
    try {
      const response = await axios.get(
        `${process.env.api_url}/getqboconnecturl`
      );
      if (response.status === 200) {
        if (response.data.ResponseStatus === "Success") {
          window.location.href = response.data.ResponseData;
        } else {
          const data = response.data.Message;
          if (data === null) {
            Toast.error("Error", "Please try again later.");
          } else {
            Toast.error("Error", data);
          }
        }
      } else {
        const data = response.data.Message;
        if (data === null) {
          Toast.error("Error", "Login failed. Please try again.");
        } else {
          Toast.error("Error", data);
        }
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handleSubmit = async (e: { preventDefault: () => void }) => {
    e.preventDefault();
    email.trim().length <= 0 && setEmailError(true);
    password.trim().length <= 0 && setPasswordError(true);

    if (!(email.trim().length <= 0) && !(password.trim().length <= 0)) {
      setClicked(true);
      try {
        const response = await axios.post(`${process.env.api_url}/token`, {
          username: email,
          password: password,
        });

        if (response.status === 200) {
          if (response.data.ResponseStatus === "Success") {
            setEmail("");
            setPassword("");
            setClicked(false);
            setEmailHasNoError(false);
            setPasswordHasNoError(false);
            router.push(`/verification?email=${encodeURIComponent(email)}`);
            Toast.success(
              "OTP sent successfully.",
              "Please check your email id for OTP."
            );
          } else {
            setClicked(false);
            const data = response.data.Message;
            if (data === null) {
              Toast.error("Error", "Data does not match.");
            } else {
              Toast.error("Error", data);
            }
          }
        } else {
          setClicked(false);
          const data = response.data.Message;
          if (data === null) {
            Toast.error("Error", "Login failed. Please try again.");
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
      <div className="loginWrapper flex items-center flex-col pt-5">
        <Image src="/logo.png" alt="Logo" width={194} height={100} priority />
        <Typography type="h3" className="pt-4 pb-2 font-bold text-primary">
          Sign In
        </Typography>
        <form
          onSubmit={handleSubmit}
          className="text-start w-full max-w-3xl py-5 px-3 flex flex-col items-center justify-center"
        >
          <div className="pb-5 w-[300px] lg:w-[356px]">
            <Email
              label="Email"
              type="email"
              id="email"
              name="email"
              validate
              getValue={(e) => setEmail(e)}
              getError={(err) => setEmailHasNoError(err)}
              hasError={emailError}
              autoComplete="off"
            />
          </div>
          <div className="pb-5 w-[300px] lg:w-[356px]">
            <Password
              label="Password"
              name="password"
              novalidate
              validate
              getValue={(e) => setPassword(e)}
              getError={(e) => setPasswordHasNoError(e)}
              hasError={passwordError}
              autoComplete="off"
              minChar={12}
              maxChar={28}
            />
          </div>
          <div className="pb-5 w-[300px] lg:w-[356px] flex justify-between items-center">
            <div className="flex items-center justify-center">
              <CheckBox
                id="agree"
                onChange={(e) => setChecked(e.target.checked)}
                label="Keep me logged in"
                className="text-[#333333]"
                variant="small"
              />
            </div>
            <Link
              href="/forgot-password"
              className="text-primary font-semibold text-sm lg:text-base underline"
            >
              Forgot Password?
            </Link>
          </div>
          {clicked ? (
            <Loader size="sm" />
          ) : (
            <Button
              type="submit"
              variant="btn-primary"
              className="rounded-full !w-[300px] !font-semibold mb-4 disabled:opacity-50"
              // disabled={!emailHasNoError || !passwordHasNoError}
            >
              SIGN IN
            </Button>
          )}
        </form>
        <div className="socialMediaBox w-[300px] lg:w-[356px] max-w-md border-t border-lightSilver p-3 relative flex flex-col ">
          <Typography
            type="p"
            className="bg-white relative top-[-25px] px-5 max-w-content m-auto text-sm lg:text-base text-[#333333]"
          >
            or Continue with
          </Typography>
          <div className="socialMedia flex justify-around">
            <ul className="w-[100px] flex items-center justify-center">
              <li className="mr-[40px]">
                <Link href="#" onClick={handleLoginGoogle}>
                  <Tooltip content="Google" position="top">
                    <Google />
                  </Tooltip>
                </Link>
              </li>
              <li>
                <Link href="#" onClick={handleLoginQuickBooks}>
                  <Tooltip content="QuickBooks" position="top">
                    <Qb />
                  </Tooltip>
                </Link>
              </li>
            </ul>
          </div>
        </div>
        <div className="pb-4 flex justify-between items-center mt-[20px] text-[#333333] text-sm lg:text-base">
          Don&rsquo;t have an accout?&nbsp;
          <Link
            href={"/signup"}
            className="text-primary font-semibold underline"
          >
            Sign Up
          </Link>
        </div>
      </div>
      <Footer />
    </div>
  );
}
