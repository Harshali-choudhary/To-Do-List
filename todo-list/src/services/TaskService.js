import axios from 'axios';

// Update the API URL to point to your backend
const API_URL = 'http://localhost:3002/tasks'; // Adjusted to port 3002

// Get all tasks
export const getTasks = async () => {
    try {
        const response = await axios.get(API_URL);
        return response.data; // Return the data received
    } catch (error) {
        console.error('Error fetching tasks:', error);
        throw error; // Propagate the error
    }
};

// Add a new task
export const addTask = async (task) => {
    try {
        const response = await axios.post(API_URL, task);
        return response.data; // Return the newly added task
    } catch (error) {
        console.error('Error adding task:', error);
        throw error; // Propagate the error
    }
};

// Update an existing task
export const updateTask = async (id, task) => {
    try {
        const response = await axios.put(`${API_URL}/${id}`, task);
        return response.data; // Return the updated task
    } catch (error) {
        console.error('Error updating task:', error);
        throw error; // Propagate the error
    }
};

// Delete a task
export const deleteTask = async (id) => {
    try {
        await axios.delete(`${API_URL}/${id}`); // Call the delete endpoint
    } catch (error) {
        console.error('Error deleting task:', error);
        throw error; // Propagate the error
    }
};
