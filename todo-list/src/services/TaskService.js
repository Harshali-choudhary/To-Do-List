const tasks = [];

export const getTasks = () => tasks;

export const addTasks = (task) => {
    tasks.push(task);
};

export const deleteTasks = (id) => {
    const index = tasks.findIndex(t => t.id === id);

    if(index !== -1)
    {
        tasks.splice(index,1);
    }
};

export const updateTasks =(updatedTask) => {
    const index = tasks.findIndex(t => t.id === updatedTask.id);
    if(index !== -1)
    {
        tasks[index] = updatedTask;
    }
};


