"use client"
import React, { useEffect, useState } from 'react';
import TaskComponent from '@/components/TaskComponent';

export default function DeleteTask() {
    const [tasks, setTasks] = useState([]);

    useEffect(() => {
        if (!localStorage.getItem('tasks')) {
            localStorage.setItem("tasks", "[]");
        }
        const savedTasks = JSON.parse(localStorage.getItem("tasks") || "[]");
        setTasks(savedTasks || []);
    }, [])

    useEffect(() => {
        localStorage.setItem("tasks", JSON.stringify(tasks));
    }, [tasks])

    const handleDelete = (id) => {
        const updatedTasks = tasks.filter((task) => task.id !== id);
        setTasks(updatedTasks);
    }

    return (
        <div className="space-y-2">
            {tasks.map((task) => (
                <TaskComponent
                key={task.id}
                task={task}
                onDelete={() => handleDelete(task.id)}
                />
            ))}
        </div>
    )
}