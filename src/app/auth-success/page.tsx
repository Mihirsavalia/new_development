/* eslint-disable react-hooks/exhaustive-deps */
"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import { Loader, Toast } from "next-ts-lib";
import { hasToken } from "@/utils/commonFunction";
import "next-ts-lib/dist/index.css";

const AuthSuccessPage: React.FC = () => {
  const router = useRouter();
  const [accessToken, setAccessToken] = useState("");
  const [token, setToken] = useState("");
  const [loader, setLoader] = useState(true);

  useEffect(() => {
    hasToken(router);
    const hash = window.location.hash.substring(1);
    const params = new URLSearchParams(hash);

    setAccessToken(params.get("access_token")!);
    setToken(params.get("id_token")!);
  }, []);

  useEffect(() => {
    const sendToken = async () => {
      if (accessToken !== "" && token !== "") {
        // console.log(accessToken);
        // console.log(token);
        try {
          const response = await axios.post(
            `${process.env.api_url}/social-login`,
            {
              SocialLoginType: 1,
              AccessToken: accessToken,
              Token: token,
            }
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
      }
    };
    sendToken();
  }, [accessToken, token]);

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

  return (
    <div className="flex items-center justify-center flex-col pt-5 min-h-screen">
      <Toast position="top_right" />
      {loader && <Loader helperText />}
    </div>
  );
};

export default AuthSuccessPage;
