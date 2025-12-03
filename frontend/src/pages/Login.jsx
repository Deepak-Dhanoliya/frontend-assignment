import React from "react";
import { useForm } from "react-hook-form";
import { login } from "../api/auth";
import { useNavigate } from "react-router-dom";

export default function Login(){
  const { register, handleSubmit } = useForm();
  const navigate = useNavigate();

  const onSubmit = async (data) => {
    try {
      const res = await login(data);
      localStorage.setItem("token", res.data.token);
      navigate("/");
    } catch (err) {
      alert(err?.response?.data?.message || "Login failed");
    }
  };

  return (
    <div className="max-w-md mx-auto bg-white p-6 rounded shadow">
      <h2 className="text-xl mb-4">Login</h2>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-3">
        <input {...register("email",{required:true})} placeholder="Email" className="w-full border p-2"/>
        <input {...register("password",{required:true})} type="password" placeholder="Password" className="w-full border p-2"/>
        <button className="bg-green-600 text-white px-4 py-2 rounded">Login</button>
      </form>
      <div>
        <p className="my-4">Not have an account? </p>
        <button className="bg-blue-600 text-white px-4 py-2 rounded" onClick={() => {navigate("/signup")}}>SignUp here</button>
      </div>
    </div>
  );
}
