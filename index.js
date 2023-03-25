const express = require('express')
const { connection } = require('./Admin/Config/db')
const { adminRouter } = require('./Admin/Routes/admin.routes')
const { addressRouter } = require('./Users/Routes/address.route')
const { projectRouter } = require('./Users/Routes/project.route')
const { userRouter } = require('./Users/Routes/users.routes')
const { taskRouter } = require('./Users/Routes/task.route')
require('dotenv').config()
const cors = require('cors')
const app=express()
app.use(cors({origin:"*"}))

app.use(express.json())
app.use('/users',userRouter)
app.use("/admins",adminRouter)
app.use("/project",projectRouter)
app.use("/task",taskRouter)
app.use("/address",addressRouter)

app.listen(5550,async(req,res)=>{
    try{
        await connection
        console.log("Connected to db")
    }catch(err){
        console.log(err)
    }
    console.log(`Running on port 5550`)
})