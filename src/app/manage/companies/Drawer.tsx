import {
  Avatar,
  Button,
  Close,
  Email,
  Select,
  Tel,
  Text,
  Toast,
} from "next-ts-lib";
import React, { useEffect, useState } from "react";
import EditIcon from "@/assets/Icons/EditIcon";
import axios from "axios";
import router from "next/router";

interface DrawerProps {
  onOpen: boolean;
  onClose: () => void;
  hasEditId: any;
  CompanyData?: any[] | null;
  accountingTool: number | null | undefined;
  getCompanyList: any;
}

const EntityTypeList = [
  { label: "Profit Organization", value: 1 },
  { label: "Non-profit Organization", value: 2 },
];

const Drawer: React.FC<DrawerProps> = ({
  onOpen,
  onClose,
  hasEditId,
  CompanyData,
  accountingTool,
  getCompanyList,
}: any) => {
  const [Id, setId] = useState(0);
  const [companyName, setCompanyName] = useState("");
  const [companyNameError, setCompanyNameError] = useState(false);
  const [companyNameHasError, setCompanyNameHasError] = useState(false);
  const [entityType, setEntityType] = useState(0);
  const [entityTypeError, setEntityTypeError] = useState(false);
  const [entityTypeHasError, setEntityTypeHasError] = useState(false);
  const [address, setAddress] = useState("");
  const [addressError, setAddressError] = useState(false);
  const [addressHasError, setAddressHasError] = useState(false);
  const [country, setCountry] = useState(0);
  const [countryError, setCountryError] = useState(false);
  const [countryHasError, setCountryHasError] = useState(false);
  const [state, setState] = useState(0);
  const [stateError, setStateError] = useState(false);
  const [stateHasError, setStateHasError] = useState(false);
  const [city, setCity] = useState(0);
  const [cityError, setCityError] = useState(false);
  const [cityHasError, setCityHasError] = useState(false);
  const [zipCode, setZipCode] = useState("");
  const [zipCodeError, setZipCodeError] = useState(false);
  const [zipCodeHasError, setZipCodeHasError] = useState(false);
  const [phone, setPhone] = useState("");
  const [phoneError, setPhoneError] = useState(false);
  const [phoneHasError, setPhoneHasError] = useState(false);
  const [email, setEmail] = useState("");
  const [emailError, setEmailError] = useState(false);
  const [emailHasError, setEmailHasError] = useState(false);
  const [deletedFile, setDeletedFile] = useState("");
  const [deletedFileError, setDeletedFileError] = useState(false);
  const [deletedFileHasError, setDeletedFileHasError] = useState(false);
  const [accountToolCompanyId, setAccountToolCompanyId] = useState();
  const [countryDropDownData, setCountryDropDownData] = useState([]);
  const [stateDropDownData, setStateDropDownData] = useState([]);
  const [cityDropDownData, setCityDropDownData] = useState([]);
  const [imagePreview, setImagePreview] = useState<string>("");
  const [binaryImage, SetBinaryImage] = useState<any>("");

  useEffect(() => {
    if (CompanyData) {
      setCompanyName(CompanyData.Name);
      CompanyData.Name !== undefined &&
        CompanyData.Name !== null &&
        CompanyData.Name.length > 0 &&
        setCompanyNameHasError(true);
      setAccountToolCompanyId(CompanyData.AccToolCompanyId);
      setEntityType(CompanyData.EntityType);
      CompanyData.EntityType > 0 && setEntityTypeHasError(true);
      setAddress(CompanyData.Address);
      CompanyData.Address !== undefined &&
        CompanyData.Address !== null &&
        CompanyData.Address.length > 0 &&
        setAddressHasError(true);
      setCountry(CompanyData.CountryId);
      CompanyData.CountryId > 0 && setCompanyNameHasError(true);
      setState(CompanyData.StateId);
      CompanyData.StateId > 0 && setStateHasError(true);
      setCity(CompanyData.CityId);
      CompanyData.CityId > 0 && setCityHasError(true);
      setZipCode(CompanyData.ZipCode);
      CompanyData.ZipCode !== undefined &&
        CompanyData.ZipCode !== null &&
        CompanyData.ZipCode.length > 0 &&
        setZipCodeHasError(true);
      setPhone(CompanyData.Phone);
      CompanyData.Phone !== undefined &&
        CompanyData.Phone !== null &&
        CompanyData.Phone.length > 0 &&
        setPhoneHasError(true);
      setEmail(CompanyData.Email);
      CompanyData.Email !== undefined &&
        CompanyData.Email !== null &&
        CompanyData.Email.length > 0 &&
        setEmailHasError(true);
      // setDeletedFile(CompanyData.DeletedFile);
    }
  }, [CompanyData]);

  // Get By Company ID
  const getCompanyListById = async () => {
    try {
      const accessToken = await localStorage.getItem("token");
      const headers = {
        Authorization: accessToken,
      };

      const response = await axios.get(
        `${process.env.base_url}/company/getbyid?companyId=${hasEditId}`,
        { headers: headers }
      );

      if (response.status === 200) {
        const responseData = response.data.ResponseData;
        setId(responseData.Id);
        setCompanyName(responseData.Name);
        responseData.Name.length > 0 && setCompanyNameHasError(true);
        setAccountToolCompanyId(responseData.AccToolCompanyId);
        setEntityType(responseData.EntityType);
        responseData.EntityType > 0 && setEntityTypeHasError(true);
        setAddress(responseData.Address);
        responseData.Address.length > 0 && setAddressHasError(true);
        setCountry(responseData.CountryId);
        responseData.CountryId > 0 && setCountryHasError(true);
        setState(responseData.StateId);
        responseData.StateId > 0 && setStateHasError(true);
        setCity(responseData.CityId);
        responseData.CityId > 0 && setCityHasError(true);
        setZipCode(responseData.ZipCode);
        responseData.ZipCode.length > 0 && setZipCodeHasError(true);
        setPhone(responseData.Phone);
        responseData.Phone.length > 0 && setPhoneHasError(true);
        setEmail(responseData.Email);
        responseData.Email.length > 0 && setEmailHasError(true);
        // setDeletedFile(responseData?.DeletedFile);
        // setImagePreview(responseData?.CompanyImage);
        CountryDropDown();
        StateDropDown(responseData.CountryId);
        CityDropDown(responseData.StateId);
      }
    } catch (error: any) {
      if (error.response.status === 401 || 404) {
        router.push("/signin");
      }
      console.error(error);
    }
  };

  useEffect(() => {
    hasEditId && getCompanyListById();
  }, [hasEditId]);

  // Country DropDownMenuItem
  const CountryDropDown = async () => {
    try {
      const accessToken = localStorage.getItem("token");
      const headers = {
        Authorization: accessToken,
      };

      const response = await axios.get(
        `${process.env.api_profile}/country/list`,
        { headers: headers }
      );

      if (response.status === 200) {
        let responseData = await response.data.ResponseData;
        if (!responseData) {
          responseData = null;
        } else {
          setCountryDropDownData(response.data.ResponseData);
        }
      }
    } catch (error: any) {
      console.error(error);
    }
  };

  // State DropDownMenuItem
  const StateDropDown = async (country: any) => {
    try {
      const accessToken = localStorage.getItem("token");
      const headers = {
        Authorization: accessToken,
      };

      const response = await axios.get(
        `${process.env.api_profile}/state/list?countryId=${country}`,
        { headers: headers }
      );

      if (response.status === 200) {
        let responseData = await response.data.ResponseData;
        if (!responseData) {
          responseData = null;
        } else {
          setStateDropDownData(response.data.ResponseData);
        }
      }
    } catch (error: any) {
      console.error(error);
    }
  };

  // City DropDownMenuItem
  const CityDropDown = async (state: any) => {
    try {
      const accessToken = localStorage.getItem("token");
      const headers = {
        Authorization: accessToken,
      };

      const response = await axios.get(
        `${process.env.api_profile}/city/list?stateId=${state}`,
        { headers: headers }
      );

      if (response.status === 200) {
        let responseData = await response.data.ResponseData;
        if (!responseData) {
          responseData = null;
        } else {
          setCityDropDownData(response.data.ResponseData);
        }
      }
    } catch (error: any) {
      console.error(error);
    }
  };

  useEffect(() => {
    CountryDropDown();
    StateDropDown(1);
    CityDropDown(1);
  }, []);

  const clearData = () => {
    setCompanyName("");
    setCompanyNameError(false);
    setCompanyNameHasError(false);
    setEntityType(0);
    setEntityTypeError(false);
    setEntityTypeHasError(false);
    setAddress("");
    setAddressError(false);
    setAddressHasError(false);
    setCountry(0);
    setCountryError(false);
    setCountryHasError(false);
    setState(0);
    setStateError(false);
    setStateHasError(false);
    setCity(0);
    setCityError(false);
    setCityHasError(false);
    setZipCode("");
    setZipCodeError(false);
    setZipCodeHasError(false);
    setPhone("");
    setPhoneError(false);
    setPhoneHasError(false);
    setEmail("");
    setEmailError(false);
    setEmailHasError(false);
    onClose();
  };

  const saveCompany = async () => {
    try {
      const accessToken = await localStorage.getItem("token");
      const headers = {
        Authorization: accessToken,
      };
      const response = await axios.post(
        `${process.env.base_url}/company/save`,
        {
          Id: Id > 0 ? Id : 0,
          Name: companyName,
          EntityType: entityType,
          Address: address,
          CountryId: country,
          StateId: state,
          CityId: city,
          ZipCode: zipCode,
          Phone: phone,
          Email: email,
          AccountingTool: accountingTool,
          AccToolCompanyId: accountToolCompanyId,
          // CompanyImage: binaryImage,
          // IntacctUserId: null,
          // IntacctPassword: null,
          // IntacctCompanyId: null,
          // IntacctLocationId: null,
        },
        { headers: headers }
      );

      if (response.status === 200) {
        if (response.data.ResponseStatus === "Success") {
          Toast.success(`Company ${Id ? "updated" : "created"} successfully`);
          clearData();
          getCompanyList();
        } else {
          onClose();
          const data = response.data.Message;
          if (data === null) {
            Toast.error("Please try again later.");
          } else {
            Toast.error(data);
          }
        }
      } else {
        onClose();
        const data = response.data.Message;
        if (data === null) {
          Toast.error("Failed Please try again.");
        } else {
          Toast.error(data);
        }
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handleSubmit = (e: { preventDefault: () => void }) => {
    e.preventDefault();

    (companyName.trim().length <= 0 || companyName === undefined) &&
      setCompanyNameError(true);
    (entityType <= 0 || entityType === undefined || entityType === 0) &&
      setEntityTypeError(true);
    (address?.trim().length <= 0 || address === undefined) &&
      setAddressError(true);
    (country <= 0 || country === undefined || country === 0) &&
      setCountryError(true);
    (state <= 0 || state === undefined || state === 0) && setStateError(true);
    (city <= 0 || city === undefined || city === 0) && setCityError(true);
    (zipCode.trim().length <= 0 || zipCode === undefined) &&
      setZipCodeError(true);
    (phone === null || phone === undefined || phone.length <= 0) &&
      setPhoneError(true);
    (email === null || email.length <= 0 || email === undefined) &&
      setEmailError(true);

    if (
      companyNameHasError &&
      entityTypeHasError &&
      addressHasError &&
      countryHasError &&
      stateHasError &&
      cityHasError &&
      zipCodeHasError &&
      phoneHasError &&
      emailHasError
    ) {
      saveCompany();
    }
  };

  // Make the API call to fetch the company image
  const getCompanyImage = async () => {
    try {
      const accessToken = localStorage.getItem("token");
      const headers = {
        Authorization: accessToken,
      };

      const companyId = 65;
      const fileName = "test.jpg";

      const response = await axios.get(
        `${process.env.base_url}/company/getcompanyimage?companyId=${companyId}&fileName=${fileName}`,
        {
          headers: headers,
          responseType: "arraybuffer", // This ensures we get the image data as an ArrayBuffer
        }
      );
      // Convert the ArrayBuffer to a base64 encoded string
      const base64Image = Buffer.from(response.data, "binary").toString(
        "base64"
      );
      // setImagePreview(`data:image/jpeg;base64,${base64Image}`);
    } catch (error) {
      console.error("Error fetching image:", error);
    }
  };

  // useEffect(() => {
  //   getCompanyImage();
  // });

  const handleEditIconClick = () => {
    const fileInput = document.getElementById("imageUpload");
    fileInput && fileInput.click();
  };

  if (!onOpen) return null;

  return (
    <>
      {/*  Drawer */}
      <div
        className={`fixed top-0 h-full overflow-y-auto lg:w-5/12 text-black transform bg-white z-30 ${
          onOpen ? "right-0" : "right-full"
        } transition-transform duration-2000 linear`}
      >
        <div className="flex justify-between py-[13px] border-b-[1px] border-[#D8D8D8] ">
          <div className="text-black text-[18px] mx-6 font-bold">
            {hasEditId ? "Edit " : "Add "}
            Company
          </div>
          <div onClick={clearData} className="mx-3">
            <Close variant="medium" />
          </div>
        </div>
        <form onSubmit={handleSubmit}>
          <div className="mx-6">
            <div className="relative flex mt-5">
              <Avatar
                variant="large"
                className="!opacity-100"
                imageUrl={imagePreview}
              />
              <div
                className="absolute bottom-0 left-11 bg-[#EEF4F8] rounded p-0.5"
                onClick={handleEditIconClick}
              >
                <EditIcon />
              </div>
              <input
                type="file"
                id="imageUpload"
                accept=".png, .jpg, .jpeg"
                className="hidden"
                // onChange={onUploadImage}
                disabled
              />
            </div>
            <div className=" text-black text-[16px] font-bold mt-7">
              Company Details
            </div>
            <div className="grid lg:grid-cols-2 md:grid-cols-1 mt-2">
              <div className="lg:w-56 md:w-full">
                <Text
                  noNumeric
                  noSpecialChar
                  label="Company Name"
                  className="!pt-1.5"
                  maxLength={100}
                  value={companyName}
                  getValue={(e) => setCompanyName(e)}
                  getError={(e) => setCompanyNameHasError(e)}
                  hasError={companyNameError}
                  validate
                />
              </div>
              <div className="lg:w-56 md:w-full lg:mx-6 md:mx-0 md:mt-2 lg:mt-0">
                <Select
                  id="entity_dropdown"
                  defaultValue={entityType}
                  options={EntityTypeList}
                  label="Entity Type"
                  getValue={(e) => setEntityType(e)}
                  getError={(err) => setEntityTypeHasError(err)}
                  hasError={entityTypeError}
                  validate
                />
              </div>
            </div>
            <div className="text-black text-[16px] font-bold mt-7">
              Address Details
            </div>
            <div className="mt-2">
              <Text
                label="Address"
                className="!pt-0"
                maxLength={200}
                value={address}
                getValue={(e) => setAddress(e)}
                getError={(err) => setAddressHasError(err)}
                hasError={addressError}
                validate
              ></Text>
            </div>
            <div className="grid lg:grid-cols-2 md:grid-cols-1 lg:mt-4 md:mt-2">
              <div className="lg:w-56 md:w-full">
                <Select
                  placeholder="Select Country"
                  defaultValue={country}
                  options={countryDropDownData}
                  label="Country"
                  validate
                  id="country_dropdown"
                  getValue={(value) => {
                    setCountry(value);
                    StateDropDown(value);
                    setState(0);
                    setStateHasError(false);
                    setCity(0);
                    setCityHasError(false);
                  }}
                  getError={(err) => setCountryHasError(err)}
                  hasError={countryError}
                />
              </div>
              <div className="lg:w-56 md:w-full lg:mx-5 md:mx-0">
                <Select
                  className="md:mt-2 lg:mt-0"
                  placeholder="Select State"
                  defaultValue={state}
                  options={stateDropDownData}
                  label="State"
                  id="state_dropdown"
                  getValue={(value) => {
                    setState(value);
                    CityDropDown(value);
                    setCity(0);
                    setCityHasError(false);
                  }}
                  getError={(err) => setStateHasError(err)}
                  hasError={stateError}
                  validate
                />
              </div>
            </div>
            <div className="grid lg:grid-cols-2 md:grid-cols-1 lg:mt-4 md:mt-2">
              <div className="lg:w-56 md:w-full">
                <Select
                  defaultValue={city}
                  options={cityDropDownData}
                  label="City"
                  id="city_dropdown"
                  getValue={(value) => {
                    setCity(value);
                  }}
                  getError={(err) => setCityHasError(err)}
                  hasError={cityError}
                  validate
                />
              </div>
              <div className="lg:w-56 md:w-full lg:mx-5 md:mx-0 lg:mt-1.5 md:mt-2">
                <Text
                  label="Zip/Postal Code"
                  value={zipCode}
                  noSpecialChar
                  noText
                  maxChar={7}
                  getValue={(e) => setZipCode(e)}
                  getError={(err) => setZipCodeHasError(err)}
                  hasError={zipCodeError}
                  validate
                  className="!pt-0 [appearance:number] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                />
              </div>
            </div>
            <div className="grid lg:grid-cols-2 md:grid-cols-1 lg:mt-4">
              <div className="lg:w-56 md:w-full md:mt-2 !pt-[2px]">
                <Tel
                  className="lg:!pt-1.5"
                  validate
                  value={phone}
                  label="Phone Number"
                  maxLength={12}
                  getValue={(e) => setPhone(e.slice(4))}
                  getError={(err) => setPhoneHasError(err)}
                  hasError={phoneError}
                  countryCode
                />
              </div>
              <div className="lg:w-56 md:w-full lg:mx-5 md:mt-2 md:mx-0">
                <Email
                  className="!p-1.5"
                  label="Email Address"
                  value={email}
                  maxLength={100}
                  getValue={(e) => setEmail(e)}
                  getError={(err) => setEmailHasError(err)}
                  hasError={emailError}
                  validate
                />
              </div>
            </div>
            {/* <div className=" text-black text-[16px] font-bold mt-7">
            Other Details
          </div> */}
            {/* <div className="grid lg:grid-cols-2 md:grid-cols-1 mt-1">
            <div className="lg:w-56 md:w-full">
              <Text
                value={deletedFile}
                label="Delete File in Days"
                className="!pt-0"
                maxLength={3}
                id="delete"
                getValue={(e) => setDeletedFile(e)}
                getError={(err) => setDeletedFileHasError(err)}
              ></Text>
            </div>
          </div> */}
          </div>
          <div className="w-full flex justify-end mt-8 border-t-[1px] py-3.5 px-2 border-[#D8D8D8] bottom-0">
            <div>
              <Button
                className="rounded-full btn-sm font-semibold mx-2 !w-24 !h-[36px]"
                variant="btn-outline-primary"
                onClick={clearData}
              >
                CANCEL
              </Button>
            </div>
            <div>
              <Button
                type="submit"
                className="rounded-full btn-sm mx-2 font-semibold !w-20 !h-[36px]"
                variant="btn-primary"
              >
                SAVE
              </Button>
            </div>
          </div>
        </form>
      </div>
    </>
  );
};

export default Drawer;