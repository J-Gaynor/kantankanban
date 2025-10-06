import React from 'react';
import TaskComponent from '@/components/TaskComponent';

export default function Task({ task, onDelete }) {
    return <TaskComponent task={task} onDelete={onDelete} />;
}
  