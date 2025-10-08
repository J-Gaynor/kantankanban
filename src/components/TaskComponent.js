import React from 'react';
import { FiTrash, FiArrowRight, FiArrowLeft } from "react-icons/fi";
import { useDraggable } from '@dnd-kit/core';


export default function TaskComponent({ task, onDelete, darkMode, moveRight, moveLeft }) {
    const { attributes, listeners, setNodeRef, transform } = useDraggable({
        id: task.id.toString(),
    });

    const style = {
        transform: transform
          ? `translate3d(${transform.x}px, ${transform.y}px, 0)`
          : undefined,
    };

    return (
        <div className="cursor-grab active:cursor-grabbing px-3 pt-4 rounded-md" ref={setNodeRef} style={style}
        {...attributes}{...listeners}>
            <p className="whitespace-normal break-words">{task.desc}</p>

            <div className="flex justify-end gap-2 mt-2">
                {task.status === 'toDo' && (
                    <button
                        className={`rounded-full w-7 h-7 flex items-center justify-center transition-all duration-200 hover:scale-110
                ${darkMode
                                ? "border bg-gray-700 text-white hover:bg-blue-500"
                                : "border bg-gray-400 text-black hover:bg-blue-400"}`}
                        onClick={moveRight}
                    >
                        <FiArrowRight size={15} />
                    </button>
                )}
                {task.status === 'inProgress' && (
                    <>
                        <button
                            className={`rounded-full w-7 h-7 flex items-center justify-center transition-all duration-200 hover:scale-110
                    ${darkMode
                                    ? "border bg-gray-700 text-white hover:bg-blue-500"
                                    : "border bg-gray-400 text-black hover:bg-blue-400"}`}
                            onClick={moveLeft}
                        >
                            <FiArrowLeft size={15} />
                        </button>
                        <button
                            className={`rounded-full w-7 h-7 flex items-center justify-center transition-all duration-200 hover:scale-110
                    ${darkMode
                                    ? "border bg-gray-700 text-white hover:bg-blue-500"
                                    : "border bg-gray-400 text-black hover:bg-blue-400"}`}
                            onClick={moveRight}
                        >
                            <FiArrowRight size={15} />
                        </button>
                    </>
                )}
                {task.status === 'complete' && (
                    <button
                        className={`rounded-full w-7 h-7 flex items-center justify-center transition-all duration-200 hover:scale-110
              ${darkMode
                                ? "border bg-gray-700 text-white hover:bg-blue-500"
                                : "border bg-gray-400 text-black hover:bg-blue-400"}`}
                        onClick={moveLeft}
                    >
                        <FiArrowLeft size={15} />
                    </button>
                )}

                <button
                    onClick={onDelete}
                    className={`rounded-full w-7 h-7 flex items-center justify-center transition-all duration-200 hover:scale-110
            ${darkMode
                            ? "border bg-gray-700 text-white hover:bg-red-500"
                            : "border bg-gray-400 text-black hover:bg-red-400"}`}
                >
                    <FiTrash size={15} />
                </button>
            </div>
        </div>
    );
}
