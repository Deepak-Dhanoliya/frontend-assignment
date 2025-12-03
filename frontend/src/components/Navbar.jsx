import React from "react";
import { Link, useNavigate } from "react-router-dom";

export default function Navbar(){
  const navigate = useNavigate();
  const logout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };
  return (
    <nav className="bg-white shadow">
      <div className="container mx-auto px-4 py-3 flex justify-between items-center">
        <div className="text-lg font-semibold">Frontend Task</div>
        <div className="space-x-4">
          <Link to="/" className="hover:underline">Dashboard</Link>
          <Link to="/tasks" className="hover:underline">Tasks</Link>
          <Link to="/profile" className="hover:underline">Profile</Link>
          <button onClick={logout} className="ml-2 text-red-600">Logout</button>
        </div>
      </div>
    </nav>
  );
}
