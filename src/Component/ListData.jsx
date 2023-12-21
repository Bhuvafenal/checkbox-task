
import React, { useState } from 'react';
import Task from './Task';

const TaskList = ({ tasks, onDelete, onToggle, onEdit, onUpdate, editTaskId }) => {
  return (
    <div>
      {tasks.map((task) => (
        <Task
          key={task.id}
          task={task}
          onDelete={onDelete}
          onToggle={onToggle}
          onEdit={onEdit} 
          onUpdate={onUpdate}
          isEditing={editTaskId === task.id}
        />
      ))}
    </div>
  );
};

export default TaskList;