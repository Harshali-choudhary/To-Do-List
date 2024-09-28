import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import AddTask from './components/AddTask';
import TaskList from './components/TaskList';
import './App.css';

const App = () => {
    const [tasks, setTasks] = useState([]);
    const [editingTask, setEditingTask] = useState(null);

    const handleAddOrUpdateTask = (task) => {
        if (editingTask) {
            // Update only the task with the matching id
            const updatedTasks = tasks.map((t) =>
                t.id === editingTask.id ? { ...task, id: editingTask.id } : t
            );
            setTasks(updatedTasks);
            setEditingTask(null);  // Clear the editing state
        } else {
            // Add a new task
            setTasks([...tasks, { ...task, id: Date.now() }]);
        }
    };

    const handleDeleteTask = (id) => {
        setTasks(tasks.filter((task) => task.id !== id));
    };

    const handleEditTask = (taskId) => {
        const taskToEdit = tasks.find((task) => task.id === taskId);
        setEditingTask(taskToEdit); // Set the task to be edited
    };

    return (
        <Router>
            <div className="app-container">
                <h1>To-Do List</h1>
                <Routes>
                    <Route 
                        path="/" 
                        element={
                            <TaskList 
                                tasks={tasks} 
                                onDelete={handleDeleteTask} 
                                onEdit={handleEditTask} 
                            />
                        } 
                    />
                    <Route 
                        path="/add-task" 
                        element={
                            <AddTask 
                                onAddTask={handleAddOrUpdateTask} 
                                editingTask={null}  // Pass null for adding a new task
                            />
                        } 
                    />
                    <Route 
                        path="/edit-task/:id" 
                        element={
                            <AddTask 
                                onAddTask={handleAddOrUpdateTask} 
                                editingTask={editingTask}  // Pass the task to edit
                            />
                        } 
                    />
                </Routes>
            </div>
        </Router>
    );
};

export default App;
