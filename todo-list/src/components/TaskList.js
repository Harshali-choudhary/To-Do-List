import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const TaskList = ({ tasks, onDelete, onEdit }) => {
    const [searchTerm, setSearchTerm] = useState('');

    // Handle search input change
    const handleSearchChange = (e) => {
        setSearchTerm(e.target.value);
    };

    // Filter tasks based on search term
    const filteredTasks = tasks.filter(task => 
        task.assignedTo && task.assignedTo.toLowerCase().includes(searchTerm.toLowerCase())
    );

    // Refresh tasks (for demo purposes, just log a message)
    const handleRefresh = () => {
        console.log("Tasks refreshed");
        // You can implement a real refresh logic if fetching from an API
    };

    return (
        <div className="task-list">
            <h2>Task List</h2>
            {/* Task controls: Add Task, Refresh and Search */}
            <div className="task-controls">
                <Link to="/add-task" className="task-button">Add Task</Link>
                <button onClick={handleRefresh} className="task-button">Refresh</button>
                <input
                    type="text"
                    value={searchTerm}
                    onChange={handleSearchChange}
                    placeholder="Search by Assigned To"
                    className="task-search"
                />
            </div>

            {/* Table header */}
            <div className="task-table-header">
                <div><strong>Assigned To</strong></div>
                <div><strong>Status</strong></div>
                <div><strong>Priority</strong></div>
                <div><strong>Due Date</strong></div>
                <div><strong>Description</strong></div>
                <div><strong>Actions</strong></div> {/* Optional Actions column for buttons */}
            </div>

            <ul>
                {filteredTasks.length === 0 ? (
                    <p>No tasks available</p>
                ) : (
                    filteredTasks.map((task) => (
                        <li key={task.id} className="task-item">
                            <input type="checkbox" />
                            <div>{task.assignedTo}</div>
                            <div>{task.status}</div>
                            <div>{task.priority}</div>
                            <div>{task.dueDate}</div>
                            <div>{task.description}</div>
                            <div>
                                <Link to={`/edit-task/${task.id}`} className="task-button">Edit Task</Link>
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
