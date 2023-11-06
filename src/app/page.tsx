"use client";
import { useEffect, useState } from "react";
import { SectorComponent } from "../components/sectors/SectorsComponent";
import Loading from "@/components/loading/Loading";
import axios from "axios";
import LoginPopUp from "@/components/loginPopUp/LoginPopUp";
import Link from "next/link";

type UsersType = {
  id: number;
  name: string;
  agreeToTerms: string;
  createdAt: any;
  selectedItem: string[];
};
export default function Home() {
  const [selectedValues, setSelectedValues] = useState<string[]>([]);
  const [id, setId] = useState<number>();
  const [name, setName] = useState<string>("");
  const [isAgreeToTerms, setAgreeToTerms] = useState<boolean>(false);
  const [isLoading, setLoading] = useState<boolean>(false);

  const [userExistingData, setUserExistingData] = useState<UsersType>();

  useEffect(() => {
    setId(userExistingData?.id);
    setSelectedValues(userExistingData?.selectedItem!);
    setAgreeToTerms(Boolean(userExistingData?.agreeToTerms));
  }, [userExistingData]);

  const getUserData = async () => {
    if (id) {
      setLoading(true);
      const data = await axios({
        method: "GET",
        url: `/api/user/${id}`,
      });
      setUserExistingData(data.data.data);
      setLoading(false);
    }
  };

  useEffect(() => {
    getUserData();
  }, [id]);

  const handleSave = async () => {
    setLoading(true);
    const data = await axios({
      method: "POST",
      url: "/api/user",
      data: {
        id,
        name,
        selectedValues,
        agreeOfTerms: isAgreeToTerms,
      },
    });
    setLoading(false);
  };

  return (
    <main className="bg-gray-600 flex gap-5 justify-center items-center text-white">
      {isLoading ? <Loading /> : null}
      {!id ? <LoginPopUp setId={setId} /> : null}
      <div className="flex gap-5 flex-col">
        <h1 className="text-xl md:text-3xl mb-6">
          Please enter your name and pick the Sectors <br /> you are currently
          involved in.
        </h1>
        <input
          type="text"
          placeholder="Enter your name"
          className="p-4 w-full rounded-none focus:border-none bg-gray-500 text-3xl"
          onChange={(e) => setName(e.target.value)}
          defaultValue={userExistingData?.name}
        />
        <SectorComponent
          setSelectedValues={setSelectedValues}
          selectedValues={selectedValues}
          id={id!}
        />
        <div>
          <label className="flex items-center gap-5 select-none text-xl  md:text-2xl cursor-pointer">
            <input
              type="checkbox"
              className="w-10 h-10 rounded cursor-pointer"
              checked={isAgreeToTerms}
              onChange={(e) => setAgreeToTerms(e.target.checked)}
            />
            Agree to terms
          </label>
        </div>
        <div className="flex justify-between">
          <button
            className="w-60 h-16 bg-gray-700 hover:bg-gray-800 text-3xl font-medium shadow-xl"
            onClick={handleSave}
          >
            Save
          </button>
          <Link
            href={"/view"}
            className="px-10 py-4 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 text-3xl font-medium shadow-xl"
          >
            View
          </Link>
        </div>
      </div>
    </main>
  );
}
