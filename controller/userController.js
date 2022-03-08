const UserService = require("../services/userService")
const User = require('../dto/userdto');
const bcrypt = require("../utils/encrypt")
const userController = {
    register(req,res){
        let hashPassword = bcrypt.doEncrypt(req.body.password)
        const user = new User(req.body.name,hashPassword,req.body.phone,req.body.email)
        const promise = UserService.addUser(user)
        promise
        .then(data =>{
            res.status(201).json({
                message : "Registration Successfully",
                data:data
            })
        })
        .catch((err)=>{
            res.status(500).json(err.message)
        })
    },
    //User Update By Verify Token
    updateUser(req,res){
        let id  = req.params.id
        let userData = req.body
        const promise = UserService.updateUser(id,userData)
        promise.then((data)=>{
            console.log(data)
            res.status(201).json({
                message : "Update Successfully"
            })
        }).catch((err)=>{
            console.log(err.message)
        })
    },
    // Delete User
    deleteUser(req,res){
        let id = req.params.id
        const promise = UserService.delete(id)
        promise
        .then((data)=>{
            console.log(data)
            res.status(200).json({
                message : "Delete Successfully"
            })
        })
        .catch((err)=>{
            console.log(err.message)
        })
    },
    
    // fetch All Users
    fetchAllUser(req,res){
        const query = req.query.new
        console.log(query)
        const promise = UserService.getAllUsers(query);
        promise.then((data)=>{
            res.send(data)
            console.log(data)
        }).catch((err)=>{
            console.log(err.message)
        })
    }
}

module.exports = userController