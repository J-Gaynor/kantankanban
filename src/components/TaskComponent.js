import React from 'react';

export default function TaskComponent({desc}){
    return(
        <div className='bg-gray-400 cursor-pointer'>
            <p>{desc}</p>
        </div>
    )
}