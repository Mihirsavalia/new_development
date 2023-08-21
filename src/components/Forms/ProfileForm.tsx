import axios from "axios";
import {
  Button,
  Email,
  Select,
  Tel,
  Text,
  Textarea,
  Toast,
  Typography,
  Uploader,
} from "next-ts-lib";
import React, { useEffect, useState } from "react";

type OptionType = {
  label: string;
  value: string;
};

const ProfileForm = ({ profileData, handleEdit }: any) => {
  const [firstName, setFirstName] = useState<string>(
    profileData.first_name ? profileData.first_name : ""
  );
  const [firstNameErr, setFirstNameErr] = useState<boolean>(false);
  const [firstNameHasErr, setFirstNameHasErr] = useState<boolean>(
    profileData.first_name ? true : false
  );
  const [lastName, setLastName] = useState<string>(
    profileData.last_name ? profileData.last_name : ""
  );
  const [lastNameErr, setLastNameErr] = useState<boolean>(false);
  const [lastNameHasErr, setLastNameHasErr] = useState<boolean>(
    profileData.last_name ? true : false
  );
  const [email, setEmail] = useState<string>(
    profileData.email ? profileData.email : ""
  );
  const [emailErr, setEmailErr] = useState<boolean>(false);
  const [emailHasErr, setEmailHasErr] = useState<boolean>(
    profileData.email ? true : false
  );
  const [phone, setPhone] = useState<string>(
    profileData.phone ? profileData.phone : ""
  );
  const [phoneErr, setPhoneErr] = useState<boolean>(false);
  const [phoneHasErr, setPhoneHasErr] = useState<boolean>(
    profileData.phone ? true : false
  );
  const [addr, setAddr] = useState<string>(
    profileData.address ? profileData.address : ""
  );
  const [addrErr, setAddrErr] = useState<boolean>(false);
  const [addrHasErr, setAddrHasErr] = useState<boolean>(
    profileData.address ? true : false
  );
  const [countryDropdown, setCountryDropdown] = useState<OptionType[]>([]);
  const [country, setCountry] = useState<number>(
    profileData.country_id !== null ? profileData.country_id : 0
  );
  const [countryErr, setCountryErr] = useState<boolean>(false);
  const [countryHasErr, setCountryHasErr] = useState<boolean>(
    profileData.country_id !== null ? true : false
  );
  const [stateDropdown, setStateDropdown] = useState<OptionType[]>([]);
  const [state, setState] = useState<number>(
    profileData.state_id !== null ? profileData.state_id : 0
  );
  const [stateErr, setStateErr] = useState<boolean>(false);
  const [stateHasErr, setStateHasErr] = useState<boolean>(
    profileData.state_id !== null ? true : false
  );
  const [cityDropdown, setCityDropdown] = useState<OptionType[]>([]);
  const [city, setCity] = useState<number>(
    profileData.city_id !== null ? profileData.city_id : 0
  );
  const [cityErr, setCityErr] = useState<boolean>(false);
  const [cityHasErr, setCityHasErr] = useState<boolean>(
    profileData.city_id !== null ? true : false
  );
  const [postalcode, setPostalCode] = useState<string>(
    profileData.postal_code ? profileData.postal_code : ""
  );
  const [postalcodeErr, setPostalCodeErr] = useState<boolean>(false);
  const [postalcodeHasErr, setPostalCodeHasErr] = useState<boolean>(
    profileData.postal_code ? true : false
  );
  const [timezone, setTimezone] = useState<string>(
    profileData.time_zone ? profileData.time_zone : ""
  );
  const [timezoneErr, setTimezoneErr] = useState<boolean>(false);
  const [timezoneHasErr, setTimezoneHasErr] = useState<boolean>(
    profileData.time_zone ? true : false
  );
  const [image, setImage] = useState<any>("");
  const token = localStorage.getItem("token");

  const validate = () => {
    if (
      firstNameHasErr &&
      lastNameHasErr &&
      phoneHasErr &&
      emailHasErr &&
      addrHasErr &&
      countryHasErr &&
      stateHasErr &&
      cityHasErr &&
      postalcodeHasErr &&
      timezoneHasErr
    )
      return true;
    else return false;
  };

  const getCountryData = async () => {
    await axios
      .get(`${process.env.api_profile}/country/list`, {
        headers: {
          Authorization: `bearer ${token}`,
        },
      })
      .then((data) => setCountryDropdown(data.data.ResponseData))
      .catch((err) =>
        Toast.error(err === null ? "Something went wrong!" : err)
      );
  };

  const getStateData = async (id: number) => {
    await axios
      .get(`${process.env.api_profile}/state/list?countryId=${id}`, {
        headers: {
          Authorization: `bearer ${token}`,
        },
      })
      .then((data) => {
        setStateDropdown(data.data.ResponseData);
      })
      .catch((err) =>
        Toast.error(err === null ? "Something went wrong!" : err)
      );
  };

  const getCityData = async (id: number) => {
    await axios
      .get(`${process.env.api_profile}/city/list?stateId=${id}`, {
        headers: {
          Authorization: `bearer ${token}`,
        },
      })
      .then((data) => setCityDropdown(data.data.ResponseData))
      .catch((err) =>
        Toast.error(err === null ? "Something went wrong!" : err)
      );
  };

  const updateProfile = async () => {
    await axios
      .post(
        `${process.env.api_profile}/user/saveuserprofile`,
        {
          id: profileData.id,
          user_image: image,
          address: addr,
          country_id: country,
          state_id: state,
          city_id: city,
          postal_code: postalcode,
          time_zone: timezone,
          is_active: true,
          is_verified: true,
          first_name: firstName,
          last_name: lastName,
          email: email,
          phone: phone,
        },
        {
          headers: {
            Authorization: `bearer ${token}`,
          },
        }
      )
      .then((data) => {
        if (data.data.ResponseStatus === "Success") {
          Toast.success("Profile updated successfully!");
          handleEdit(false, "");
        }
        if (data.data.ResponseStatus === "Failure") {
          Toast.error(
            data.data.Message === null
              ? "Something went wrong!"
              : data.data.Message
          );
          handleEdit(false, "");
        }
      })
      .catch((err) => {
        Toast.error(err === null ? "Something went wrong!" : err);
        handleEdit(false, "");
      });
  };

  const handleSubmit = (e: any) => {
    e.preventDefault();
    firstName.trim().length === 0
      ? setFirstNameErr(true)
      : setFirstNameErr(false);
    lastName.trim().length === 0 ? setLastNameErr(true) : setLastNameErr(false);
    phone.trim().length === 0 ? setPhoneErr(true) : setPhoneErr(false);
    email.trim().length === 0 ? setEmailErr(true) : setEmailErr(false);
    addr.trim().length === 0 ? setAddrErr(true) : setAddrErr(false);
    country === null || country === 0
      ? setCountryErr(true)
      : setCountryErr(false);
    state === null || state === 0 ? setStateErr(true) : setStateErr(false);
    city === null || city === 0 ? setCityErr(true) : setCityErr(false);
    postalcode.trim().length === 0
      ? setPostalCodeErr(true)
      : setPostalCodeErr(false);
    timezone.trim().length === 0 ? setTimezoneErr(true) : setTimezoneErr(false);

    if (validate()) {
      updateProfile();
    }
  };

  useEffect(() => {
    getCountryData();
    country === 0 ? getStateData(1) : getStateData(country);
    state === 0 ? getCityData(1) : getCityData(state);
  }, [profileData]);

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <div className="flex gap-[20px] flex-col p-[20px] max-h-[78.5vh] overflow-y-auto">
          <Text
            label="First Name"
            placeholder="Enter First Name"
            validate
            noNumeric
            noSpecialChar
            value={firstName}
            getValue={(value) => setFirstName(value)}
            getError={(err) => setFirstNameHasErr(err)}
            hasError={firstNameErr}
            autoComplete="off"
            minChar={5}
            maxChar={50}
          />
          <Text
            label="Last Name"
            placeholder="Enter Last Name"
            validate
            noNumeric
            noSpecialChar
            value={lastName}
            getValue={(value) => setLastName(value)}
            getError={(err) => setLastNameHasErr(err)}
            hasError={lastNameErr}
            autoComplete="off"
            maxChar={300}
          />
          <Tel
            label="Phone No."
            validate
            countryCode
            value={phone}
            hasError={phoneErr}
            autoComplete="off"
            getValue={(value) => setPhone(value.slice(4))}
            getError={(err) => setPhoneHasErr(err)}
          />
          <Email
            label="Email"
            placeholder="Enter Email"
            validate
            autoComplete="off"
            value={email}
            hasError={emailErr}
            getValue={(value) => setEmail(value)}
            getError={(err) => setEmailHasErr(err)}
            maxChar={100}
          />
          <Textarea
            label="Address"
            validate
            autoComplete="off"
            value={addr}
            hasError={addrErr}
            getValue={(value) => setAddr(value)}
            getError={(err) => setAddrHasErr(err)}
          />
          <Select
            id="country"
            label="Country"
            options={countryDropdown}
            errorClass="!-mt-4"
            validate
            defaultValue={country}
            hasError={countryErr}
            autoComplete="off"
            getValue={(value) => setCountry(value)}
            getError={(err) => setCountryHasErr(err)}
          />
          <Select
            id="state"
            label="State"
            errorClass="!-mt-4"
            options={stateDropdown}
            validate
            defaultValue={state}
            hasError={stateErr}
            autoComplete="off"
            getValue={(value) => setState(value)}
            getError={(err) => setStateHasErr(err)}
          />
          <Select
            id="city"
            label="City"
            errorClass="!-mt-4"
            options={cityDropdown}
            validate
            defaultValue={city}
            hasError={cityErr}
            autoComplete="off"
            getValue={(value) => setCity(value)}
            getError={(err) => setCityHasErr(err)}
          />
          <Text
            label="Postal Code"
            placeholder="Enter Postal Code"
            validate
            value={postalcode}
            getValue={(value) => setPostalCode(value)}
            getError={(err) => setPostalCodeHasErr(err)}
            hasError={postalcodeErr}
            autoComplete="off"
            maxChar={6}
          />
          <Text
            label="Timezone"
            placeholder="Enter Timezone"
            validate
            value={timezone}
            getValue={(value) => setTimezone(value)}
            getError={(err) => setTimezoneHasErr(err)}
            hasError={timezoneErr}
            autoComplete="off"
            maxChar={300}
          />
          <div className="flex flex-col">
            <Typography type="label" className="text-[14px] text-[#6E6D7A]">
              Upload Image
            </Typography>
            <div className="py-1">
              <Uploader variant="small" type="image" />
            </div>
          </div>
        </div>
        <div className="flex justify-end fixed w-full bottom-0 gap-[20px] p-[9px] bg-pureWhite border-t border-lightSilver">
          <Button
            variant="btn-outline-primary"
            className="rounded-[4px] !h-[36px]"
            onClick={() => handleEdit(false, "")}
          >
            Cancel
          </Button>
          <Button
            variant="btn-primary"
            className="rounded-[4px] !h-[36px]"
            type="submit"
          >
            Save
          </Button>
        </div>
      </form>
    </div>
  );
};

export default ProfileForm;
