/* eslint-disable react-hooks/exhaustive-deps */
"use client";

import React, { useState, useEffect } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { Loader, Toast, Typography } from "next-ts-lib";
import "next-ts-lib/dist/index.css";
import axios from "axios";
import { hasToken } from "@/utils/commonFunction";

const AuthSuccessPage: React.FC = () => {
  const router = useRouter();
  const getAccessCode = useSearchParams();
  const [accessToken, setAccessToken] = useState<string>("");
  const [loader, setLoader] = useState(true);

  const sendToken = async () => {
    if (accessToken !== "") {
      try {
        const response = await axios.get(
          `${process.env.api_url}/qbo-signin?qbocode=${accessToken}`
        );

        if (response.status === 200) {
          if (response.data.ResponseStatus === "Success") {
            setLoader(false);
            const data = response.data.Message;
            if (data === null) {
              Toast.success("Success", "You are successfully logged in.");
            } else {
              Toast.success("Success", data);
            }
            localStorage.setItem("token", response.data.ResponseData.Token);

            //api call to check if product selected
            hasProduct(response.data.ResponseData.Token);
          } else {
            setLoader(false);
            const data = response.data.Message;
            if (data === "invalid request!") {
              Toast.error(
                data || "Failed please try again later.",
                "please try after sometime."
              );
              router.push("/signin");
            } else {
              const data = response.data.Message;
              if (data === null) {
                Toast.error("Error", "Failed please try again later.");
              } else {
                Toast.error("Error", data);
              }
              router.push("/signin");
            }
          }
        } else {
          setLoader(false);
          const data = response.data.Message;
          if (data === null) {
            Toast.error("Error", "Registration failed. Please try again.");
          } else {
            Toast.error("Error", data);
          }
        }
      } catch (error) {
        setLoader(false);
        console.error(error);
      }
    } else {
      // Toast.warning("Please wait while we are loading your content");
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

  useEffect(() => {
    hasToken(router);
    const params = getAccessCode.get("code");
    if (params) {
      setAccessToken(params);
    }
  }, []);

  useEffect(() => {
    if (accessToken !== "") {
      sendToken();
    }
  }, [accessToken]);

  return (
    <div className="flex items-center justify-center flex-col pt-5 min-h-screen">
      {loader && (
        <div className="flex flex-col gap-2 items-center justify-center min-h-screen">
          <Loader helperText />
        </div>
      )}
    </div>
  );
};

export default AuthSuccessPage;
