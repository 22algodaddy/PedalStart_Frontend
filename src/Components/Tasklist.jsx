import React, { useState } from 'react';

const TaskList = ({ tasks, onDeleteTask, onEditTask }) => {
  const [editingTaskId, setEditingTaskId] = useState(null);
  const [editedTask, setEditedTask] = useState({});

  const handleEditChange = (field, value) => {
    setEditedTask(prevState => ({
      ...prevState,  
      [field]: value
    }));
  };

  const handleEditSave = async (taskId) => {
    try {
      const editedTaskWithId = { ...editedTask, _id: taskId };
      await onEditTask(editedTaskWithId);
      setEditingTaskId(null);
      setEditedTask({});
    } catch (error) {
      console.error('Error editing task:', error);
    }
  };

  return (
    <ul className="divide-y divide-gray-300">
      {tasks.map(task => (
        <li key={task._id} className="py-4">
          {editingTaskId === task._id ? (
            <div className="flex flex-col mb-2">
              <input type="text" value={editedTask.title } onChange={(e) => handleEditChange('title', e.target.value)} className="border rounded py-1 px-2 mb-2" placeholder='Title'/>
              <textarea value={editedTask.description } onChange={(e) => handleEditChange('description', e.target.value)} className="border rounded py-1 px-2 mb-2" placeholder='Description'/>
              <input type="date" value={editedTask.dueDate } onChange={(e) => handleEditChange('dueDate', e.target.value)} className="border rounded py-1 px-2 mb-2" placeholder='Due Date'/>
              <button onClick={() => handleEditSave(task._id)} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 mb-2 rounded focus:outline-none focus:shadow-outline mr-2">Save</button>
              <button onClick={() => setEditingTaskId(null)} className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">Cancel</button>
            </div>
          ) : (
            <div>
              <div className="mb-2">
                <span className="text-lg font-bold">{task.title}</span>
              </div>
              <div className="mb-2">{task.description}</div>
              <div className="mb-2">Due Date: {task.dueDate}</div>
              <div className="flex">
                <button onClick={() => setEditingTaskId(task._id)} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline mr-2">Edit</button>
                <button onClick={() => onDeleteTask(task._id)} className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">Delete</button>
              </div>
            </div>
          )}
        </li>
      ))}
    </ul>
  );
};

export default TaskList;
