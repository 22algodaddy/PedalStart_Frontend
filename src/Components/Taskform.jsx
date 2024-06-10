
import React, { useState } from 'react';

const TaskForm = ({ onAddTask }) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [dueDate, setDueDate] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    onAddTask({ title, description, dueDate });
    setTitle('');
    setDescription('');
    setDueDate('');
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-md mx-auto">
  <div className="mb-4">
    <label htmlFor="title" className="block text-gray-700 text-sm font-bold mb-2">Title</label>
    <input id="title" type="text" value={title} onChange={(e) => setTitle(e.target.value)} placeholder="Title" className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" />
  </div>
  <div className="mb-4">
    <label htmlFor="description" className="block text-gray-700 text-sm font-bold mb-2">Description</label>
    <textarea id="description" value={description} onChange={(e) => setDescription(e.target.value)} placeholder="Description" className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"></textarea>
  </div>
  <div className="mb-4">
    <label htmlFor="dueDate" className="block text-gray-700 text-sm font-bold mb-2">Due Date</label>
    <input id="dueDate" type="date" value={dueDate} onChange={(e) => setDueDate(e.target.value)} className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" />
  </div>
  <button type="submit" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">Add Task</button>
</form>

  );
};

export default TaskForm;
