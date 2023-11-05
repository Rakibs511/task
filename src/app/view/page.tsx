"use client";
import axios from "axios";
import React, { useEffect, useState } from "react";

type UsersType = {
  id: number;
  name: string;
  agreeToTerms: string;
  createdAt: any;
};
const page = () => {
  const [users, setUsers] = useState<UsersType[]>();

  const getAllUserData = async () => {
    const data = await axios({
      method: "GET",
      url: "/api/user",
    });
    setUsers(data.data.data);
  };

  useEffect(() => {
    getAllUserData();
  }, []);
  return (
    <div>
      {users?.map((user, index) => {
        return (
          <>
            <p>{user.id}</p>
            <p>{user.name}</p>
            <p>{user.agreeToTerms}</p>
            <p>{user.createdAt}</p>
          </>
        );
      })}
    </div>
  );
};

export default page;
