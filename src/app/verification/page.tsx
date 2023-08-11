"use client";
import Image from "next/image";
import { useState, useEffect } from "react";
import axios from "axios";
import { Button, Alert, Typography, Toast, Loader } from "next-ts-lib";
import "next-ts-lib/dist/index.css";
const TIMER_DURATION = 120;
import Footer from "@/components/Footer";
import { useSearchParams, useRouter } from "next/navigation";
import "./index.css";
import { hasToken } from "@/utils/commonFunction";

export default function OTP() {
  const router = useRouter();
  const Email = useSearchParams();
  const email = Email.get("email");
  const [otp, setOtp] = useState<string[]>(Array.from({ length: 6 }, () => ""));
  const [alertVisible, setAlertVisible] = useState(false);
  const [showEmailInfo, setShowEmailInfo] = useState(true);
  const [isValidationError, setIsValidationError] = useState(false);
  const [remainingTime, setRemainingTime] = useState<number>(TIMER_DURATION);
  const [isTimerActive, setIsTimerActive] = useState(true);
  const [clicked, setClicked] = useState(false);

  useEffect(() => {
    hasToken(router);
  }, [router]);

  const handleChange = (
    event: React.ChangeEvent<HTMLInputElement>,
    index: number
  ): void => {
    const { value } = event.target;
    setIsValidationError(false);

    if (value.length === 1) {
      const newOtp = [...otp];
      newOtp[index] = value;
      setOtp(newOtp);
      if (value !== "" && index < 5) {
        const nextInput = document.querySelector<HTMLInputElement>(
          `.otp__field__${index + 2}`
        );
        if (nextInput) {
          nextInput.focus();
        }
      } else if (value === "" && index > 0) {
        const previousInput = document.querySelector<HTMLInputElement>(
          `.otp__field__${index}`
        );
        if (previousInput) {
          previousInput.focus();
        }
      }
    } else if (value.length === 6) {
      const newOtp = value.split("");
      setOtp(newOtp);
    }
  };

  const handleKeyDown = (
    event: React.KeyboardEvent<HTMLInputElement>,
    index: number
  ): void => {
    if (event.key === "Backspace") {
      const newOtp = [...otp];
      newOtp[index] = "";
      setOtp(newOtp);
      if (index > 0) {
        const previousInput = document.querySelector<HTMLInputElement>(
          `.otp__field__${index}`
        );
        if (previousInput) {
          previousInput.value = "";
          previousInput.focus();
        }
      }
    } else {
      const { value } = event.target as HTMLInputElement;
      if (value.length === 1) {
        const newOtp = [...otp];
        newOtp[index] = value;
        setOtp(newOtp);
        if (value !== "" && index < 3) {
          const nextInput = document.querySelector<HTMLInputElement>(
            `.otp__field__${index + 2}`
          );
          if (nextInput) {
            nextInput.focus();
          }
        }
      }
    }
  };

  const handleResendOTP = () => {
    if (!isTimerActive) {
      setShowEmailInfo(false);
      setShowEmailInfo(true);
      setAlertVisible(true);
      setOtp(Array.from({ length: 6 }, () => ""));
      setTimeout(() => {
        setAlertVisible(false);
      }, 3000);
      const requestEmail = {
        email: email,
      };

      axios
        .post(`${process.env.api_url}/generateotp`, requestEmail)
        .then((response) => {
          if (response.status === 200) {
            if (response.data.ResponseStatus === "Success") {
              router.push("/verification");
              setRemainingTime(120);
              setIsTimerActive(true);
            } else {
              const data = response.data.Message;
              if (data === null) {
                Toast.error("Data does not match.");
              } else {
                Toast.error(data);
              }
            }
          }
        })
        .catch((error) => {
          console.error(error);
        });
    }
  };

  const handleVerify = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (otp.includes("")) {
      setIsValidationError(true);
    } else {
      setClicked(true);

      const requestData = {
        otp: otp.join(""),
        email: email,
      };
      axios
        .post(`${process.env.api_url}/validateotp`, requestData)
        .then((response) => {
          if (response.status === 200) {
            if (response.data.ResponseStatus === "Success") {
              localStorage.setItem("token", response.data.ResponseData.Token);
              const data = response.data.Message;
              if (data === null) {
                Toast.success("Success", "Logged in successfully.");
              } else {
                Toast.success("Success", data);
              }

              //api call to check if product selected
              hasProduct(response.data.ResponseData.Token);
            } else {
              setIsValidationError(true);
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
          }
        })
        .catch((error) => {
          setClicked(false);
          console.error(error);
        });
    }
  };

  const hasProduct = async (token: any) => {
    await axios
      .get(`${process.env.api_profile}/user/getuserprofile`, {
        headers: {
          Authorization: `bearer ${token}`,
        },
      })
      .then((res) => {
        if (
          res.data.ResponseData.products.some(
            (product: any) => product.is_mapped
          )
        ) {
          router.push("/profile");
        } else {
          router.push("/products");
        }
      });
  };

  const handleKeyPress = (
    event: React.KeyboardEvent<HTMLInputElement>
  ): void => {
    const { key } = event;
    if (key === "e" || key === "-" || key === "+") {
      event.preventDefault();
    }
    if (!/^\d$/.test(key)) {
      event.preventDefault();
    }
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      if (remainingTime > 0) {
        setRemainingTime((prevTime) => prevTime - 1);
      } else {
        setIsTimerActive(false);
      }
    }, 1000);

    return () => {
      clearTimeout(timer);
    };
  }, [remainingTime]);

  useEffect(() => {
    const firstInput =
      document.querySelector<HTMLInputElement>(".otp__field__1");
    if (firstInput) {
      firstInput.focus();
    }
  }, []);

  const minutes = Math.floor(remainingTime / 60);
  const seconds = remainingTime % 60;

  return (
    <div className="flex flex-col justify-between min-h-screen">
      <div className="flex flex-col px-4 items-center justify-center pt-5">
        <Image src="/logo.png" alt="Logo" width={194} height={100} priority />
        <Toast position="top_right" />

        <Typography type="h4" className="pt-10 pb-2 font-bold text-center">
          Please enter the One-Time Password to verify your account
        </Typography>

        {showEmailInfo && (
          <>
            <Typography type="h5" className="!font-light pt-4 text-center">
              A One-Time Password has been sent to
            </Typography>
            <span className="font-bold text-sm">{email}</span>
          </>
        )}

        <form
          className="text-start w-full max-w-md py-4 flex flex-col items-center justify-center"
          onSubmit={handleVerify}
        >
          <div className="pb-4">
            <div className="flex flex-col justify-center items-center">
              <div className="otp-input-fields">
                {otp.map((value, index) => (
                  <input
                    key={index}
                    type="number"
                    className={`otp__field__${index + 1} ${
                      value ? "filled" : ""
                    } ${isValidationError && (value || !value) ? "error" : ""}`}
                    value={value}
                    onChange={(event) => handleChange(event, index)}
                    onKeyDown={(event) => handleKeyDown(event, index)}
                    onKeyPress={handleKeyPress}
                  />
                ))}
              </div>

              <div className="w-80 -mr-9 flex justify-end sm:mt-0">
                <p className="text-gray-400">
                  {minutes.toString().padStart(2, "0")}:
                  {seconds.toString().padStart(2, "0")}
                </p>
              </div>
            </div>
          </div>
          {clicked ? (
            <div className="flex justify-center w-full">
              <Loader size="sm" />
            </div>
          ) : (
            <Button
              type="submit"
              variant="btn-primary"
              className="rounded-full font-bold !w-[370px]"
            >
              VERIFY
            </Button>
          )}
        </form>

        <div className="flex py-2">
          <Typography type="h6" className="font-bold text-gray-400">
            If code not received, click link to
          </Typography>

          <div className="flex">
            <span
              className={`font-semibold text-primary ml-2 text-sm underline cursor-pointer ${
                isTimerActive ? "opacity-50 cursor-not-allowed" : ""
              }`}
              onClick={handleResendOTP}
            >
              Resend OTP
            </span>
          </div>
        </div>
        <span className="flex flex-col w-50 justify-items-center">
          {alertVisible && (
            <Alert
              variant="info"
              message="We have resend the OTP to your registered email address"
            />
          )}
        </span>
      </div>
      <Footer />
    </div>
  );
}
