import React, { useState, useEffect } from 'react';
import TaskForm from './Components/Taskform';
import TaskList from './Components/Tasklist';

const App = () => {
  const [tasks, setTasks] = useState([]);
  const [showTaskForm, setShowTaskForm] = useState(false);

  useEffect(() => {
    fetchTasks();
  }, []);

  const fetchTasks = async () => {
    try {
      const response = await fetch('/api/tasks');
      if (!response.ok) {
        throw new Error('Failed to fetch tasks');
      }
      const data = await response.json();
      setTasks(data);
    } catch (error) {
      console.error('Error fetching tasks:', error);
    }
  };

  const addTask = async (newTask) => {
    try {
      const response = await fetch('/api/tasks', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newTask),
      });
      if (!response.ok) {
        throw new Error('Failed to add task');
      }
      const data = await response.json();
      setTasks([...tasks, data]);
      setShowTaskForm(false);
    } catch (error) {
      console.error('Error adding task:', error);
    }
  };

  const deleteTask = async (taskId) => {
    try {
      const response = await fetch(`/api/tasks/${taskId}`, {
        method: 'DELETE',
      });
      if (!response.ok) {
        throw new Error('Failed to delete task');
      }
      setTasks(tasks.filter(task => task._id !== taskId));
    } catch (error) {
      console.error('Error deleting task:', error);
    }
  };

  const editTask = async (editedTask) => {
    console.log(editedTask);
    try {
      const response = await fetch(`/api/tasks/${editedTask._id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(editedTask),
      });
      if (!response.ok) {
        throw new Error('Failed to edit task');
      }
      const data = await response.json();
      setTasks(tasks.map(task => task._id === editedTask._id ? data : task));
    } catch (error) {
      console.error('Error editing task:', error);
    }
  };

  return (
    <div className="container mx-auto p-4">
    <h1 className="text-3xl font-bold mb-4">Task Management Application</h1>
    {showTaskForm ? (
      <TaskForm onAddTask={addTask} />
    ) : (
      <>
        <button onClick={() => setShowTaskForm(true)} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline mb-4">Add New Task</button>
        <TaskList tasks={tasks} onDeleteTask={deleteTask} onEditTask={editTask} />
      </>
    )}
  </div>
 
  );
};

export default App;
