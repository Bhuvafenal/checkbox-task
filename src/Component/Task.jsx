import React, { useState } from 'react';

const Task = ({ task, onDelete, onToggle, onEdit, onUpdate, isEditing }) => {
  const [updatedTitle, setUpdatedTitle] = useState(task.title);

  const handleUpdate = () => {
    onUpdate(task.id, updatedTitle);
  };

  return (
    <div className='mt-4'>
      <table className='table'>
        <tbody>
          <tr>
            <td>
              <input
                type="checkbox"
                checked={task.completed}
                onChange={() => onToggle(task.id)}
              />
            </td>
            <td>
              <span>{task.title}</span>
            </td>
            <td>
            {isEditing ? (
                <div>
                  <input
                    type="text"
                    value={updatedTitle}
                    onChange={(e) => setUpdatedTitle(e.target.value)}
                  />
                  <button
                    className='btn btn-outline-success ms-2'
                    onClick={handleUpdate}
                  >
                    Update
                  </button>
                </div>
              ) : (
                <button
                  className='btn btn-outline-success'
                  onClick={() => onEdit(task.id)}
                >
                  Edit
                </button>
              )}  
            </td>
            <td>
              <button className='btn btn-outline-danger' onClick={() => onDelete(task.id)}>Delete</button>
            </td>
          </tr>
        </tbody>
      </table>

    </div>
  );
};

export default Task;
