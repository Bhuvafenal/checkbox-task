import React, { useState, useEffect } from 'react';
import TaskList from './ListData';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';

const CheckboxForm = () => {
  const [taskdata, settaskdata] = useState([]);
  const [newTask, setNewTask] = useState('');
  const [fildata, setfildata] = useState('all');
  const [editTaskId, setEditTaskId] = useState(null);

  useEffect(() => {
    const storeddata = JSON.parse(localStorage.getItem('taskdata')) || [];
    if (storeddata.length > 0) {
      settaskdata(storeddata);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('tasks', JSON.stringify(taskdata));
  }, [taskdata]);

  const addTask = () => {
    if (newTask.trim() !== '') {
      settaskdata((prevlist) => [
        ...prevlist,
        { id: Date.now(), title: newTask, completed: false }
      ]);
      setNewTask('');
    }
  };

  const deleteTask = (taskId) => {
    settaskdata(taskdata.filter((task) => task.id !== taskId));
  };

  const toggleTask = (taskId) => {
    settaskdata(
      taskdata.map((task) =>
        task.id === taskId ? { ...task, completed: !task.completed } : task
      )
    );
  };

  const editTask = (taskId) => {
    setEditTaskId(taskId);
  };

  const updateTask = (taskId, updatedTitle) => {
    settaskdata(
      taskdata.map((task) =>
        task.id === taskId ? { ...task, title: updatedTitle } : task
      )
    );
    setEditTaskId(null);
  };


  const filteredTasks = taskdata.filter((task) => {
    if (fildata === 'completed') {
      return task.completed;
    } else if (fildata === 'uncompleted') {
      return !task.completed;
    }
    return true;
  });

  return (
    <div className='main'>
      <div className='form_div'>
        <Form>
          <h1 style={{ textAlign: 'center' }}>Task Manager</h1>
          <Form.Label className='fs-5'>Title:</Form.Label>
          <Form.Control type="text" placeholder="Enter Title"
            value={newTask}
            onChange={(e) => setNewTask(e.target.value)} />
          <Button variant="primary" onClick={addTask} className='mt-3'>
            Submit
          </Button>
        </Form>
      </div>
      <div className='button_div'>
        <button
          className={`btn btn btn-outline-dark ${fildata === 'all' ? 'active' : ''}`} onClick={() => setfildata('all')}
        >All</button>
        <button
          className={`btn btn btn-outline-dark ms-2 ${fildata === 'completed' ? 'active' : ''}`}
          onClick={() => setfildata('completed')}>Completed</button>
        <button 
          className={`btn btn btn-outline-dark ms-2 ${fildata === 'uncompleted' ? 'active' : ''}`}
        onClick={() => setfildata('uncompleted')}>Uncompleted</button>
      <TaskList
        tasks={filteredTasks}
        onDelete={deleteTask}
        onToggle={toggleTask}
        onEdit={editTask} 
        onUpdate={updateTask} 
        editTaskId={editTaskId} 
      />
      </div>
    </div>
  );
};

export default CheckboxForm;


