const mysql=require("mysql2");

var mysqlConnection=mysql.createConnection({
    host:'127.0.0.1',
    user:'root',
    password:'root123',
    database:'task_manager',
    port:3306
})

mysqlConnection.connect((err)=>{
    if(!err){
        console.log("connection done")
    }
    else{
        console.log(err);
    }
})

module.exports=mysqlConnection;