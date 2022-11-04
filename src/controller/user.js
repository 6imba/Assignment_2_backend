import userModel from '../model/user.js'
import {hashPassword,comparePassword,generateToken} from '../helpers/authHelper.js'

const getAllUsers = async (req,res,next)=> {
    try{
        const response = await userModel.find({},{password:0}) //Retrieve the all documents instance from database-collection but no password.
        if (response == null){
            throw "No any user found!"
        }
        res.status(200).send(response)
        console.log("Response all users!")
        console.log("---------------------------------------------")
    }
    catch(error){
        res.status(400)
        // next(error)
        return next(new Error(error))
    }
}

const getAUser = async (req,res,next)=> {
    try{
        const response = await userModel.findById({_id: req.params.id},{password:0}) //Retrieve the a document instance from database-collection.
        if(response == null){
            throw "No user found!"
        }
        res.send(response)
        console.log("Get a user!")
        console.log("---------------------------------------------")
    }
    catch(error){
        res.status(400)
        // next(error)
        return next(new Error(error))
    }
}

const createNewUser = async (req,res,next)=> {
    try{
        const hashPass = await hashPassword(req.body.password)
        const newUserDocument = new userModel({...req.body, password:hashPass}) //instance new document with mongoose_model and save it in database.
        const newUser = await newUserDocument.save() //Save the instanced document into database-collection.
        res.send({success:true,message:"new user created",userId:newUser._id})
        console.log(`New user ${newUser.name} created!`)
        console.log("---------------------------------------------")
    }
    catch(error){
        res.status(400)
        // next("Error while creating new user.")
        return next(new Error(`Error while creating new user ==> ${error}`))
    }
}

const deleteUser = async (req,res,next)=> {
    try{
        const _id = req.params.id
        const response = await userModel.deleteOne({_id}) //Delete the instanced document into database-collection.
        if(response.deletedCount == 0){
            throw "No user found!"
        }
        res.send({success:true,message:"user deleted",...response})
        console.log("A user deleted!")
        console.log("---------------------------------------------")
    }
    catch(error){
        res.status(400)
        // next(error)
        return next(new Error(error))
    }
}

const updateUser = async (req,res,next)=> {
    try{
        const _id = req.params.id
        const response = await userModel.findByIdAndUpdate(_id, req.body)
        if(response == null){
            throw "Error while updating existing user.(No user found!)"
        }
        res.send({success:true,message:"user updated",userId:response._id})
        console.log("A user updated!")
        console.log("---------------------------------------------")
    }
    catch(error){
        res.status(400)
        // next(error)
        return next(new Error(error))
    }
}

const logIn = async (req,res,next) => {
    try{
        const user = await userModel.findOne({email: req.body.email})
        if(user==null){
            throw "Unauthenticated! (Invalid Credentials)"
        }
        const passMatch = await comparePassword(req.body.password,user.password)
        if(passMatch){
            const userId = user._id.toString()
            const {error,accessToken,refreshToken} = await generateToken(userId)
            console.log('Generating access token: ',{error,accessToken,refreshToken})
            if(error){
                throw error
            }else{
                res.cookie('accessToken', accessToken, { secure: true, sameSite: 'none' })
                res.cookie('refreshToken', refreshToken, { httpOnly:true , secure: true, sameSite: 'none'})
                res.status(200)
                res.json({logged:true,message:"store access and refresh(http only) token in cookie."})
                console.log("User Logged in!")
                console.log("----------------------------------------------------------------------------------")
            }
        }else{
            throw new Error("Unauthorized! (Invalid Credentials)")
        }
    }
    catch(error){
        console.log('Error while logging in: ',error.message) //login fail!     
        res.status(401)
        return next(error)
    }
}

const logOut = async (req,res,next) => {
    try{
        res.clearCookie('accessToken')
        res.clearCookie('refreshToken')
        res.send({logged:false, message:"user logged out!"})
        console.log("User logged out!")
        console.log("---------------------------------------------")    
    }
    catch(error){
        res.status(400)
        // next(error)
        return next(new Error(error))
    }
}

export {getAllUsers,getAUser,createNewUser,updateUser,deleteUser,logIn,logOut}