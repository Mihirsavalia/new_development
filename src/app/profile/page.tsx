/* eslint-disable react-hooks/rules-of-hooks */
"use client";

import PMSIcon from "../../assets/Icons/Product Icons/PMSIcon";
import TMSIcon from "../../assets/Icons/Product Icons/TMSIcon";
import { hasNoToken } from "@/utils/commonFunction";
import { Avatar, Loader, Toast, Tooltip, Typography } from "next-ts-lib";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import EditIcon from "../../assets/Icons/EditIcon";
import APIcon from "../../assets/Icons/Product Icons/APIcon";
import ATSIcon from "../../assets/Icons/Product Icons/ATSIcon";
import DMSIcon from "../../assets/Icons/Product Icons/DMSIcon";
import NavBar from "../../components/Navbar";
import BiIcon from "../../assets/Icons/Product Icons/BIIcon";
import DrawerOverlay from "@/components/Drawer/DrawerOverlay";
import Drawer from "@/components/Drawer/Drawer";

export interface ProfileData {
  first_name: string;
  last_name: string;
  phone: string;
  email: string;
  address: string;
  country_id: string;
  country: string;
  state_id: string;
  state: string;
  city_id: string;
  city: string;
  postal_code: string;
  time_zone: string;
  products: Product[];
}

export interface Product {
  name: string;
}

interface toastData {
  statusCode?: number;
  statusMsg?: string;
}

const page: React.FC = () => {
  const router = useRouter();
  const productTitle: string[] = [];
  const [edit, setEdit] = useState<string>("");
  const [isOpen, setOpen] = useState<boolean>(false);
  const [profileData, setProfileData] = useState<ProfileData | null>(null);

  const globalData = (data: any) => {
    setProfileData(data);
  };

  const handleEdit = (arg1: boolean, arg2: string) => {
    setOpen(arg1);
    setEdit(arg2);
  };

  useEffect(() => {
    hasNoToken(router);
  }, [router]);

  const productItems = profileData?.products.map((product: any, index) => {
    return (
      <div
        className={`border py-4 rounded-lg border-lightSilver hover:border-primary hover:shadow-lg group cursor-pointer`}
        key={index}
      >
        <div className="h-[65px] py-1 flex justify-center">
          {product.name === "PathQuest BI" && <BiIcon bgColor={"#F4F4F4"} />}
          {product.name === "PathQuest AP" && <APIcon bgColor={"#F4F4F4"} />}
        </div>
        <div className="flex py-1 justify-center">
          <Typography type="label" className="inline-block text-center">
            {product.name}
          </Typography>
        </div>
      </div>
    );
  });

  return (
    <>
      <DrawerOverlay isOpen={isOpen} handleEdit={handleEdit} />
      <Drawer
        isOpen={isOpen}
        edit={edit}
        handleEdit={handleEdit}
        profileData={profileData}
      />
      {/* Navigation Bar */}
      <NavBar onData={globalData} isFormOpen={isOpen} />
      <div className="flex xs:!flex-col sm:!flex-row md:!flex-row lg:!flex-row pb-5">
        <div className="flex flex-col xs:!w-11/12 sm:!w-2/4 lg:!w-1/4 md:!w-3/6 xl:w-1/4 ">
          <div className="h-auto w-auto flex border my-4 ml-7 border-lightSilver rounded-md">
            <div className="w-full">
              <ul>
                <li className="flex w-full px-5 py-1 ">
                  <div className="flex w-full left-6 border-b border-b-lightSilver">
                    <div className="flex w-full justify-start items-center">
                      <Typography type="h5" className="inline-block">
                        My Profile
                      </Typography>
                    </div>
                    <div
                      className={`flex w-full justify-end items-center ${
                        profileData === null
                          ? "pointer-events-none"
                          : "cursor-default"
                      }`}
                      onClick={() => handleEdit(true, "profile")}
                    >
                      <Tooltip content="Edit Profile" position="top">
                        <EditIcon />
                      </Tooltip>
                    </div>
                  </div>
                </li>
                <li className="flex w-full px-5 py-2 justify-start items-center">
                  {profileData && profileData?.first_name != "" ? (
                    <Avatar
                      imageUrl=""
                      name={`${profileData?.first_name} ${profileData?.last_name}`}
                      variant="large"
                      type="square"
                    />
                  ) : (
                    <Avatar imageUrl="" variant="large" type="square" />
                  )}
                </li>
                <li className="flex w-auto px-5 py-2 justify-start items-center">
                  <Typography
                    type="h6"
                    className="inline-block font-bold uppercase"
                  >
                    PERSONAL DETAILS
                  </Typography>
                </li>
                <li className="flex w-full px-5 py-2 justify-start items-center">
                  <div className="flex flex-col justify-center items-start">
                    <Typography
                      type="h6"
                      className="inline-block text-sm font-light opacity-50"
                    >
                      First Name
                    </Typography>
                    <Typography type="h6" className="inline-block font-thin">
                      {profileData?.first_name}
                    </Typography>
                  </div>
                </li>
                <li className="flex w-full px-5 py-2 justify-start items-center">
                  <div className="flex flex-col justify-center items-start">
                    <Typography
                      type="h6"
                      className="inline-block text-sm font-light opacity-50"
                    >
                      Last Name
                    </Typography>
                    <Typography type="h6" className="inline-block font-thin">
                      {profileData?.last_name}
                    </Typography>
                  </div>
                </li>
                <li className="flex w-full px-5 py-2 justify-start items-center">
                  <div className="flex flex-col justify-center items-start">
                    <Typography
                      type="h6"
                      className="inline-block text-sm font-light opacity-50"
                    >
                      Phone
                    </Typography>
                    <Typography type="h6" className="inline-block font-thin">
                      {profileData?.phone}
                    </Typography>
                  </div>
                </li>
                <li className="flex w-full px-5 py-2 justify-start items-center">
                  <div className="flex flex-col justify-center items-start">
                    <Typography
                      type="h6"
                      className="inline-block text-sm font-light opacity-50"
                    >
                      Email
                    </Typography>

                    <Typography type="h6" className="inline font-thin">
                      {/* <Tooltip content={`${profileData?.email}`} position="top"> */}
                      {/* <div className="truncate w-48"> */}
                      {profileData?.email}
                      {/* </div> */}
                      {/* </Tooltip> */}
                    </Typography>
                  </div>
                </li>
                <li className="flex w-full px-5 pt-1 mt-5">
                  <div className="flex w-full justify-start items-center">
                    <Typography
                      type="h6"
                      className="inline-block font-bold uppercase"
                    >
                      LOCATION DETAILS
                    </Typography>
                  </div>
                </li>
                <li className="flex w-full px-5 py-2 justify-start items-center">
                  <div className="flex flex-col justify-center items-start">
                    <Typography
                      type="h6"
                      className="inline-block text-sm font-light opacity-50"
                    >
                      Address
                    </Typography>
                    <Typography type="h6" className="inline-block font-thin">
                      {profileData?.address}
                    </Typography>
                  </div>
                </li>
                <li className="flex w-full px-5 py-2 justify-start items-center">
                  <div className="flex flex-col justify-center items-start">
                    <Typography
                      type="h6"
                      className="inline-block text-sm font-light opacity-50"
                    >
                      Country
                    </Typography>
                    <Typography type="h6" className="inline-block font-thin">
                      {profileData?.country}
                    </Typography>
                  </div>
                </li>
                <li className="flex w-full px-5 py-2 justify-start items-center">
                  <div className="flex flex-col justify-center items-start">
                    <Typography
                      type="h6"
                      className="inline-block text-sm font-light opacity-50"
                    >
                      State
                    </Typography>
                    <Typography type="h6" className="inline-block font-thin">
                      {profileData?.state}
                    </Typography>
                  </div>
                </li>
                <li className="flex w-full px-5 py-2 justify-start items-center">
                  <div className="flex flex-col justify-center items-start">
                    <Typography
                      type="h6"
                      className="inline-block text-sm font-light opacity-50"
                    >
                      City
                    </Typography>
                    <Typography type="h6" className="inline-block font-thin">
                      {profileData?.city}
                    </Typography>
                  </div>
                </li>
                <li className="flex w-full px-5 py-2 justify-start items-center">
                  <div className="flex flex-col justify-center items-start">
                    <Typography
                      type="h6"
                      className="inline-block text-sm font-light opacity-50"
                    >
                      Postal Code
                    </Typography>
                    <Typography type="h6" className="inline-block font-thin">
                      {profileData?.postal_code}
                    </Typography>
                  </div>
                </li>
                <li className="flex w-full px-5 pt-2 pb-5 justify-start items-center ">
                  <div className="flex flex-col justify-center items-start">
                    <Typography
                      type="h6"
                      className="inline-block text-sm font-light opacity-50"
                    >
                      Timezone
                    </Typography>
                    <Typography type="h6" className="inline-block font-thin">
                      {profileData?.time_zone}
                    </Typography>
                  </div>
                </li>
              </ul>
            </div>
          </div>
          <div className="h-auto w-auto flex border ml-7 border-lightSilver rounded-md bg-white ">
            <ul>
              <li className="flex w-full px-5 py-1">
                <div className="flex w-full border-b border-b-lightSilver">
                  <div className="flex w-full justify-start items-center">
                    <Typography type="h5" className="inline-block uppercase">
                      Profile Password
                    </Typography>
                  </div>
                  <div
                    className="flex justify-end items-center"
                    onClick={() => {
                      handleEdit(true, "password");
                    }}
                  >
                    <Tooltip content="Edit Profile" position="top">
                      <EditIcon />
                    </Tooltip>
                  </div>
                </div>
              </li>
              <li className="flex w-full px-5 py-2">
                <div className="flex w-full justify-start items-center">
                  <div className="flex justify-center items-start">
                    <Typography
                      type="h6"
                      className="inline-block text-sm font-light opacity-50"
                    >
                      Changing your password will sign you out of all your
                      devices. You will need to enter your new password on all
                      your devices.
                    </Typography>
                  </div>
                </div>
              </li>
            </ul>
          </div>
        </div>
        <div className="flex flex-col w-3/4 xs:w-full sm:!w-3/4 mt-4">
          <div className="w-auto h-auto mt-4 ml-5 xs:!ml-7">
            <Typography type="h5" className="inline-block font-semibold">
              Your selected apps
            </Typography>
          </div>

          <div className="w-auto h-auto grid grid-cols-3 grid-rows-1 gap-5 ml-5 my-5 xs:grid-cols-1 sm:grid-cols-1 md:grid-cols-3 xs:mx-7">
            {productItems}
          </div>
          <div className="w-auto h-auto mt-1 ml-5 xs:!ml-7">
            <Typography type="h5" className="inline-block font-semibold">
              Discover more apps
            </Typography>
          </div>
          <div className="grid grid-cols-3 gap-5 ml-5 my-5 xs:grid-cols-1 sm:grid-cols-1 md:grid-cols-3  xs:mx-7">
            <div
              className={`border py-4 rounded-lg border-lightSilver hover:border-primary hover:shadow-lg group cursor-pointer`}
            >
              <div className="h-[65px] py-1 flex justify-center">
                <DMSIcon bgColor={"#F4F4F4"} />
              </div>
              <div className="flex py-1 justify-center">
                <Typography type="label" className="inline-block text-center">
                  Document Management System
                </Typography>
              </div>
            </div>

            <div
              className={`border py-4 rounded-lg border-lightSilver hover:border-primary hover:shadow-lg group cursor-pointer`}
            >
              <div className="h-[65px] py-1 flex justify-center">
                <PMSIcon bgColor={"#F4F4F4"} />
              </div>
              <div className="flex py-1 justify-center">
                <Typography type="label" className="inline-block text-center">
                  Project Management System
                </Typography>
              </div>
            </div>
          </div>
          <div className="grid grid-cols-3 gap-5 ml-5 xs:grid-cols-1 sm:grid-cols-1 md:grid-cols-3 min-[767px]:grid-cols-2 xs:mx-7">
            <div
              className={`border py-4 rounded-lg border-lightSilver hover:border-primary hover:shadow-lg group cursor-pointer`}
            >
              <div className="h-[65px] py-1 flex justify-center">
                <ATSIcon bgColor={"#F4F4F4"} />
              </div>
              <div className="flex py-1 justify-center">
                <Typography type="label" className="inline-block text-center">
                  Applicant Tracking System
                </Typography>
              </div>
            </div>

            <div
              className={`border py-4 rounded-lg border-lightSilver hover:border-primary hover:shadow-lg group cursor-pointer`}
            >
              <div className="h-[65px] py-1 flex justify-center">
                <TMSIcon bgColor={"#F4F4F4"} />
              </div>
              <div className="flex py-1 justify-center">
                <Typography type="label" className="inline-block text-center">
                  Time Management System
                </Typography>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default page;
