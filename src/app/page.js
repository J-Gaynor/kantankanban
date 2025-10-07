"use client";
import React, { useState, useEffect } from "react";
import Task from "./containers/Task";
import { FiSun, FiMoon } from "react-icons/fi";

export default function KantanKanban() {
  const [darkMode, setDarkMode] = useState(true);
  const [tasks, setTasks] = useState([]);
  const [createTask, setCreateTask] = useState(false);
  const [newTaskDesc, setNewTaskDesc] = useState("");

  useEffect(() => {
    if (!localStorage.getItem("tasks")) {
      localStorage.setItem("tasks", "[]");
    }
    
    try {
      const savedTasks = JSON.parse(localStorage.getItem("tasks") || "[]");
      setTasks(Array.isArray(savedTasks) ? savedTasks : []);
    } catch (error) {
      console.error("Error loading tasks:", error);
      setTasks([]);
    }
    
    const savedTheme = localStorage.getItem("theme");
    setDarkMode(savedTheme === "dark");
  }, []);

  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]);

  const toggleDarkMode = () => {
    const next = !darkMode;
    setDarkMode(next);
    localStorage.setItem("theme", next ? "dark" : "light");
  };

  const handleAddTask = (e) => {
    e.preventDefault();
    if (!newTaskDesc.trim()) return;

    const newTask = {
      id: Date.now(),
      desc: newTaskDesc,
      status: "toDo",
    };

    setTasks([...tasks, newTask]);
    setNewTaskDesc("");
    setCreateTask(false);
  };

  const handleDelete = (id) => {
    const updatedTasks = tasks.filter((task) => task.id !== id);
    setTasks(updatedTasks);
  };

  const handleMoveRight = (id) => {
    setTasks((prevTasks) =>
      prevTasks.map((task) => {
        if (task.id === id) {
          if (task.status === "toDo") return { ...task, status: "inProgress" };
          if (task.status === "inProgress") return { ...task, status: "complete" };
        }
        return task;
      })
    );
  };
  

  return (
    <div className={`${darkMode ? "dark" : ""} min-h-screen`}>
      <div
        className={`font-sans relative grid grid-rows-[20px_1fr_20px] min-h-screen p-8 pb-20 gap-16 sm:p-20 transition-all duration-300 ${
          createTask ? "backdrop-blur-sm" : ""
        }`}
        style={{
          backgroundColor: "var(--background)",
          color: "var(--foreground)",
        }}
      >
        {createTask && (
          <div className="absolute inset-0 flex items-center justify-center z-10">
            <div
              className={`p-6 rounded-lg shadow-lg ${
                darkMode ? "bg-gray-800 text-white" : "bg-white text-black"
              }`}
            >
              <b className="block mb-2 w-100">Create Task</b>
              <form onSubmit={handleAddTask}>
                <input
                  type="text"
                  value={newTaskDesc}
                  onChange={(e) => setNewTaskDesc(e.target.value)}
                  placeholder="Enter task..."
                  className={`border rounded-md p-2 mb-4 w-full outline-none ${
                    darkMode
                      ? "bg-gray-700 text-white placeholder-gray-400"
                      : "bg-gray-100 text-black placeholder-gray-500"
                  }`}
                />
                <div className="flex gap-4 justify-end">
                  <button
                    type="submit"
                    className="btn border rounded-full bg-green-400 px-4 py-2 cursor-pointer hover:bg-green-600 transition-all duration-200"
                  >
                    <b>Add</b>
                  </button>
                  <button
                    type="button"
                    onClick={() => setCreateTask(false)}
                    className="btn border rounded-full bg-red-400 px-4 py-2 cursor-pointer hover:bg-red-600 transition-all duration-200"
                  >
                    <b>Cancel</b>
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        <main className="grid grid-rows-2 grid-cols-3 gap-[32px] row-start-2 items-start">
          <div className="col col-span-1 text-center border border-gray-400 rounded-md p-2">
            <b>To Do</b>
            <div className="bg-blue-400/20 text-left p-2 rounded-md mt-2">
              {tasks
                .filter((t) => t.status === "toDo")
                .map((task) => (
                  <Task
                    key={task.id}
                    task={task}
                    onDelete={() => handleDelete(task.id)}
                    darkMode={darkMode}
                    moveRight={() => {handleMoveRight(task.id)}}
                  />
                ))}
            </div>
          </div>

          <div className="col col-span-1 text-center border border-gray-400 rounded-md p-2">
            <b>In Progress</b>
            <div className="bg-yellow-400/20 text-left p-2 rounded-md mt-2">
              {tasks
                .filter((t) => t.status === "inProgress")
                .map((task) => (
                  <Task
                    key={task.id}
                    task={task}
                    onDelete={() => handleDelete(task.id)}
                    darkMode={darkMode}
                  />
                ))}
            </div>
          </div>

          <div className="col col-span-1 text-center border border-gray-400 rounded-md p-2">
            <b>Complete</b>
            <div className="bg-green-400/20 text-left p-2 rounded-md mt-2">
              {tasks
                .filter((t) => t.status === "complete")
                .map((task) => (
                  <Task
                    key={task.id}
                    task={task}
                    onDelete={() => handleDelete(task.id)}
                    darkMode={darkMode}
                  />
                ))}
            </div>
          </div>
        </main>

        <footer className="row-start-3 flex gap-[24px] flex-wrap items-center">
          <button
            onClick={() => setCreateTask(true)}
            className="btn border rounded-full bg-orange-400 w-10 h-10 cursor-pointer hover:scale-120 transition-all duration-200"
          >
            <b>+</b>
          </button>
          <button className="btn border rounded-full bg-red-400 w-10 h-10 cursor-pointer hover:scale-120 transition-all duration-200">
            <b>–</b>
          </button>
          <button className="btn border rounded-full bg-blue-400 w-10 h-10 cursor-pointer hover:scale-120 transition-all duration-200">
            <b>?</b>
          </button>
          <button
            onClick={toggleDarkMode}
            className={`btn border rounded-full h-10 w-10 flex items-center justify-center hover:scale-120 transition-all duration-200 cursor-pointer ${
              darkMode ? "bg-white text-black" : "bg-black text-white"
            }`}
          >
            {darkMode ? <FiSun size={20} /> : <FiMoon size={20} />}
          </button>
        </footer>
      </div>
    </div>
  );
}
