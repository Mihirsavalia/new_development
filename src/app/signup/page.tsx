"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import axios from "axios";
import {
  Button,
  CheckBox,
  Email,
  Loader,
  Tel,
  Text,
  Toast,
  Tooltip,
  Typography,
} from "next-ts-lib";
import { hasToken } from "@/utils/commonFunction";
import Qb from "../../assets/Icons/Qb";
import Google from "../../assets/Icons/Google";
import Footer from "@/components/Footer";

import "next-ts-lib/dist/index.css";

const SITE_KEY = "6Lcn6nAnAAAAAHnqHdoFN5nBzFA_e4BoOpvG5Onr";

export default function SignUp() {
  const router = useRouter();
  const [fName, setFName] = useState("");
  const [fNameError, setFNameError] = useState(false);
  const [fNameHasNoError, setFNameHasNoError] = useState(false);
  const [lName, setLName] = useState("");
  const [lNameError, setLNameError] = useState(false);
  const [lNameHasNoError, setLNameHasNoError] = useState(false);
  const [email, setEmail] = useState("");
  const [emailError, setEmailError] = useState(false);
  const [emailHasNoError, setEmailHasNoError] = useState(false);
  const [phone, setPhone] = useState("");
  const [phoneError, setPhoneError] = useState(false);
  const [phoneHasNoError, setPhoneHasNoError] = useState(false);
  const [checked, setChecked] = useState(false);
  const [clicked, setClicked] = useState(false);
  const [isInvalid, setIsInvalid] = useState(false);
  const [checkedError, setCheckedError] = useState(false);

  useEffect(() => {
    hasToken(router);

    const loadScriptByURL = (id: any, url: any, callback: any) => {
      const isScriptExist = document.getElementById(id);

      if (!isScriptExist) {
        var script = document.createElement("script");
        script.type = "text/javascript";
        script.src = url;
        script.id = id;
        script.onload = function () {
          if (callback) callback();
        };
        document.body.appendChild(script);
      }

      if (isScriptExist && callback) callback();
    };

    loadScriptByURL(
      "recaptcha-key",
      `https://www.google.com/recaptcha/api.js?render=${SITE_KEY}`,
      function () {}
    );
  }, [router]);

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
            Toast.error("Please try again later.");
          } else {
            Toast.error(data);
          }
        }
      } else {
        Toast.error("Registration failed. Please try again.");
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handleSubmit = async (e: { preventDefault: () => void }) => {
    e.preventDefault();
    fName.trim().length <= 0 && setFNameError(true);
    lName.trim().length <= 0 && setLNameError(true);
    email.trim().length <= 0 && setEmailError(true);
    phone.trim().length <= 0 && setPhoneError(true);
    checked === false && setIsInvalid(true);

    if (
      fNameHasNoError &&
      lNameHasNoError &&
      emailHasNoError &&
      phoneHasNoError &&
      checked
    ) {
      setClicked(true);
      window.grecaptcha.ready(() => {
        window.grecaptcha.execute(SITE_KEY, { action: "submit" }).then(() => {
          register(fName, lName, email, phone);
        });
      });
    } else {
      setClicked(false);
    }
  };
  const handleChecked = (e: any) => {
    if (e.target.checked) {
      setChecked(true);
      setIsInvalid(false);
    } else {
      setChecked(false);
    }
  };

  const register = async (
    fName: string,
    lName: string,
    email: string,
    phone: string
  ) => {
    try {
      const response = await axios.post(`${process.env.api_url}/register`, {
        first_name: fName,
        last_name: lName,
        email: email,
        phone: phone,
      });

      if (response.status === 200) {
        if (response.data.ResponseStatus === "Success") {
          setEmail("");
          setFName("");
          setLName("");
          setClicked(false);
          Toast.success("User Registered Successfully.");
          router.push(`/email-activation?email=${encodeURIComponent(email)}`);
        } else {
          setClicked(false);
          const data = response.data.Message;
          if (data === null) {
            Toast.error("Please try again later.");
          } else {
            Toast.error(data);
          }
        }
      } else {
        setClicked(false);
        const data = response.data.Message;
        if (data === null) {
          Toast.error("Registrarion failed. Please try again.");
        } else {
          Toast.error(data);
        }
      }
    } catch (error) {
      setClicked(false);
      console.error(error);
    }
  };
  return (
    <div className="flex flex-col justify-between min-h-screen">
      <div className="loginWrapper flex items-center justify-center flex-col pt-5">
        <Image src="/logo.png" alt="Logo" width={194} height={100} priority />
        <Typography
          type="h3"
          className="pt-5 pb-[10px] !font-bold text-primary"
        >
          Let&rsquo;s Get Started!
        </Typography>
        <span className="text-sm sm:text-base font-normal text-[#1C1C1C]">
          It will take just a few minutes.
        </span>
        <form
          className="text-start w-full max-w-3xl py-5 px-3 flex flex-col items-center justify-center"
          onSubmit={handleSubmit}
        >
          <div className="w-[300px] lg:w-[356px] pb-4">
            <Text
              label="First Name"
              type="text"
              id="fname"
              name="fname"
              validate
              minChar={3}
              maxChar={50}
              noNumeric
              noSpecialChar
              getValue={(e) => setFName(e)}
              getError={(err) => setFNameHasNoError(err)}
              hasError={fNameError}
              autoComplete="off"
            />
          </div>
          <div className="w-[300px] lg:w-[356px] pb-4">
            <Text
              label="Last Name"
              type="text"
              id="lname"
              name="lname"
              noNumeric
              validate
              minChar={3}
              maxChar={50}
              noSpecialChar
              getValue={(e) => setLName(e)}
              getError={(err) => setLNameHasNoError(err)}
              hasError={lNameError}
              autoComplete="off"
            />
          </div>
          <div className="w-[300px] lg:w-[356px] pb-4">
            <Email
              label="Email"
              type="email"
              id="email"
              name="email"
              validate
              maxChar={100}
              getValue={(e) => setEmail(e)}
              getError={(err) => setEmailHasNoError(err)}
              hasError={emailError}
              autoComplete="off"
            />
          </div>
          <div className="w-[300px] lg:w-[356px] pb-4">
            <Tel
              label="Phone"
              countryCode
              validate
              hasError={phoneError}
              getValue={(e) => setPhone(e)}
              getError={(err) => setPhoneHasNoError(err)}
              autoComplete="off"
            />
          </div>
          <div className="pt-2 pb-9 flex justify-center items-center text-sm lg:text-base">
            <CheckBox
              id="agree"
              label="Agree to all"
              onChange={handleChecked}
              invalid={isInvalid}
              variant="small"
              className="text-[#333333]"
            />
            &nbsp;
            <Link
              href="#"
              className="underline text-sm text-primary font-semibold"
            >
              Terms & Conditions
            </Link>
          </div>
          {clicked ? (
            <Loader size="sm" />
          ) : (
            <Button
              type="submit"
              variant="btn-primary"
              className={`rounded-full !w-[300px] !font-semibold mb-4`}
            >
              SIGN UP
            </Button>
          )}
        </form>
        <div className="socialMediaBox w-[300px] lg:w-[356px] max-w-md border-t border-lightSilver p-3 pt-5 relative my-3 flex flex-col ">
          <Typography
            type="p"
            className="bg-white relative top-[-25px] px-5 max-w-content m-auto text-[#333333]"
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
        <div className="mb-10 text-sm lg:text-base text-[#333333]">
          Already have an account?&nbsp;
          <Link href="/signin" className="text-primary font-semibold underline">
            Sign In
          </Link>
        </div>
      </div>
      <Footer />
    </div>
  );
}
