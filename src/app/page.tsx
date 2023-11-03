"use client";
import { useState } from "react";
import { SectorComponent } from "../components/sectors/SectorsComponent";
import Loading from "@/components/loading/Loading";
import { dbConnection } from "@/utils/dbConnection";
import axios from "axios";

export default function Home() {
  const [selectedValues, setSelectedValues] = useState<string[]>([]);
  const [name, setName] = useState<string>("");
  const [isAgreeToTerms, setAgreeToTerms] = useState<boolean>(false);
  const [isLoading, setLoading] = useState<boolean>(false);

  const handleSave = async () => {
    setLoading(true);
    const data = await axios({
      method: "POST",
      url: "/api/user",
      data: {
        name,
        selectedValues,
      },
    });
    setLoading(false);
    console.log(data);
  };

  return (
    <main className="bg-gray-600 flex gap-5 justify-center items-center text-white">
      {isLoading ? <Loading /> : null}
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
        />
        <SectorComponent
          setSelectedValues={setSelectedValues}
          selectedValues={selectedValues}
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
        <button
          className="w-60 h-16 bg-gray-700 hover:bg-gray-800 text-3xl font-medium shadow-xl"
          onClick={handleSave}
        >
          Save
        </button>
      </div>
    </main>
  );
}
