"use client";
import Link from "next/link";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import { useForm, SubmitHandler } from "react-hook-form";
import toast, { Toaster } from "react-hot-toast";

interface User {
  email: string;
  password: string;
  username: string;
}
export default function SignUpPage() {
  const router = useRouter();
  const [buttonDisabled, setButtonDisabled] = useState(false);
  const [loading, setLoading] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<User>();
  const onSubmit: SubmitHandler<User> = async (data) => {
    setButtonDisabled(true);
    try {
      setLoading(true);
      const response = await axios.post("/api/users/signup", data);
      console.log("Sign up succes >>", response);
      router.push("/auth/login");
    } catch (error: any) {
      console.log("Sign Up Failed", error.message);
      toast.error(error.message);
    } finally {
      setButtonDisabled(false);
      setLoading(false);
    }
  };
  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="flex flex-col items-center justify-center min-h-screen py-2"
    >
      <Toaster position="top-right" reverseOrder={false} />

      <h1>Sign Up!</h1>
      <hr />
      <label htmlFor="username">Username</label>
      <input
        className="p-2 border border-gray-300 rounded-sm mb-4 focus:outline-none focus:border-gray-600 text-black"
        {...register("username", { required: true })}
      />
      <label htmlFor="username">Email</label>
      <input
        className="p-2 border border-gray-300 rounded-sm mb-4 focus:outline-none focus:border-gray-600 text-black"
        type="email"
        {...register("email", { required: true })}
      />
      <label htmlFor="username">Password</label>
      <input
        className="p-2 border border-gray-300 rounded-sm mb-4 focus:outline-none focus:border-gray-600 text-black"
        type="password"
        {...register("password", { required: true })}
      />
      <button
        className="p-2 border border-gray-300 rounded-sm mb-4 focus:outline-none focus:border-gray-600"
        disabled={buttonDisabled}
      >
        Sign Up
      </button>
      <Link href="/auth/login">Visit Login Page</Link>
    </form>
  );
}
