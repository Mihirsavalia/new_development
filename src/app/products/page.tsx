/* eslint-disable react-hooks/rules-of-hooks */

"use client";
import React, { useEffect, useState } from "react";
import axios from "axios";
import APIcon from "../../assets/Icons/Product Icons/APIcon";
import NavBar from "../../components/Navbar";
import { useRouter } from "next/navigation";
import { Loader, Radio, Typography } from "next-ts-lib";
import "next-ts-lib/dist/index.css";
import { hasNoToken } from "@/utils/commonFunction";
import BiIcon from "@/assets/Icons/Product Icons/BIIcon";

interface ProfileData {
  id: number;
  products: Product[];
}

interface Product {
  [x: string]: unknown;
  name: string;
}
const page: React.FC = () => {
  const router = useRouter();

  useEffect(() => {
    setClicked(true);
    hasNoToken(router);
  }, [router]);

  const [selectedProduct, setSelectedProduct] = useState<string | null>(null);
  const [profileData, setProfileData] = useState<ProfileData | null>(null);
  const [productData, setProductData] = useState([]);
  const [clicked, setClicked] = useState<boolean>(false);

  const getProductData = async () => {
    setClicked(true);
    const token = await localStorage.getItem("token");
    try {
      const config = {
        headers: {
          Authorization: `bearer ${token}`,
        },
      };
      const response = await axios.get(
        `${process.env.api_profile}/product/getproducts`,
        config
      );
      const data = response.data.ResponseData;
      setProductData(data);
      setClicked(false);
    } catch (error) {
      setClicked(false);
      console.error(error);
    }
  };

  useEffect(() => {
    if (profileData) {
      const productSelected = profileData.products.some(
        (product) => product.is_mapped
      );
      if (productSelected) {
        setClicked(false);
        router.push("/profile");
      }
    } else {
      setClicked(false);
    }
  }, [profileData]);

  const productItems = productData.map((product: any, index) => {
    return (
      <div
        className={`w-auto h-auto border rounded-lg ${
          selectedProduct === product.name
            ? "border-primary"
            : "border-lightSilver"
        } hover:border-primary hover:shadow-lg  group cursor-pointer`}
        onClick={() => handleRadioChange(product.name, product.id)}
        key={index}
      >
        <div className="h-8 pt-3 pr-5  flex justify-end">
          <div
            className={`${
              selectedProduct === product.name ? "opacity-100" : "opacity-0"
            } group-hover:opacity-100 inset-0`}
          >
            <label className="group-hover:text-primary">
              <Radio
                id={product.name}
                name="products"
                checked={selectedProduct === product.name}
                onChange={(e: any) => {
                  handleRadioChange(product.name, product.id);
                }}
              />
            </label>
          </div>
        </div>
        <div className="w-auto h-[65px] pb-3 flex justify-center">
          {product.name === "PathQuest BI" && <BiIcon bgColor={"#F4F4F4"} />}
          {product.name === "PathQuest AP" && <APIcon bgColor={"#F4F4F4"} />}
        </div>
        <div className="flex pb-5 justify-center">
          <Typography type="label" className="inline-block text-center">
            {product.name}
          </Typography>
        </div>
      </div>
    );
  });

  const handleRadioChange = async (productName: string, productId: Number) => {
    const token = await localStorage.getItem("token");
    setSelectedProduct(productName);

    try {
      const config = {
        headers: {
          Authorization: `bearer ${token}`,
        },
      };
      const mappedData = {
        userId: profileData?.id,
        productId: productId,
        isMap: true,
      };

      const response = await axios.post(
        `${process.env.api_profile}/product/mapuserproducts`,
        mappedData,
        config
      );

      if (response.status === 200) {
        router.push("/profile");
      }
    } catch (error) {
      console.error(error);
    }
  };

  const globalData = (data: any) => {
    setProfileData(data);
  };

  useEffect(() => {
    hasNoToken(router);
    getProductData();
  }, [router]);

  return (
    <>
      {clicked ? (
        <span className="flex items-center justify-center min-h-screen">
          <Loader helperText />
        </span>
      ) : (
        <>
          <NavBar onData={globalData} />
          <div className="w-auto xs:mx-[30px]  sm:mx-[90px] md:mx-[100px] lg:mx-[138px] py-6 ">
            <Typography type="h4">
              Unleash the Power of Our Top Products - Your Ultimate Solutions!
            </Typography>
            <div className="xs:w-full sm:w-[80%] md:w-[63%] lg:w-[63%] pt-2">
              <Typography type="label" className="inline-block ">
                PathQuest simplifies accounting and financial reporting,
                delivers insights and forecasts, and provides real-time spend
                insights while automating accounts payable invoices and avoiding
                cash flow crises and manual inefficiencies.
              </Typography>
            </div>
          </div>

          <div className="w-auto xs:mx-[30px] xs:mb-[30px] sm:mx-[90px] md:mx-[100px] lg:mx-[138px] grid sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 2xl:grid-cols-4 gap-4">
            {productItems}
          </div>
        </>
      )}
    </>
  );
};
export default page;
