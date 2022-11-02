import userModel from '../model/user.js'
import {hashPassword,comparePassword} from '../utils/user.js'

const getAllUsers = async (req,res)=> {
    try{
        console.log(req.headers)
        console.log(req.headers.host)
        console.log(req.headers['host'])
        const response = await userModel.find({},{password:0}) //Retrieve the all documents instance from database-collection but no password.
        console.log(response)
        res.send(response)
    }
    catch(error){
        console.log(error)
    }
}

const getAUser = async (req,res)=> {
    try{
        const response = await userModel.findById({_id: req.params.id},{password:0}) //Retrieve the a document instance from database-collection.
        console.log(response)
        res.send(response)
    }
    catch(error){
        console.log(error)
    }
}

const createNewUser = async (req,res)=> {
    try{
        const hashPass = await hashPassword(req.body.password)
        const newUserDocument = new userModel({...req.body, password:hashPass}) //instance new document with mongoose_model and save it in database.
        const response = await newUserDocument.save() //Save the instanced document into database-collection.
        console.log(response)
        res.send(response)
    }
    catch(error){
        res.send(error)
    }
}

const updateUser = async (req,res)=> {
    try{
        const _id = req.params.id
        console.log('--------------------------------------------------------------------------------------------------')
        const response = await userModel.findByIdAndUpdate(_id, req.body)
        console.log(response)
        res.send(response)
    }
    catch(error){
        console.log(error)
        res.send(error)
    }
}

const deleteUser = async (req,res)=> {
    try{
        const _id = req.params.id
        const response = await userModel.deleteOne({_id}) //Delete the instanced document into database-collection.
        console.log(response)
        res.send(response)
    }
    catch(error){
        console.log(error)
        res.send(error)
    }
}

const logIn = async (req,res) => {
    try{
        const user = await userModel.findOne({email: req.body.email})
        if(user==null){
            throw "Invalid Creadentials"
        }
        const passMatch = await comparePassword(req.body.password,user.password)
        if(passMatch){
            console.log("Logged In!")
            res.json({logged:true})
        }else{
            throw "Invalid Creadentials"
        }
    }
    catch(error){
        console.log(error)
        res.json({logged:false})
    }
}

export {getAllUsers,getAUser,createNewUser,updateUser,deleteUser,logIn}