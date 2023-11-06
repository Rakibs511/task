"use client";
import axios from "axios";
import React, { useEffect, useState } from "react";
import dateFormat from "dateformat";
import Loading from "@/components/loading/Loading";

type UsersType = {
  id: number;
  name: string;
  agreeToTerms: string;
  createdAt: any;
  selectedItem: string[];
};

interface Options {
  id: number;
  value: string;
  text: string;
  disable: boolean;
  position: number;
}
const View = () => {
  const [users, setUsers] = useState<UsersType[]>();
  const [options, setOptions] = useState<Options[]>();
  const [isLoading, setLoading] = useState<boolean>(false);

  const getAllUserData = async () => {
    setLoading(true);
    const data = await axios({
      method: "GET",
      url: "/api/user",
    });
    setUsers(data.data.data);
    setLoading(false);
  };

  const getOption = async () => {
    setLoading(true);
    const data = await axios({
      method: "GET",
      url: "/api/options",
    });
    setOptions(data.data.data[0].DataArray);
    setLoading(false);
  };

  useEffect(() => {
    getAllUserData();
    getOption();
  }, []);
  return (
    <div className="bg-gray-500 h-screen overflow-auto">
      {isLoading ? <Loading /> : null}
      <p className="text-center text-4xl text-white font-bold mb-2">
        User Information
      </p>
      {users?.map((user, index) => {
        return (
          <div
            key={index}
            className="bg-gray-800 text-white max-w-[40rem] p-5 rounded overflow-hidden shadow-lg mx-auto my-4 h-fit"
          >
            <div className="px-6 py-4">
              <p className="text-lg mb-2">ID: {user.id}</p>
              <p className="text-lg mb-2">Name: {user.name}</p>
              <p className="text-lg mb-2">
                Agreed to Terms: {user.agreeToTerms ? "Yes" : "No"}
              </p>
              <p className="text-lg mb-2">
                Time: {dateFormat(user.createdAt, "h:MM:ss TT")}
              </p>
              <p className="text-lg mb-2">
                Date: {dateFormat(user.createdAt, "dddd, mmmm dS, yyyy")}
              </p>
              <p>Selected Options</p>

              {user.selectedItem.map((item, index) => {
                return options?.map((option, _) => {
                  if (item === option.value)
                    return (
                      <div
                        key={index}
                        className="bg-gray-700 px-5 py-2 rounded-full inline-block mt-2 ml-2"
                      >
                        {option.text}
                      </div>
                    );
                });
              })}
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default View;
