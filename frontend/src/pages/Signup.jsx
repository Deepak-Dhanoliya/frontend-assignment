import React from "react";
import { useForm } from "react-hook-form";
import { signup } from "../api/auth";
import { useNavigate } from "react-router-dom";

export default function Signup(){
  const { register, handleSubmit } = useForm();
  const navigate = useNavigate();

  const onSubmit = async (data) => {
    try {
      await signup(data);
      alert("Signup successful. Please login.");
      navigate("/login");
    } catch (err) {
      alert(err?.response?.data?.message || "Signup failed");
    }
  };

  return (
    <div className="max-w-md mx-auto bg-white p-6 rounded shadow">
      <h2 className="text-xl mb-4">Sign up</h2>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-3">
        <input {...register("name",{required:true})} placeholder="Name" className="w-full border p-2"/>
        <input {...register("email",{required:true})} placeholder="Email" className="w-full border p-2"/>
        <input {...register("password",{required:true})} type="password" placeholder="Password" className="w-full border p-2"/>
        <button className="bg-blue-600 text-white px-4 py-2 rounded">Sign up</button>
      </form>
    </div>
  );
}
