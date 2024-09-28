const express=require("express")
const myrouter=express.Router();
const connection=require('../DBConnection/dbConnect')

myrouter.get("/tasks",function(req,res){
    connection.query("select * from tasks",function(err,data,fields){
        if(err){
            res.status(500).send("data  not found")
        }
        else{
            res.json(data)
        }
    })
})

myrouter.post("/tasks", function(req, res) {
    const { assignedTo, status, priority, dueDate, description } = req.body;

    // Log the incoming request body for debugging
    console.log('Request Body:', req.body);

    connection.query(
        "INSERT INTO tasks (assignedTo, status, priority, dueDate, description) VALUES (?, ?, ?, ?, ?)",
        [assignedTo, status, priority, dueDate, description],
        function(err, result) {
            if (err) {
                console.error('Error inserting data:', err); // Log the actual error for debugging
                res.status(500).send("data not inserted");
            } else {
                res.status(200).send("data inserted");
            }
        }
    );
});

myrouter.put("/tasks/:id",function(req,res){
    connection.query("update tasks set assignedTo=?,status=?,priority=?,dueDate=?,description=?",[req.body.assignedTo,req.body.status,req.body.priority,req.body.dueDate,req.body.description],function(err,result){
        if(err)
        {
            res.status(500).send("data not found")
        }
        else{
            res.status(200).send("data updated successfully!!")
        }
    })
})

myrouter.delete("/tasks/:id", function(req, res) {
    const { id } = req.params; // Get the ID from the URL params
    connection.query("DELETE FROM tasks WHERE id = ?", [id], function(err, data) {
        if (err) {
            console.error('Error deleting data:', err); // Log the error for debugging
            return res.status(500).send("data not deleted");
        }
        res.status(200).send("data deleted successfully");
    });
});

module.exports=myrouter