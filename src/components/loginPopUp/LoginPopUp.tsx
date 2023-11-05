import React, { Dispatch, SetStateAction, useState } from "react";

type PropTypes = {
  setId: Dispatch<SetStateAction<number | undefined>>;
};

const LoginPopUp = ({ setId }: PropTypes) => {
  const [newId, setNewId] = useState<number>();

  const handleClick = () => {
    setId(newId);
  };
  return (
    <div className="fixed bg-slate-500 opacity-90 w-screen h-screen flex justify-center items-center">
      <div className="bg-gray-800 p-10 rounded-lg flex flex-col gap-3">
        <h1 className="text-4xl text-center">Enter your id</h1>
        <input
          type="text"
          className="w-full p-4 text-3xl bg-gray-700 rounded cursor-pointer"
          placeholder="Enter Your ID"
          onChange={(e) => setNewId(parseInt(e.target.value))}
        />
        <button
          className="w-60 h-16 bg-gray-700 hover:bg-gray-600 text-3xl font-medium shadow-xl"
          onClick={handleClick}
        >
          Go
        </button>
      </div>
    </div>
  );
};

export default LoginPopUp;
