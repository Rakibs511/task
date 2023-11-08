import React, { Dispatch, FormEvent, SetStateAction, useState } from "react";

type PropTypes = {
  setId: Dispatch<SetStateAction<number | undefined>>;
};

const LoginPopUp = ({ setId }: PropTypes) => {
  const [newId, setNewId] = useState<number>();

  const handleClick = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setId(newId);
  };
  return (
    <div className="fixed bg-slate-500 opacity-90 w-screen h-screen flex justify-center items-center">
      <form
        className="bg-gray-800 p-10 rounded-lg flex flex-col gap-3"
        onSubmit={handleClick}
      >
        <h1 className="text-4xl text-center">Enter your id</h1>
        <input
          type="number"
          className="w-full p-4 text-3xl bg-gray-700 rounded cursor-pointer"
          placeholder="Enter Your ID"
          onChange={(e) => setNewId(parseInt(e.target.value))}
          required
        />
        <button
          className="w-60 h-16 bg-gray-700 hover:bg-gray-600 text-3xl font-medium shadow-xl"
          type="submit"
        >
          Go
        </button>
      </form>
    </div>
  );
};

export default LoginPopUp;
