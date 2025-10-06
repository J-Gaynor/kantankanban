"use client";
import React, { useState } from "react";

export default function CreateNewTaskComponent({ onAdd, onClose }) {
  const [desc, setDesc] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!desc.trim()) return;

    const newTask = {
      id: Date.now(),
      desc,
      status: "toDo",
    };

    onAdd(newTask);
    setDesc("");
  };

  return (
    <div className="text-center">
      <h2 className="font-bold mb-4">Create New Task</h2>
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <input
          type="text"
          className="p-2 border rounded"
          placeholder="Task description..."
          value={desc}
          onChange={(e) => setDesc(e.target.value)}
        />
        <div className="flex justify-center gap-4">
          <button
            type="submit"
            className="btn bg-green-400 px-4 py-2 rounded hover:bg-green-600 transition-all"
          >
            Add
          </button>
          <button
            type="button"
            onClick={onClose}
            className="btn bg-red-400 px-4 py-2 rounded hover:bg-red-600 transition-all"
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
}
