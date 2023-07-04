"use client";
import axios from "axios";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";

export default function ProfilePage() {
  const router = useRouter();
  const [data, setData] = useState("");
  const handleLogout = async () => {
    try {
      const response = await axios.get("/api/users/logout");
      router.push("/auth/login");
      console.log(response);
    } catch (error: any) {
      console.log(error.message);
      toast.error(error.message);
    }
  };
  const getUserDetails = async () => {
    const response = await axios.get("/api/users/me");
    setData(response.data.data._id);
  };
  useEffect(() => {
    getUserDetails();
  }, []);
  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2">
      <h1>Profile</h1>
      <hr />
      <p>Profile Page</p>
      {data && (
        <h2>
          <Link href={`/profile/${data}`}>{data}</Link>
        </h2>
      )}
      <hr />
      <button
        onClick={handleLogout}
        className="bg-blue-500 mt-4 hover:bg-blue-700 text-white font-bold py-2 px-4"
      >
        Logout
      </button>
    </div>
  );
}
