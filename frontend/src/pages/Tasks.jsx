import React, { useEffect, useState } from "react";
import { fetchTasks, createTask, updateTask, deleteTask } from "../api/tasks";

export default function Tasks(){
  const [tasks, setTasks] = useState([]);
  const [title, setTitle] = useState("");
  const [filter, setFilter] = useState("");

  const load = async () => {
    const res = await fetchTasks();
    setTasks(res.data);
  };

  useEffect(()=>{ load(); },[]);

  const add = async () => {
    if (!title) return;
    await createTask({ title });
    setTitle("");
    load();
  };

  const toggle = async (t) => {
    await updateTask(t._id, { completed: !t.completed });
    load();
  };

  const remove = async (id) => {
    await deleteTask(id);
    load();
  };

  const filtered = tasks.filter(t => t.title.toLowerCase().includes(filter.toLowerCase()));

  return (
    <div>
      <h2 className="text-xl mb-4">Tasks</h2>
      <div className="mb-4 flex gap-2">
        <input value={title} onChange={e=>setTitle(e.target.value)} className="border p-2 flex-1" placeholder="New task"/>
        <button onClick={add} className="bg-blue-600 text-white px-4 rounded">Add</button>
      </div>

      <div className="mb-4">
        <input placeholder="Search tasks" value={filter} onChange={e=>setFilter(e.target.value)} className="border p-2 w-full"/>
      </div>

      <div className="space-y-2">
        {filtered.map(t => (
          <div key={t._id} className="bg-white p-3 rounded shadow flex justify-between items-center">
            <div>
              <input type="checkbox" checked={t.completed} onChange={()=>toggle(t)} className="mr-2"/>
              <span className={t.completed ? "line-through" : ""}>{t.title}</span>
            </div>
            <button onClick={()=>remove(t._id)} className="text-red-600">Delete</button>
          </div>
        ))}
      </div>
    </div>
  );
}
