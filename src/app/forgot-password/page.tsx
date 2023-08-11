"use client";
import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Button, Loader, Email, Toast, Typography } from "next-ts-lib";
import BackArrow from "../../assets/Icons/BackArrow";
import "next-ts-lib/dist/index.css";
import Footer from "@/components/Footer";
import axios from "axios";

export default function ForgetPassword() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [emailHasNoError, setEmailHasNoError] = useState(false);
  const [error, setError] = useState(false);
  const [clicked, setClicked] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      router.push("/profile");
    }
  }, [router]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (email.trim() === "") {
      setError(true);
    } else {
      setError(false);
    }
    if (emailHasNoError) {
      setClicked(true);
      try {
        const response = await axios.post(
          `${process.env.api_url}/forgotpassword`,
          {
            email: email,
          }
        );

        if (response.status === 200) {
          if (response.data.ResponseStatus === "Success") {
            setClicked(false);
            const data = response.data.Message;
            if (data === null) {
              Toast.success(
                "Success",
                "Password reset link sent successfully."
              );
            } else {
              Toast.success("Success", data);
            }
            router.push(`/forgot-confirm/?email=${email}`);
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
      <div className="forgetWrapper flex items-center flex-col pt-5">
        <Image src="/logo.png" alt="Logo" width={194} height={100} priority />

        <Typography type="h3" className="pt-14 pb-2 font-bold">
          Forgot Password
        </Typography>
        <form
          className="text-start w-full max-w-md py-5 px-3 flex flex-col items-center justify-center"
          onSubmit={handleSubmit}
        >
          <div className="pb-2 w-[300px] lg:w-[356px]">
            <Email
              label="Email"
              type="email"
              id="email"
              name="email"
              validate
              getValue={(e) => setEmail(e)}
              getError={(err) => setEmailHasNoError(err)}
              hasError={error}
              autoComplete="off"
            />
          </div>

          {clicked ? (
            <Loader size="sm" />
          ) : (
            <Button
              type="submit"
              variant="btn-primary"
              className="rounded-full !font-semibold mt-[20px] !w-[300px]"
            >
              SEND EMAIL
            </Button>
          )}

          <div className="backLoignWrapper pt-5 flex justify-center">
            <Link href="signin">
              <div className="backArrow items-center justify-center flex">
                <BackArrow />
                <div className="ml-2.5">
                  <Typography
                    type="text"
                    className="!text-[14px] !font-normal text-primary"
                  >
                    Back to Login
                  </Typography>
                </div>
              </div>
            </Link>
          </div>
        </form>
      </div>
      <Footer />
    </div>
  );
}
