import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import './AddTask.css';

const AddTask = ({ onAddTask, tasks }) => {
    const [assignedTo, setAssignedTo] = useState('');
    const [status, setStatus] = useState('Pending');
    const [priority, setPriority] = useState('Medium');
    const [dueDate, setDueDate] = useState('');
    const [description, setDescription] = useState('');
    const { id } = useParams(); // Get the task ID from the URL
    const navigate = useNavigate(); // Use useNavigate instead of useHistory

    useEffect(() => {
        if (id) {
            const taskToEdit = tasks.find((task) => task.id === parseInt(id));
            if (taskToEdit) {
                setAssignedTo(taskToEdit.assignedTo);
                setStatus(taskToEdit.status);
                setPriority(taskToEdit.priority);
                setDueDate(taskToEdit.dueDate);
                setDescription(taskToEdit.description);
            }
        }
    }, [id, tasks]);

    const handleSubmit = (e) => {
        e.preventDefault();
        const newTask = {
            id: id ? parseInt(id) : Date.now(),
            assignedTo,
            status,
            priority,
            dueDate,
            description,
        };
        onAddTask(newTask);
        navigate('/'); // Redirect back to Task List after adding/updating
    };

    return (
        <form onSubmit={handleSubmit} className="task-form">
            <h2>{id ? 'Edit Task' : 'Add New Task'}</h2>
                <div style={{marginBottom : '20px',flexDirection : 'row'}}>
                    
            <textarea
                value={assignedTo}
                onChange={(e) => setAssignedTo(e.target.value)}
                placeholder="Assigned To" // Updated placeholder
                className="task-input" // Ensure the class applies styling
                required
            />
            <select
                value={status}
                onChange={(e) => setStatus(e.target.value)}
                className="task-select"
            >
                <option value="Pending">Pending</option>
                <option value="Completed">Completed</option>
            </select>
            <select
                value={priority}
                onChange={(e) => setPriority(e.target.value)}
                className="task-select"
            >
                <option value="High">High</option>
                <option value="Medium">Medium</option>
                <option value="Low">Low</option>
            </select>
            <input
                type="date"
                value={dueDate}
                onChange={(e) => setDueDate(e.target.value)}
                className="task-input"
                required
            />
            <textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Task Description"
                className="task-textarea"
            />
            <br>
            </br>
            <button type="submit" className="task-button">
                {id ? 'Update Task' : 'Add Task'}
            </button>
            </div>
        </form>
    );
};

export default AddTask;
