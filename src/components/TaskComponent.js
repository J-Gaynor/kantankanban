import React from 'react';

class TaskItem {
    text = '';
}

export default function TaskComponent({text}){
    return(
        <div className='bg-gray-400 cursor-pointer'>
            <p>{text}</p>
        </div>
    )
}