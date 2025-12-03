import React, { useEffect, useState } from "react";
import { me } from "../api/auth";
import { Link } from "react-router-dom";

export default function Dashboard(){
  const [user, setUser] = useState(null);
  useEffect(()=>{
    async function load(){ 
      try {
        const res = await me();
        setUser(res.data);
      } catch (err) {
        console.error(err);
      }
    }
    load();
  },[]);
  return (
    <div>
      <h1 className="text-2xl font-semibold mb-4">Dashboard</h1>
      <div className="bg-white p-4 rounded shadow">
        <p><strong>Name:</strong> {user?.name}</p>
        <p><strong>Email:</strong> {user?.email}</p>
      </div>

      <div className="mt-4">
        <Link to="/tasks" className="text-blue-600 underline">Go to Tasks</Link>
      </div>
    </div>
  );
}
