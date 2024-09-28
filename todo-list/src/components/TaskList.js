import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { getTasks } from '../services/TaskService'; // Import the function to fetch tasks

const TaskList = ({ onDelete, onEdit }) => {
    const [tasks, setTasks] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const navigate = useNavigate();

    // Fetch tasks when the component mounts
    useEffect(() => {
        fetchTasks(); // Fetch tasks on page load
    }, []);

    // Function to fetch tasks from the backend
    const fetchTasks = async () => {
        try {
            const taskData = await getTasks(); // Call the backend service
            setTasks(taskData); // Update the state with fetched tasks
        } catch (error) {
            console.error('Failed to fetch tasks:', error);
            alert('Error fetching tasks. Please try again later.'); // Basic error handling
        }
    };

    // Function to handle search input changes
    const handleSearchChange = (e) => {
        setSearchTerm(e.target.value);
    };

    // Filter tasks based on search term
    const filteredTasks = tasks.filter(task => 
        task.assignedTo.toLowerCase().includes(searchTerm.toLowerCase()) || 
        task.description.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const handleEditTask = (taskId) => {
        const taskToEdit = tasks.find((task) => task.id === taskId);
        onEdit(taskToEdit);  // Set the task to edit
        navigate(`/edit-task/${taskId}`);  // Navigate to the edit task page
    };

    return (
        <div className="task-list">
            <h2>Task List</h2> {/* Heading for the Task List */}

            {/* Task controls: Add Task, Refresh, and Search */}
            <div className="task-controls">
                <Link to="/add-task" className="task-button">Add Task</Link>
                <button onClick={fetchTasks} className="task-button">Refresh</button> {/* Call fetchTasks on refresh */}
                <input
                    type="text"
                    value={searchTerm}
                    onChange={handleSearchChange}
                    placeholder="Search by Assigned To or Description"
                    className="task-search"
                />
            </div>

            {/* List of tasks */}
            <ul>
                {filteredTasks.length === 0 ? (
                    <p>No tasks available</p>
                ) : (
                    filteredTasks.map((task) => (
                        <li key={task.id} className="task-item">
                            <div>{task.assignedTo}</div>
                            <div>{task.status}</div>
                            <div>{task.priority}</div>
                            <div>{task.dueDate}</div>
                            <div>{task.description}</div>
                            <div>
                                <button onClick={() => handleEditTask(task.id)}>Edit Task</button>
                                <button onClick={() => onDelete(task.id)}>Delete Task</button>
                            </div>
                        </li>
                    ))
                )}
            </ul>
        </div>
    );
};

export default TaskList;
