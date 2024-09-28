import React, { useState, useEffect } from 'react';

const AddTask = ({ onAddTask, editingTask }) => {
    const [task, setTask] = useState({
        assignedTo: '',
        status: 'Pending',
        priority: 'Medium',
        dueDate: '',
        description: '',
    });

    // Prepopulate the form with the task to edit (if available)
    useEffect(() => {
        if (editingTask) {
            setTask({
                ...editingTask,
                dueDate: editingTask.dueDate ? new Date(editingTask.dueDate).toISOString().split("T")[0] : '',
            });
        }
    }, [editingTask]);

    const handleChange = (e) => {
        setTask({
            ...task,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        try {
            onAddTask(task);  // Call the parent function to add or update the task
            // Clear the form after submission
            setTask({
                assignedTo: '',
                status: 'Pending',
                priority: 'Medium',
                dueDate: '',
                description: '',
            });
        } catch (error) {
            console.error('Error saving task:', error);
            alert('Error saving task. Please try again.');
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <h2>{editingTask ? 'Edit Task' : 'Add New Task'}</h2>
            <input
                type="text"
                name="assignedTo"
                value={task.assignedTo}
                onChange={handleChange}
                placeholder="Assigned To"
                required
            />
            <select name="status" value={task.status} onChange={handleChange}>
                <option value="Pending">Pending</option>
                <option value="Completed">Completed</option>
            </select>
            <select name="priority" value={task.priority} onChange={handleChange}>
                <option value="High">High</option>
                <option value="Medium">Medium</option>
                <option value="Low">Low</option>
            </select>
            <input
                type="date"
                name="dueDate"
                value={task.dueDate}
                onChange={handleChange}
                required
            />
            <textarea
                name="description"
                value={task.description}
                onChange={handleChange}
                placeholder="Description"
            />
            <button type="submit">{editingTask ? 'Update Task' : 'Add Task'}</button>
        </form>
    );
};

export default AddTask;
