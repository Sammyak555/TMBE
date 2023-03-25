const express = require('express');
const { UserModel } = require('../Models/user.model');
const projectRouter = express.Router();

projectRouter.use(express.json())

projectRouter.get('/:id',async(req,res)=>{
    const id=req.params.id
    try{
       const person =  await UserModel.findById({"_id":id})
    //    if(person.projects._id===projId){
        res.send({"msg":"Showing product Successfuly!","projectdata":person.projects})
    // }else{
    //     res.send("not found")
    // }
    }catch(err){
        res.send(err)
    }
})
projectRouter.get('/:id/:projId',async(req,res)=>{
    const id=req.params.id
    const projId=req.params.projId
    try{
       const person =  await UserModel.findById({"_id":id})
       const newProject = person.projects.filter((el)=>{
        if(el._id==projId){
            return el
        } 
       })
    //    if(person.projects._id===projId){
        res.send({"msg":"Showing product Successfuly!","projectdata":newProject})
    // }else{
    //     res.send("not found")
    // }
    }catch(err){
        res.send(err)
    }
})

projectRouter.post('/:id',async(req,res)=>{
    const id=req.params.id
    const payload = req.body
    try{
       const person =  await UserModel.findById({"_id":id})
       person.projects.push(payload)
       person.save()
        res.send({"msg":"added the product Successfuly!","projectdata":person.projects})
    }catch(err){
        res.send(err)
    }
})

projectRouter.delete('/:id/:projId',async(req,res)=>{
    const id=req.params.id
    const projId=req.params.projId
    try{
    const person =  await UserModel.findById({"_id":id})
       let newProject = person.projects.filter((el)=>{
        if(el._id!=projId){
            return el
        } 
       })
       person.projects=newProject
       person.save()
    //    if(person.projects._id===projId){
        res.send({"msg":"Showing product Successfuly!","projectdata":person.projects})
    }catch(err){
        res.send(err)
    }
})


module.exports={
    projectRouter
}