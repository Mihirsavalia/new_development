"use client";
import React, { useState, ChangeEvent, useEffect, useRef } from "react";
import { Avatar, CheckBox } from "next-ts-lib";
import "next-ts-lib/dist/index.css";

interface State {
  name: string;
  id: string;
}

interface AssignUserProps {
  className?: string;
  width?: number | undefined;
}

const clientNames: State[] = [
  { id: "Google", name: "Google" },
  { id: "Microsoft", name: "Microsoft" },
  { id: "Apple", name: "Apple" },
  { id: "Amazon", name: "Amazon" },
  { id: "IBM", name: "IBM" },
];

export default function MultiselectCompany({ className, width=48 }: AssignUserProps): JSX.Element {
  let updatedWidth=0;
  updatedWidth = width > 48 ? updatedWidth = 48 : width
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [searchText, setSearchText] = useState<string>("");
  const [selectedStates, setSelectedStates] = useState<string[]>([]);
  const [avatarNames, setAvatarNames] = useState<string[]>([""]);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const filteredStates = clientNames.filter((state) =>
    state.name.toLowerCase().includes(searchText)
  );

  const toggleDropdown = (e: React.MouseEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsOpen(!isOpen);
  };

  const handleSearch = (e: ChangeEvent<HTMLInputElement>) => {
    setSearchText(e.target.value.toLowerCase());
  };

  const handleStateSelection = (e: ChangeEvent<HTMLInputElement>) => {
    const selectedState = e.target.name;
    if (e.target.checked) {
      setSelectedStates([...selectedStates, selectedState]);
    } else {
      setSelectedStates(
        selectedStates.filter((state) => state !== selectedState)
      );
    }
  };

  useEffect(() => {
    const updatedAvatarNames = selectedStates.map(
      (state) =>
        clientNames.find((clientNames) => clientNames.id === state)?.name || ""
    );
    setAvatarNames(updatedAvatarNames);

  }, [selectedStates]);

  useEffect(() => {
    if (isOpen) {
      document.addEventListener("mousedown", handleOutsideClick);
    } else {
      document.removeEventListener("mousedown", handleOutsideClick);
    }
    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  }, [isOpen]);

  const handleOutsideClick = (event: MouseEvent) => {
    if (
      dropdownRef.current &&
      !dropdownRef.current.contains(event.target as Node)
    ) {
      setIsOpen(false);
    }
  };

  return (
    <>
      <div ref={dropdownRef}>
        <div
          className={`flex w-${updatedWidth} h-[32px] items-center justify-between cursor-pointer`}
          onClick={toggleDropdown}

        >
          <div className="flex ml-4">
            {!(selectedStates.length > 0) && (
              <span className="text-gray-300 -ml-4">Please Select</span>
            )}
            {avatarNames.map((name, index) => {
              if (index < 4) {
                return (<div key={index}>
                  <Avatar
                    key={index}
                    variant="small"
                    className="ml-[-15px]"
                    name={name}
                  />
                </div>
                );
              } else if (index === 4) {
                return (
                  <div key={index}>
                    <Avatar
                      key={index}
                      variant="small"
                      className="ml-[-15px]"
                      name={`+${(selectedStates.length - 4).toString()}`}
                    />
                  </div>
                );
              }
              return null;
            })}
          </div>

          <span>
            <svg
              className={`w-3 h-3 ml-4  mt-1 ${isOpen ? "transform rotate-180 text-[#02b89d]" : "text-gray-400"
                }`}
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 14 8"

            >
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="m1 1 5.326 5.7a.909.909 0 0 0 1.348 0L13 1"
              />
            </svg>
          </span>
        </div>

        <div className={`w-${width} relative !p-0 `}>
          {isOpen && (
            <div className={`absolute w-${updatedWidth * 2} z-10 bg-white overflow-auto rounded-lg shadow-2xl pt-2`}>
              <form>
                <div className="relative mx-4 mt-2 ">
                  <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                    <svg
                      className="w-3 h-3 text-gray-500"
                      aria-hidden="true"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 20 20"
                    >
                      <path
                        stroke="currentColor"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
                      />
                    </svg>
                  </div>
                  <input
                    type="search"
                    id="default-search"
                    className="h-8 w-full text-sm pl-10 border rounded border-gray-400 outline-none focus:border-[#02b89d]"
                    placeholder="Search"
                    onChange={handleSearch}
                    value={searchText}
                  />
                </div>
              </form>
              <ul className="my-2 h-auto overflow-y-auto cursor-pointer">
                {filteredStates.map((state) => (
                  <li
                    key={state.id}
                    className={`flex items-center mx-4 mt-2`}
                  >
                    <CheckBox
                      id={state.id}
                      name={state.id}
                      onChange={handleStateSelection}
                      checked={selectedStates.includes(state.id)}
                    />
                    <label
                      htmlFor={state.id}
                      className="flex items-center mx-2 p-1 text-sm cursor-pointer"
                    >
                      <img
                        src="https://images.unsplash.com/photo-1499952127939-9bbf5af6c51c?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTF8fHBlcnNvbnxlbnwwfHwwfHw%3D&auto=format&fit=crop&w=500&q=60"
                        alt="Logo"
                        className="w-5 h-5 rounded-full mr-1"
                      />

                      <div className={`w-${updatedWidth} truncate `}>
                        {state.name}
                      </div>
                    </label>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </div>
    </>
  );
}
