/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react-hooks/rules-of-hooks */

"use client";
import Link from "next/link";
import axios from "axios";
import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import CandyBox from "../assets/Icons/CandyBox";
import HelpIcon from "../assets/Icons/HelpIcon";
import PQLogo from "../assets/Icons/PQLogo";
import APIcon from "../assets/Icons/Product Icons/APIcon";
import HelpVector from "../assets/Icons/VectorHelp";
import LogoutVector from "../assets/Icons/VectorLogout";
import NewVector from "../assets/Icons/VectorNew";
import { Avatar, Radio, Typography, Tooltip } from "next-ts-lib";
import "next-ts-lib/dist/index.css";
import BiIcon from "@/assets/Icons/Product Icons/BIIcon";

interface ProfileData {
  id: number;
  first_name: string;
  last_name: string;
  phone: string;
  email: string;
  address: string;
  country_id: string;
  state_id: string;
  city_id: string;
  postal_code: string;
  time_zone: string;
  products: Product[];
}

interface Product {
  name: string;
}

const page = ({ onData }: any) => {
  const router = useRouter();

  const toggleRef = useRef<HTMLDivElement>(null);

  const [toggleCandyBoxChange, setToggleCandyBoxChange] =
    useState<boolean>(false);
  const [toggleHelpChange, setToggleHelpChange] = useState<boolean>(false);
  const [toggleProfileChange, setToggleProfileChange] =
    useState<boolean>(false);
  const [selectedProduct, setSelectedProduct] = useState<string | null>(null);
  const [profileData, setProfileData] = useState<ProfileData | null>(null);
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [isChecked, setIsChecked] = useState<boolean>(false);

  const getProfileData = async () => {
    const token = localStorage.getItem("token");

    try {
      const config = {
        headers: {
          Authorization: `bearer ${token}`,
        },
      };
      const response = await axios.get(
        `${process.env.api_profile}/user/getuserprofile`,
        config
      );
      const data = response.data.ResponseData;
      setProfileData(data);
      onData(data);
    } catch (error) {
      console.error(error);
    }
  };

  const handleRadioChange = (productName: string, isMapped: boolean) => {
    setSelectedProduct(productName);
    setIsChecked(isMapped);
  };

  const handleToggleChange = (productId: string) => {
    if (productId === "CandyBox") {
      setToggleCandyBoxChange(!toggleCandyBoxChange);
      setToggleHelpChange(false);
      setToggleProfileChange(false);
    } else if (productId === "Help") {
      setToggleHelpChange(!toggleHelpChange);
      setToggleCandyBoxChange(false);
      setToggleProfileChange(false);
    } else if (productId === "ProfileMenu") {
      setToggleProfileChange(!toggleProfileChange);
      setToggleHelpChange(false);
      setToggleCandyBoxChange(false);
    }
  };

  const productRadioData = profileData?.products.map((product: any, index) => {
    return (
      <div
        className="pt-3 flex justify-center"
        key={index}
        onClick={() => handleRadioChange(product.name, product.is_mapped)}
      >
        <div
          className={`text-sm -ml-2 ${
            selectedProduct === `${product.name}` ? "text-primary" : ""
          }`}
        >
          <Radio
            id={`${product.name}`}
            name="products"
            label={`${product.name}`}
            onChange={() => {
              handleRadioChange(product.name, product.is_mapped);
            }}
            defaultChecked={product.is_mapped}
          />
        </div>
      </div>
    );
  });

  const productItems = profileData?.products.map((product: any, index) => {
    return (
      <Link href="/products" key={index}>
        <li
          className={`flex w-full px-3 py-2 ${
            index < profileData.products.length - 1
              ? "border-b border-b-lightSilver"
              : ""
          }  hover:bg-lightGray cursor-pointer`}
          key={index}
        >
          {product.name === "PathQuest BI" && <BiIcon bgColor={"white"} />}
          {product.name === "PathQuest AP" && <APIcon bgColor={"white"} />}
          <div className="flex justify-center items-center ml-2 cursor-pointer">
            <Typography
              type="label"
              className="inline-block text-xs cursor-pointer"
            >
              {product.name}
            </Typography>
          </div>
        </li>
      </Link>
    );
  });

  const clickOutside = () => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        toggleRef.current &&
        !toggleRef.current.contains(event.target as Node)
      ) {
        setToggleCandyBoxChange(false);
        setToggleHelpChange(false);
        setToggleProfileChange(false);
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  };

  const handleResize = () => {
    setIsOpen(false);
    setToggleCandyBoxChange(false);
    setToggleHelpChange(false);
    setToggleProfileChange(false);
  };

  const logout = () => {
    localStorage.removeItem("token");
    router.push("/signin");
  };

  useEffect(() => {
    getProfileData();
    clickOutside();
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <div>
      <nav className="w-full  flex items-center justify-between flex-wrap p-2 border-b border-b-lightSilver">
        <div className="flex w-auto items-center flex-shrink-0 text-white ml-3 cursor-pointer">
          <PQLogo />
        </div>

        <div className="xs:!hidden xsm:!flex w-auto flex-shrink-0  lg:flex lg:items-center lg:w-auto justify-end flex gap-1.5 mr-4 ">
          <div
            className="w-8 h-8 flex items-center justify-center cursor-pointer"
            onClick={() => handleToggleChange("CandyBox")}
          >
            <Tooltip content="PathQuest Apps" position="left">
              <CandyBox />
            </Tooltip>
          </div>
          <div
            className="w-8 h-8 flex items-center justify-center cursor-pointer"
            onClick={() => handleToggleChange("Help")}
          >
            <div>
              <HelpIcon onOpen={toggleHelpChange} />
            </div>
          </div>
          <div
            className="w-8 h-8 flex items-center justify-center cursor-pointer"
            onClick={() => handleToggleChange("ProfileMenu")}
          >
            {profileData && profileData?.first_name != "" ? (
              <Avatar
                name={`${profileData?.first_name} ${profileData?.last_name}`}
                variant="small"
              />
            ) : (
              <Avatar imageUrl="" variant="small" />
            )}
          </div>
        </div>

        {isOpen ? (
          <div
            className=" flex absolute z-50 right-2 top-14 -mt-3 justify-center items-center w-auto h-auto px-4 py-2 border border-lightSilver rounded-md bg-white shadow-md"
            ref={toggleRef}
          >
            <div
              className="flex flex-col justify-center items-start mr-2"
              onClick={() => handleToggleChange("CandyBox")}
            >
              <CandyBox />
            </div>
            <div
              className="flex flex-col justify-center items-start mx-2"
              onClick={() => handleToggleChange("Help")}
            >
              <HelpIcon onOpen={toggleHelpChange} />
            </div>
            <div
              className="flex flex-col justify-center items-start ml-2"
              onClick={() => handleToggleChange("ProfileMenu")}
            >
              {profileData && profileData?.first_name === "" ? (
                <Avatar
                  name={`${profileData?.first_name} ${profileData?.last_name}`}
                  variant="small"
                />
              ) : (
                <Avatar imageUrl="" variant="small" />
              )}
            </div>
          </div>
        ) : (
          " "
        )}

        <div className="w-auto h-auto hidden xs:!flex xsm:!hidden">
          <button
            className="flex flex-col h-8 w-8 rounded justify-center items-center group "
            onClick={() => {
              setIsOpen(!isOpen);
            }}
          >
            <div
              className={`h-1 w-5 my-0.5 rounded-full bg-[#333333] transition ease transform duration-300 ${
                isOpen
                  ? "rotate-45 translate-y-2 opacity-50 group-hover:opacity-100"
                  : "opacity-50 group-hover:opacity-100"
              }`}
            />
            <div
              className={`h-1 w-5 my-0.5 rounded-full bg-[#333333] transition ease transform duration-300 ${
                isOpen ? "opacity-0" : "opacity-50 group-hover:opacity-100"
              }`}
            />
            <div
              className={`h-1 w-5 my-0.5 rounded-full bg-[#333333] transition ease transform duration-300 ${
                isOpen
                  ? "-rotate-45 -translate-y-2 opacity-50 group-hover:opacity-100"
                  : "opacity-50 group-hover:opacity-100"
              }`}
            />
          </button>
        </div>
      </nav>

      {/* CandyBox List Group */}
      <div
        className={`flex absolute z-50 ${
          isOpen && "top-24 right-4"
        } right-24 -mt-3`}
        ref={toggleRef}
      >
        <div
          className={`${
            toggleCandyBoxChange
              ? "visible flex justify-center items-center"
              : "hidden"
          } w-fit h-auto p-4 border border-lightSilver rounded-md bg-white shadow-md`}
        >
          <div className="w-52 h-auto">
            <ul className="w-52">{productItems}</ul>
          </div>
        </div>
      </div>

      {/* Help List Group */}
      <div
        className={`flex absolute z-50 ${
          isOpen && "top-24 right-4"
        } right-16 -mt-3 `}
        ref={toggleRef}
      >
        <div
          className={`${
            toggleHelpChange
              ? "visible flex justify-center items-center"
              : "hidden"
          } w-fit h-auto py-2 border border-lightSilver rounded-md bg-white shadow-md`}
        >
          <div className="w-40 h-auto">
            <ul className="w-40">
              <li className="flex w-full h-9 px-3 hover:bg-lightGray">
                <div className="flex justify-center items-center ">
                  <NewVector />
                </div>
                <div className="flex justify-center items-center ml-2">
                  <Typography type="label" className="inline-block text-xs">
                    What&rsquo;s new
                  </Typography>
                </div>
              </li>
              <li className="flex w-full h-9 px-3 hover:bg-lightGray">
                <div className="flex justify-center items-center ">
                  <HelpVector />
                </div>
                <div className="flex justify-center items-center ml-2">
                  <Typography type="label" className="inline-block text-xs">
                    Help on this page
                  </Typography>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Profile Menu List Group */}
      <div
        className={`flex absolute z-50 ${
          isOpen && "top-24 right-4"
        } right-4 -mt-3`}
        ref={toggleRef}
      >
        <div
          className={`${
            toggleProfileChange
              ? "visible flex justify-center items-center"
              : "hidden"
          } w-fit h-auto pt-4 border border-lightSilver rounded-md bg-white shadow-md`}
        >
          <div className="w-[220px] h-auto">
            <ul className="w-[220px]">
              <li className="flex w-full px-3 pt-2 pb-3 border-b  border-b-lightSilver">
                <div className="flex flex-col justify-center items-start ml-2">
                  <Typography
                    type="label"
                    className="inline-block text-sm font-light opacity-60"
                  >
                    Signed in as
                  </Typography>
                  <Typography
                    type="label"
                    className="inline-block text-base font-semibold"
                  >
                    {profileData?.first_name} {profileData?.last_name}
                  </Typography>
                </div>
              </li>
              <Link href="/profile">
                <li className="flex w-auto h-12 px-3 py-2 border-b border-b-lightSilver hover:bg-lightGray hover:text-primary">
                  <div className="flex justify-center items-center ml-2">
                    <Typography
                      type="label"
                      className="inline-block text-sm font-normal cursor-pointer"
                    >
                      My Profile
                    </Typography>
                  </div>
                </li>
              </Link>
              <li className="flex w-auto h-12 px-3 py-2 border-b border-b-lightSilver hover:bg-lightGray hover:text-primary">
                <div className="flex justify-center items-center ml-2 ">
                  <Typography
                    type="label"
                    className="inline-block text-sm font-normal cursor-pointer"
                  >
                    Manage User
                  </Typography>
                </div>
              </li>
              <li className="flex w-full px-3 pt-2 pb-3 border-b  border-b-lightSilver">
                <div className="flex flex-col justify-center items-start ml-2">
                  <Typography
                    type="label"
                    className="inline-block text-base font-semibold"
                  >
                    Default Settings
                  </Typography>
                  {productRadioData}
                </div>
              </li>
              <li className="flex w-full h-12 px-3 hover:bg-lightGray rounded-b-md select-none">
                <div className="flex justify-center items-center ml-3">
                  <LogoutVector />
                </div>
                <div
                  className="flex justify-center items-center ml-2 font-normal select-none"
                  onClick={() => logout()}
                >
                  <Typography
                    type="label"
                    className="inline-block text-sm font-normal cursor-pointer hover:font-bold hover:text-[#fb2424]"
                  >
                    Logout
                  </Typography>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default page;
