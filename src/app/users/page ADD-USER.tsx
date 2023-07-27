"use client";

import React, { useState } from "react";
import {
  Button,
  Modal,
  ModalAction,
  ModalContent,
  ModalTitle,
  MultiSelect,
  Table,
  Typography,
  Tel,
  TextField,
  Select,
  Avatar,
  Close,
} from "next-ts-lib";
import "next-ts-lib/dist/index.css";
import UserIcon from "../Icons/UserIcon";
import EditIcon from "../Icons/EditIcon";
import DeleteIcon from "../Icons/DeleteIcon";

interface FormData {
  name: string;
  email: string;
  phone: number | null;
  country: string;
  state: string;
  timezone: string;
  role: string;
  // imageName: string;
}

const page: React.FC = () => {
  // Data
  const headers = ["name", "email", "phone", "country", "state", "role"];
  const options = [
    { label: "Acme Inc.", value: "Acme Inc." },
    { label: "Tech Corp", value: "Tech Corp" },
    { label: "Software Solutions", value: "Software Solutions" },
    { label: "Tech Innovations", value: "Tech Innovations" },
    { label: "Data Corp", value: "Data Corp" },
  ];
  const userData1 = [
    {
      name: "John Doe",
      email: "john.doe@example.com",
      company: "Acme Inc.",
      role: ["Admin", "Developer"],
      status: "Active",
    },
    {
      name: "Jane Smith",
      email: "jane.smith@example.com",
      company: "Tech Corp",
      role: ["Editor", "User"],
      status: "Active",
    },
    {
      name: "Bob Johnson",
      email: "bob.johnson@example.com",
      company: "DevCo",
      role: ["Admin", "Manager"],
      status: "Inactive",
    },
  ];

  const [userData, setUserData] = useState<FormData[]>([
    {
      name: "John Doe",
      email: "john.doe@example.com",
      phone: 1234567890,
      country: "United States",
      state: "California",
      timezone: "Pacific Time",
      role: "Admin",
    },
    {
      name: "Jane Smith",
      email: "jane.smith@example.com",
      phone: 1234561111,
      country: "Canada",
      state: "Ontario",
      timezone: "Eastern Time",
      role: "User",
    },
    {
      name: "Bob Johnson",
      email: "bob.johnson@example.com",
      phone: 9876543210,
      country: "United Kingdom",
      state: "England",
      timezone: "GMT",
      role: "Manager",
    },
  ]);

  // States
  const initialFormData = {
    name: "",
    email: "",
    phone: null,
    country: "",
    state: "",
    timezone: "",
    role: "",
  };
  const [modalOpen, setModalOpen] = useState<boolean>(false);

  const [formData, setFormData] = useState<FormData>(initialFormData);

  const [imagePreview, setImagePreview] = useState<string>("");
  // const [selectedFile, setSelectedFile] = useState(null);
  // const [fileName, setFileName] = useState("");

  const actions: any[] = ["A", "E", "D"];

  const modalOpenModal = () => {
    setFormData(initialFormData);
    setModalOpen(true);
  };
  const modalCloseModal = () => {
    setFormData(initialFormData);
    setModalOpen(false);
  };

  const isFormDataEmpty = Object.values(formData).every(
    (value) => value === "" || value === null
  );

  const fullNameRegex = /^\d{1,50}$/g;

  const disabled = isFormDataEmpty || fullNameRegex.test(formData.name);

  const handleSaveModal = () => {
    if (!disabled) {
      userData.push(formData);
      // setUserData(userData);
      setModalOpen(false);
    }
  };

  const onUploadImage = (e: any) => {
    if (e.target?.files && e.target.files[0]) {
      const file = e.target.files[0];
      // setSelectedFile(file);
      // setFileName(file.name);
      const reader = new FileReader();
      reader.onload = function (e) {
        const result = e.target?.result;
        if (result && typeof result === "string") {
          setImagePreview(result);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const handleEditIconClick = () => {
    const fileInput = document.getElementById("imageUpload");
    fileInput && fileInput.click();
  };

  return (
    <>
      <div className="py-2 border-y  border-lightSilver">
        <Typography type="h4" className="inline-block text-center">
          Manage Users & Roles
        </Typography>
      </div>
      <div className="py-2 mb-5 border-b border-lightSilver flex justify-between">
        <div className="flex justify-star mx-3">
          <Button className="btn mx-1" variant="btn-primary">
            User
          </Button>
          <Button className="btn" variant="btn">
            Role
          </Button>
        </div>
        <div className="flex justify-end mx-3 z-30">
          <Button
            className="btn"
            variant="btn-primary"
            onClick={modalOpenModal}
          >
            + Add User
          </Button>
          {modalOpen && (
            <Modal isOpen={modalOpen} onClose={modalCloseModal} size="lg">
              <ModalTitle>
                <div className="font-bold text-base my-3 mx-5">ADD USER</div>
                <div className="mx-2" onClick={modalCloseModal}>
                  <Close variant="medium" />
                </div>
              </ModalTitle>
              <ModalContent>
                <div className="flex-1 mx-5 mt-2 mb-12">
                  <div className="relative flex mt-3">
                    <Avatar
                      variant="large"
                      className="!opacity-100"
                      imageUrl={imagePreview}
                    />
                    <div
                      className="absolute bottom-0 left-11 cursor-pointer"
                      onClick={handleEditIconClick}
                    >
                      <EditIcon />
                    </div>

                    <input
                      type="file"
                      id="imageUpload"
                      accept=".png, .jpg, .jpeg"
                      className="hidden"
                      onChange={onUploadImage}
                    />
                  </div>
                  <div className="flex-1 mt-3">
                    <TextField
                      label="Full Name"
                      id="name"
                      name="name"
                      validate
                      getValue={(value: any) =>
                        setFormData({ ...formData, name: value })
                      }
                    ></TextField>
                  </div>
                  <div className="flex-1 mt-3">
                    <TextField
                      label="Email"
                      id="email"
                      name="email"
                      type="email"
                      validate
                      getValue={(value: any) =>
                        setFormData({ ...formData, email: value })
                      }
                    ></TextField>
                  </div>
                  <div className="flex-1 mt-3">
                    <Tel
                      label="Telephone"
                      validate
                      required
                      getValue={(value: any) =>
                        setFormData({ ...formData, phone: value })
                      }
                      countryCode
                    />
                  </div>
                  <div className="flex-1 mt-3">
                    <Select
                      label="Country"
                      options={options}
                      id="country"
                      required
                      onSelect={(value: any) =>
                        setFormData({ ...formData, country: value })
                      }
                    />
                  </div>
                  <div className="flex-1 mt-3">
                    <Select
                      label="State"
                      options={options}
                      id="state"
                      required
                      onSelect={(value: any) =>
                        setFormData({ ...formData, state: value })
                      }
                    />
                  </div>
                  <div className="flex-1 mt-3">
                    <Select
                      label="Timezone"
                      options={options}
                      id="timezone"
                      required
                      onSelect={(value: any) =>
                        setFormData({ ...formData, timezone: value })
                      }
                    />
                  </div>
                  <div className="flex-1 mt-3">
                    <Select
                      label="Company"
                      options={options}
                      id="company"
                      required
                      onSelect={(value: any) =>
                        setFormData({ ...formData, role: value })
                      }
                    />
                  </div>
                  <div className="flex-1 mt-3">
                    <Select
                      label="Assign Role"
                      options={options}
                      id="assign_role"
                      required
                      onSelect={(value: any) =>
                        setFormData({ ...formData, role: value })
                      }
                    />
                  </div>
                </div>
              </ModalContent>

              <ModalAction>
                <div className="my-3 mx-5">
                  <Button
                    onClick={modalCloseModal}
                    className="rounded-full font-medium !w-28 mx-3"
                    variant="btn-outline-primary"
                  >
                    CANCLE
                  </Button>
                  <Button
                    onClick={handleSaveModal}
                    className="rounded-full font-medium !w-28"
                    variant="btn-primary"
                    disabled={disabled}
                  >
                    SAVE
                  </Button>
                </div>
              </ModalAction>
            </Modal>
          )}
        </div>
      </div>

      <div className="pb-2 flex">
        <div className="z-20 flex justify-star mx-3 ">
          <MultiSelect
            type="checkbox"
            options={options}
            id="basic"
            label="Company"
            defaultValue="All"
            onSelect={() => {}}
          />
          <MultiSelect
            type="checkbox"
            options={options}
            id="basic"
            label="All"
            defaultValue="All"
            onSelect={() => {}}
          />
        </div>
      </div>

      <div className="h-auto w-auto">
        {userData.length > 0 && (
          <Table
            data={userData}
            headers={headers}
            actions={actions}
            sortable
            sticky
            action
            className={undefined}
          />
        )}
      </div>
    </>
  );
};

export default page;
