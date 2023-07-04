"use client";
import Link from "next/link";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import { useForm, SubmitHandler } from "react-hook-form";
import toast from "react-hot-toast";
interface User {
  email: string;
  password: string;
}
export default function LoginPage() {
  const [loading, setLoading] = useState(false);
  const [buttonDisabled, setButtonDisabled] = useState(false);
  const router = useRouter();
  // console.log(router.query);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<User>();
  const onSubmit: SubmitHandler<User> = async (data) => {
    setButtonDisabled(true);
    try {
      setLoading(true);
      const response = await axios.post("/api/users/login", data);
      console.log("Sign in succes >>", response);
      router.push("/profile");
    } catch (error: any) {
      console.log("Sign in Failed", error.message);
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
      <h1>Login</h1>
      <hr />
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
      <button className="p-2 border border-gray-300 rounded-sm mb-4 focus:outline-none focus:border-gray-600">
        Login
      </button>
      <Link href="/auth/signup">Visit Signup Page</Link>
    </form>
  );
}
