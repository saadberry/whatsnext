/*
Dashboard page for user
*/
'use client';

import { useState, useEffect, useCallback } from 'react';
import '@fortawesome/fontawesome-free/css/all.min.css';
import { 
  ERROR, ERROR_MSG, SUCCESS, SUCCESSFUL_POST, 
  SUCCESSFUL_UPDATE, SUCCESSFUL_DELETE, BASE_URL
} from '../../utils/constants';


export default function Dashboard() {
  const [todos, setTodos] = useState([]);
  const [error, setError] = useState('');
  const [showForm, setShowAddForm] = useState(false);
  const [showUpdateForm, setShowUpdateForm] = useState(false);
  const [newTask, setNewTask] = useState('');
  const [newTaskDescription, setNewTaskDescription] = useState('');
  const [selectedTodo, setSelectedTodo] = useState(null);
  const [notification, setNotification] = useState({ message: "", type: "" });
  const [jwtToken, setJwtToken] = useState(null);

  const showNotification = (message, type = "success") => {
    setNotification({ message, type });
    console.log(`notification=${JSON.stringify(notification)}`)
    setTimeout(() => setNotification({ message: "", type: "" }), 3000); // Clear notification after 3 seconds
  };

  // Getting jwtToken from local storage
  useEffect(() => {
    const token = localStorage.getItem("jwtToken");
    setJwtToken(token);
  }, []);

  // Fetch todos from the server
  const fetchTodos = useCallback(async () => {
    if (!jwtToken) return;
    try {
      const response = await fetch(`${BASE_URL}/todo`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${jwtToken}`
        },
      });

      if (!response.ok) {
        showNotification(ERROR_MSG, ERROR);
      }

      const data = await response.json();
      console.log(`data=${JSON.stringify(data)}`)
      // Extract relevant data from the backend response
      const extractedTodos = data.response.todos.map((todo) => ({
        id: todo._id,
        title: todo.title,
        description: todo.description,
        status: todo.status,
        isActive: todo.isActive
      }));

      setTodos(extractedTodos);      
  } catch (err) {
      showNotification(ERROR_MSG, ERROR);
      console.error(err);
    }
  }, [jwtToken]);

  useEffect(() => {
    fetchTodos();
  }, [jwtToken, fetchTodos]);

  // Handle marking a todo as completed
  const deleteRecord = async (todo) => {
    try {
        console.log(`todo=>${JSON.stringify(todo)}`)
      const payload = { ...todo  };
      console.log(`payload=>${JSON.stringify(payload)}`)

      // todo: fix API
      const response = await fetch(`${BASE_URL}/todo`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${jwtToken}`
        },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        showNotification(ERROR_MSG, ERROR);
      }

      setTodos((prevTodos) =>
        prevTodos.map((t) => (t.id === todo.id ? payload : t))
      );
      showNotification(SUCCESSFUL_DELETE, SUCCESS);
      fetchTodos()
    } catch (err) {
      showNotification(ERROR_MSG, ERROR);
      console.error(err);
    }
  };

  // Handle updating record
  const handleEditClick = (todo) => {
    console.log(`[handleEditClick] ${JSON.stringify(todo)}`)
    setSelectedTodo(todo);
    setShowUpdateForm(true);
  };

  const handleUpdateTask = async () => {
    console.log(`in handleUpdate!, selectedTodo=${JSON.stringify(selectedTodo)}`)
    try {
        console.log(`todo=>${JSON.stringify(selectedTodo)}`)
      const payload = { ...selectedTodo  };
      console.log(`payload=>${JSON.stringify(payload)}`)
      // todo: fix API
      const response = await fetch(`${BASE_URL}/todo`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${jwtToken}`
        },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        showNotification(ERROR_MSG, ERROR);
      }
      showNotification(SUCCESSFUL_UPDATE, SUCCESS);
      fetchTodos()
    } catch (err) {
      showNotification(ERROR_MSG, ERROR);
      console.error(err);
    }
    setShowUpdateForm(false);
  };

  // Handle adding a new task
  const addTask = async () => {
    if (!newTask.trim()) return;

    try {
      const taskPayload = { title: newTask, description: newTaskDescription, token: jwtToken };
      console.log(`taskPayload=>${JSON.stringify(taskPayload)}`)
      const response = await fetch(`${BASE_URL}/todo`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${jwtToken}`
        },
        body: JSON.stringify(taskPayload),
      });

      if (!response.ok) {
        showNotification(ERROR_MSG, ERROR);
      }

      const newTodo = await response.json();
      setTodos((prevTodos) => [...prevTodos, newTodo]);
      setNewTask('');
      setNewTaskDescription('');
      setShowAddForm(false);
      showNotification(SUCCESSFUL_POST, SUCCESS);
      fetchTodos()
    } catch (err) {
      showNotification(ERROR_MSG, ERROR);
      console.error(err);
    }
  };
  if (!jwtToken) {return "Unauthorized"}

  return (

    <div className="min-h-screen bg-black text-white p-6 flex flex-col justify-between">
      <div className="max-w-2xl mx-auto">
        {notification.message && (
  <div
    className={`fixed bottom-7 left-4 px-4 py-2 rounded-lg ${
      notification.type === "success" ? "bg-green-600" : "bg-red-600"
    } text-white`}
  >
    {notification.message}
  </div>
)}
        {error && (
          <div className="bg-red-600 text-white p-3 rounded-lg mb-4">{error}</div>
        )}
        <div className="overflow-x-auto">
          <table className="table-auto w-full text-center border-collapse border border-gray-700">
            <thead>
              <tr className="bg-gray-900">
                <th className="border border-gray-700 px-4 py-2">Title</th>
                <th className="border border-gray-700 px-4 py-2">Description</th>
                <th className="border border-gray-700 px-4 py-2">Status</th>
                <th className="border border-gray-700 px-4 py-2">Actions</th>
              </tr>
            </thead>
            <tbody>
              {todos.map((todo, index) => (
                <tr key={todo.id || index} className="hover:bg-gray-900">
                  <td className="border border-gray-700 px-4 py-2">{todo.title}</td>
                  <td className="border border-gray-700 px-4 py-2">{todo.description}</td>
                  <td className="border border-gray-700 px-4 py-2">
                    {todo.status}
                  </td>
                  <td className="border border-gray-700 px-4 py-2">
                    <div className="flex justify-center gap-4">
                      {/* Trash Icon */}
                      <div
                        title="Delete Record"
                        className="cursor-pointer text-gray-400 hover:text-red-400"
                        onClick={() => deleteRecord(todo)}
                      >
                        <i className="fas fa-trash"></i>
                      </div>
                      {/* Update Task Form */}
                      {showUpdateForm && (
        <div className="fixed inset-0 bg-black bg-opacity-80 flex items-center justify-center">
          <div className="bg-gray-900 p-6 rounded-lg w-full max-w-sm">
            <h2 className="text-lg font-bold mb-4">Update Task</h2>
            {/* Title Field */}
            <input
              type="text"
              className="w-full p-2 rounded-lg mb-4 bg-gray-800 text-white"
              placeholder="Update title"
              value={selectedTodo?.title || ''}
              onChange={(e) =>
                setSelectedTodo((prev) => ({ ...prev, title: e.target.value }))
              }
            />
              {/* Description Field */}
              <input
              type="text"
              className="w-full p-2 rounded-lg mb-4 bg-gray-800 text-white"
              placeholder="Update description"
              value={selectedTodo?.description || ''}
              onChange={(e) =>
                setSelectedTodo((prev) => ({ ...prev, description: e.target.value }))
              }
            />
            {/* Status Field */}
            <select
              className="w-full p-2 rounded-lg mb-4 bg-gray-800 text-white"
              value={selectedTodo?.status}
              onChange={(e) =>
                setSelectedTodo((prev) => ({
                  ...prev,
                  status: e.target.value,
                }))
              }
            >
              <option value="in-progress">in-progress</option>
              <option value="completed">completed</option>
            </select>
            <div className="flex justify-end gap-4">
              <button
                className="bg-gray-700 text-white px-4 py-2 rounded-lg"
                onClick={() => setShowUpdateForm(false)}
              >
                Cancel
              </button>
              <button
                className="bg-gray-700 text-white px-4 py-2 rounded-lg"
                onClick={handleUpdateTask}
              >
                Update Task
              </button>
            </div>
          </div>
        </div>
      )}
                      {/* Pencil Icon */}
                      <div
                        title="Edit Record"
                        className="cursor-pointer text-gray-400 hover:text-blue-400"
                        onClick={() => handleEditClick(todo)}
                      >
                        <i className="fas fa-edit"></i>
                      </div>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      {/* Add Task Form */}
      {showForm && (
        <div className="fixed inset-0 bg-black bg-opacity-80 flex items-center justify-center">
          <div className="bg-gray-900 p-6 rounded-lg w-full max-w-sm">
            <h2 className="text-lg font-bold mb-4">Add New Task</h2>
            <input
              type="text"
              className="w-full p-2 rounded-lg mb-4 bg-gray-800 text-white"
              placeholder="Enter task title"
              value={newTask}
              onChange={(e) => setNewTask(e.target.value)}
            />
            <input
              type="text"
              className="w-full p-2 rounded-lg mb-4 bg-gray-800 text-white"
              placeholder="Enter task description"
              value={newTaskDescription}
              onChange={(e) => setNewTaskDescription(e.target.value)}
            />
            <div className="flex justify-end gap-4">
              <button
                className="bg-gray-700 text-white px-4 py-2 rounded-lg"
                onClick={() => setShowAddForm(false)}
              >
                Cancel
              </button>
              <button
                className="bg-gray-700 text-white px-4 py-2 rounded-lg"
                onClick={addTask}
              >
                Add Task
              </button>
            </div>
          </div>
        </div>
      )}
      <button
        className="fixed bottom-6 right-6 bg-gray-700 text-white px-6 py-3 rounded-full shadow-lg"
        onClick={() => setShowAddForm(true)}
      >
        Add Task
      </button>
    </div>
  );
  
}
