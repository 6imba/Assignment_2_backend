import userModel from '../model/user.js'
import {hashPassword,comparePassword,generateAccessToken} from '../helpers/authHelper.js'

const getAllUsers = async (req,res)=> {
    try{
        // console.log(req.headers)
        // console.log(req.headers.host)
        // console.log(req.headers['host'])
        const response = await userModel.find({},{password:0}) //Retrieve the all documents instance from database-collection but no password.
        console.log(response)
        res.status(200).send(response)
    }
    catch(error){
        console.log(error)
        res.status(400).send(response)
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
            const userId = user._id.toString()
            const restToken = await generateAccessToken(userId)
            // console.log('Generating access token: ',restToken)
            if(restToken.error){
                throw restToken.errorMsg
            }else{
                console.log('Access token: ',restToken.token) //login success!
                // res.cookie('jwt_token', restToken.token)
                res.cookie('jwt_token', restToken.token, { maxAge: 1000*60*5, httpOnly: true, secure: true })
                res.status(200)
                res.json({logged:true})
            }
        }else{
            throw "Invalid Credentials!"
        }
    }
    catch(error){
        console.log('Error while generating access token: ',error) //login fail!     
        res.json({logged:false, errorMsg:error})
    }
}

export {getAllUsers,getAUser,createNewUser,updateUser,deleteUser,logIn}