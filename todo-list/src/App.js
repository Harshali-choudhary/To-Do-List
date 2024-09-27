import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'; 
import AddTask from './components/AddTask';
import TaskList from './components/TaskList';
import './App.css';

const App = () => {
    const [tasks, setTasks] = React.useState([]);
    const [editingTask, setEditingTask] = React.useState(null);

    const handleAddOrUpdateTask = (task) => {
        if (editingTask) {
            const updatedTasks = tasks.map((t) =>
                t.id === task.id ? task : t
            );
            setTasks(updatedTasks);
            setEditingTask(null);
        } else {
            setTasks([...tasks, { ...task, id: Date.now() }]);
        }
    };

    const handleDeleteTask = (id) => {
        setTasks(tasks.filter((task) => task.id !== id));
    };

    const handleEditTask = (taskId) => {
        const taskToEdit = tasks.find((task) => task.id === taskId);
        setEditingTask(taskToEdit);
    };

    return (
        <Router>
            <div className="app-container">
                <h1>To-Do List</h1> 

                <Routes>
                    <Route path="/" element={<TaskList tasks={tasks} onDelete={handleDeleteTask} onEdit={handleEditTask} />} />
                    <Route path="/add-task" element={<AddTask onAddTask={handleAddOrUpdateTask} />} />
                    <Route path="/edit-task/:id" element={<AddTask onAddTask={handleAddOrUpdateTask} tasks={tasks} />} />
                </Routes>
            </div>
        </Router>
    );
};

export default App;
