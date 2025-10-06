import React from 'react';
import { FiTrash, FiArrowRight, FiArrowLeft, FiArrowRightLeft } from "react-icons/fi";

export default function TaskComponent({task, onDelete}){
    return(
        <div className='cursor-pointer px-3 pt-4'>
            <p className='whitespace-normal break-words'>{task.desc}</p>
            <div className='flex justify-end gap-2'>
                <button className="btn border rounded-full bg-gray-400 w-7 h-7 cursor-pointer 
                hover:scale-120 hover:bg-blue-400 transition-all duration-200 flex items-center justify-center">
                    {task.status === 'toDo' ? (<FiArrowRight size={15} />)
                        : task.status === 'inProgress' ? (<FiArrowRightLeft size={15} />)
                        : (<FiArrowLeft size={15} />)}
                </button>
                <button className="btn border rounded-full bg-gray-400 w-7 h-7 cursor-pointer
                hover:scale-120 hover:bg-red-400 transition-all duration-200 flex items-center justify-center"
                onClick={onDelete}>
                    <FiTrash size={15} />
                </button>
            </div>
        </div>
    )
}