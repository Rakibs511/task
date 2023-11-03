import React from "react";

const Loading = () => {
  return (
    <div className="flex fixed z-10 h-screen w-screen justify-center items-center bg-gray-500 opacity-90">
      <span className="loader"></span>
    </div>
  );
};

export default Loading;
