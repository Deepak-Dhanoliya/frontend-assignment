import React, { useEffect, useState } from "react";
import { me, updateProfile } from "../api/auth";
import { useForm } from "react-hook-form";

export default function Profile() {
  const [user, setUser] = useState(null);
  const { register, handleSubmit, reset } = useForm();

  useEffect(() => {
    async function load() {
      const res = await me();
      setUser(res.data);
      reset({ name: res.data.name, email: res.data.email });
    }
    load();
  }, []);

  const onSubmit = async (data) => {
    try {
      await updateProfile(data);
      alert("Updated");
    } catch (err) {
      alert("Update error");
    }
  };

  return (
    <div className="max-w-lg bg-white p-6 rounded shadow">
      <h2 className="text-xl mb-4">Profile</h2>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-3">
        <input {...register("name")} className="w-full border p-2" />
        <input {...register("email")} className="w-full border p-2" />
        <button className="bg-blue-600 text-white px-4 py-2 rounded">
          Save
        </button>
      </form>
    </div>
  );
}
