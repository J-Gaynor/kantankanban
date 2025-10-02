import { useState } from 'react'

export default function CreateNewTaskComponent() {
    class TaskItem {
        id = 0
        desc = '';
        status = 'toDo'
    }

    const addTask = ({taskDesc}) => {
        const tasks = JSON.parse(localStorage.get('tasks'));
        const taskLength = tasks.keys.length();

        const newTask = new(TaskItem);
        newTask.id = taskLength
        newTask.desc = taskDesc;
        
        tasks.taskLength = taskDesc;
    }


    return (
        <div>
            <div className='grid grid-rows-2'> 
                <form onSubmit={addTask(e)}>
                    <input type='text' className='input textbox'/>
                    <div className='grid grid-rows-2'> 
                        <button className='btn border rounded-half bg-green-400 w-20 h-10 cursor-pointer hover:bg-green-800 transition-all duration-200' onClick={submit}>
                            <b>Add</b>
                        </button>
                        <button className='btn border rounded-half bg-red-400 w-20 h-10 cursor-pointer hover:bg-red-800 transition-all duration-200'>
                            <b>Discard</b>
                        </button>
                    </div>
                </form>
            </div>
        </div>
    )
}