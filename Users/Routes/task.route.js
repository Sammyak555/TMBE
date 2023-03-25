const express = require('express');
const { UserModel } = require('../Models/user.model');
const taskRouter = express.Router();

taskRouter.use(express.json())

taskRouter.get('/:id/:projId',async(req,res)=>{
    const id=req.params.id
    const projId=req.params.projId
    try{
       const person =  await UserModel.findById({"_id":id})
       const newProject = person.projects.filter((el)=>{
        if(el._id==projId){
            return el
        } 
       })
        res.send({"msg":"Showing task Successfuly!","projectdata":newProject})

    }catch(err){
        res.send(err)
    }
})

taskRouter.post('/:id/:projId',async(req,res)=>{
    const id=req.params.id
    const projId=req.params.projId
    const payload = req.body
    payload.taskName = req.body.taskName
    payload.AssignedTo=req.body.AssignedTo
    payload.taskTodo=true
    payload.taskInprocess=false
    payload.taskDone = false
    payload.projId = projId
    try{
       const person =  await UserModel.findById({"_id":id})
       const newProject = person.projects.filter((el)=>{
        if(el._id==projId){
            return el
        } 
       })
       if(newProject[0]){
       newProject[0].tasks.push(payload)
       newProject[0].tasks.push()
       person.save()
        res.send({"msg":"Showing product Successfuly!","projectdata":newProject})
       }else{
        res.send("no project found ")
       }
    }catch(err){
        res.send(err)
    }
})

taskRouter.patch('/:id/:projId/:taskId',async(req,res)=>{
    const id=req.params.id
    const projId=req.params.projId
    const taskId = req.params.taskId
    const payload = req.body
    console.log(payload)
    try{
       const person =  await UserModel.findById({"_id":id})
       const newProject = person.projects.filter((el)=>{
        if(el._id==projId){
            return el
        } 
       })
       let newtask = newProject[0].tasks
       let item=newtask.filter((ele)=>ele._id==taskId)
       let indexF=newtask.indexOf(item[0])
      let updatedtask= newtask.splice(indexF,1)
       if(payload.taskTodo){
        updatedtask[0].taskTodo=true
        updatedtask[0].taskDone=false
        updatedtask[0].taskInprocess=false
       }else if(payload.taskDone){
        updatedtask[0].taskDone=true
        updatedtask[0].taskTodo=false
        updatedtask[0].taskInprocess=false
       }else if(payload.taskInprocess){
        updatedtask[0].taskInprocess=true
        updatedtask[0].taskDone=false
        updatedtask[0].taskTodo=false
       }
     newProject[0].tasks.push(updatedtask[0])
       
       person.save()
        res.send({"msg":"Showing product Successfuly!","projectdata":newProject})
      
    }catch(err){
        res.send(err)
    }
})



taskRouter.delete('/:id/:num',async(req,res)=>{
    const id=req.params.id
    const num=req.params.num
    try{
       const person =  await UserModel.findById({"_id":id})
       const newtask = person.projects.tasks.splice(num,1)
       person.save()
        res.send("task item deleted !")
    }catch(err){
        res.send(err)
    }
})


module.exports={
    taskRouter
}