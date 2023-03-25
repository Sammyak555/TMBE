const mongoose = require("mongoose")

const userSchema=mongoose.Schema({
    name:String,
    email:String,
    password:String,
    projects:[
        {
            projName:String,
            projDescription:String,
            tasks:[
                {
                    AssignedTo:String,
                    taskName:String,
                    taskTodo:Boolean,
                    taskInprocess:Boolean,
                    taskDone:Boolean,
                    projId:String
                }
            ],
            bugs:[
                {
                    AssignedTo:String,
                    bugName:String,
                    bugTodo:Boolean,
                    bugInprocess:Boolean,
                    bugDone:Boolean,
                    projId:String
                }
            ]
        }
    ]
})

const UserModel = mongoose.model('user',userSchema)

module.exports={
    UserModel
}