"use client";
import Image from "next/image";
import Task from './containers/Task';
import React, { useState, useEffect } from 'react';
import { FiSun, FiMoon } from "react-icons/fi";


export default function KantanKanban() {
  const [darkMode, setDarkMode] = useState(true);
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    if (!localStorage.getItem('tasks')) {
      localStorage.setItem('tasks', '[]');
    }
    const savedTasks = JSON.parse(localStorage.getItem('tasks'));    
    const saved = localStorage.getItem('theme');


    if (saved === 'dark') setDarkMode(true);
    else if (saved === 'light') setDarkMode(false);

    setTasks(savedTasks || []);
  }, []);

  useEffect(() => {
    localStorage.setItem('tasks', JSON.stringify(tasks));
  }, [tasks])

  const toggleDarkMode = () => {
    const next = !darkMode;
    setDarkMode(next);
    localStorage.setItem('theme', next ? 'dark' : 'light');
  };

  return (
    <div className={`${darkMode ? 'dark' : ''} min-h-screen`}>
      <div className="font-sans grid grid-rows-[20px_1fr_20px] min-h-screen p-8 pb-20 gap-16 sm:p-20" 
      style={{ backgroundColor: 'var(--background)', color: 'var(--foreground)' }}>
        <main className="grid grid-rows-2 grid-cols-3 gap-[32px] row-start-2 items-center sm:items-start">
          <div className='col col-span-1 text-center border border-white'>
            <b>To Do</b>
            <div>
              <div className='bg-blue text-left padding padding-sm'>
                {tasks.map((task) => task.status === 'toDo' && <Task key={task.id} desc={task.desc}/>)}
              </div>
            </div>
          </div>
          <div className='col col-span-1 text-center border border-white dark'>
            <b>In Progress</b>
            <div>
              <div className='bg-blue text-left padding padding-sm'>
                {tasks.map((task) => task.status === 'inProgress' && <Task key={task.id} desc={task.desc}/>)}
              </div>
            </div>
          </div>
          <div className='col col-span-1 text-center border border-white'>
            <b>Complete</b>
            <div>
              <div className='bg-blue text-left padding padding-sm'>
                {tasks.map((task) => task.status === 'complete' && <Task key={task.id} desc={task.desc}/>)}
              </div>
            </div>
          </div>
        </main>
        <footer className="row-start-3 flex gap-[24px] flex-wrap items-center">
          <button className='btn border rounded-full bg-orange-400 w-10 h-10 cursor-pointer hover:scale-120 transition-all duration-200'>
            <b>+</b>
          </button>
          <button className='btn border rounded-full bg-red-400 w-10 h-10 cursor-pointer hover:scale-120 transition-all duration-200'>
            <b>–</b>
          </button>
          <button className='btn border rounded-full bg-blue-400 w-10 h-10 cursor-pointer hover:scale-120 transition-all duration-200'>
            <b>?</b>
          </button>
          <button
            onClick={toggleDarkMode}
            className={`btn border rounded-full h-10 w-10 flex items-center justify-center hover:scale-120 transition-all duration-200 cursor-pointer
              ${darkMode ? 'bg-white text-black' : 'bg-black text-white'}`}
          >
            {darkMode ? <FiSun size={20} /> : <FiMoon size={20} />}
          </button>
        </footer>
      </div>
    </div>
  );  
}
