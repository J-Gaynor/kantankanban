import React from 'react';
import { FiTrash, FiArrowRight, FiArrowLeft } from "react-icons/fi";
import { useDraggable } from '@dnd-kit/core';

export default function TaskComponent({
  task,
  onDelete,
  darkMode,
  moveRight,
  moveLeft,
  currentHover,
  isOverlay = false
}) {
  const { attributes, listeners, setNodeRef, isDragging } = useDraggable({
    id: task.id.toString(),
  });

  const getBackgroundClass = (currentHover) => {
    if (currentHover) {
      switch (currentHover) {
        case "toDo":
          return "bg-blue-400/20";
        case "inProgress":
          return "bg-yellow-400/20";
        case "complete":
          return "bg-green-400/20";
        default:
          return "bg-gray-400/20";
      }
    }
    return "bg-gray-400/20";
  };

  return (
    <div
      ref={setNodeRef}
      className={`rounded-md shadow-md border transition-colors duration-150 mb-1
        ${darkMode ? "text-white border-gray-600" : "text-black border-gray-300"}
        ${isDragging ? "opacity-70" : ""}
        ${isOverlay ? getBackgroundClass(currentHover) : getBackgroundClass(null)}
      `}
    >

      {/* ✅ Only this section is draggable */}
      <div
        className="cursor-grab active:cursor-grabbing px-3 py-4 bg-gray-400/20"
        {...attributes}
        {...listeners}
      >
        <p className="whitespace-normal break-words">{task.desc}</p>
      </div>

      {/* ✅ Buttons stay clickable */}
      <div className="flex justify-end gap-2 px-3 py-1">
        {task.status === 'toDo' && (
          <button
            className={`rounded-full w-6 h-6 flex items-center justify-center transition-all duration-200 hover:scale-110
              ${darkMode
                ? "border bg-gray-700 text-white hover:bg-blue-500"
                : "border bg-gray-400 text-black hover:bg-blue-400"}`}
            onClick={(e) => {
              e.stopPropagation();
              moveRight();
            }}
          >
            <FiArrowRight size={10} />
          </button>
        )}

        {task.status === 'inProgress' && (
          <>
            <button
              className={`rounded-full w-6 h-6 flex items-center justify-center transition-all duration-200 hover:scale-110
                ${darkMode
                  ? "border bg-gray-700 text-white hover:bg-blue-500"
                  : "border bg-gray-400 text-black hover:bg-blue-400"}`}
              onClick={(e) => {
                e.stopPropagation();
                moveLeft();
              }}
            >
              <FiArrowLeft size={10} />
            </button>
            <button
              className={`rounded-full w-6 h-6 flex items-center justify-center transition-all duration-200 hover:scale-110
                ${darkMode
                  ? "border bg-gray-700 text-white hover:bg-blue-500"
                  : "border bg-gray-400 text-black hover:bg-blue-400"}`}
              onClick={(e) => {
                e.stopPropagation();
                moveRight();
              }}
            >
              <FiArrowRight size={10} />
            </button>
          </>
        )}

        {task.status === 'complete' && (
          <button
            className={`rounded-full w-6 h-6 flex items-center justify-center transition-all duration-200 hover:scale-110
              ${darkMode
                ? "border bg-gray-700 text-white hover:bg-blue-500"
                : "border bg-gray-400 text-black hover:bg-blue-400"}`}
            onClick={(e) => {
              e.stopPropagation();
              moveLeft();
            }}
          >
            <FiArrowLeft size={10} />
          </button>
        )}

        <button
          onClick={(e) => {
            e.stopPropagation();
            onDelete();
          }}
          className={`rounded-full w-6 h-6 flex items-center justify-center transition-all duration-200 hover:scale-110
            ${darkMode
              ? "border bg-gray-700 text-white hover:bg-red-500"
              : "border bg-gray-400 text-black hover:bg-red-400"}`}
        >
          <FiTrash size={10} />
        </button>
      </div>
    </div>
  );
}
