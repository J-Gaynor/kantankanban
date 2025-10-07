import React from 'react';
import TaskComponent from '@/components/TaskComponent';

export default function Task({ task, onDelete, darkMode, moveRight }) {
    return <TaskComponent task={task} onDelete={onDelete} darkMode={darkMode} moveRight={moveRight} />;
}
  