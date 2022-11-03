import userModel from '../model/user.js'
import {hashPassword,comparePassword,generateToken} from '../helpers/authHelper.js'

const getAllUsers = async (req,res)=> {
    try{
        // console.log(req.headers)
        // console.log(req.headers.host)
        // console.log(req.headers['host'])
        const response = await userModel.find({},{password:0}) //Retrieve the all documents instance from database-collection but no password.
        console.log("Response all users!")
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
        const newUser = await newUserDocument.save() //Save the instanced document into database-collection.
        console.log(`New user ${newUser.name} created!`)
        res.send(newUser)
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

const logIn = async (req,res,next) => {
    try{
        const user = await userModel.findOne({email: req.body.email})
        if(user==null){
            throw "Unauthorized! (Invalid Credentials)"
        }
        const passMatch = await comparePassword(req.body.password,user.password)
        if(passMatch){
            const userId = user._id.toString()
            const {error,accessToken,refreshToken} = await generateToken(userId)
            console.log('Generating access token: ',{error,accessToken,refreshToken})
            if(error){
                throw error
            }else{
                res.cookie('accessToken', accessToken)
                res.cookie('refreshToken', refreshToken)
                // res.cookie('accessToken', accessToken, { maxAge: 300000, secure: true })
                // res.cookie('refreshToken', refreshToken, { maxAge: 2592000000, secure: true })
                res.status(200)
                res.json({logged:true})
            }
        }else{
            throw "Unauthorized! (Invalid Credentials)"
        }
    }
    catch(error){
        console.log('Error while logging in: ',error) //login fail!     
        res.status(401)
        return next(new Error(error))
    }
}

const logOut = async (req,res,next) => {
    console.log("LOGOUT **************************************")
    res.clearCookie('accessToken')
    res.clearCookie('refreshToken')
    res.end()
    console.log("Log out!")
}

export {getAllUsers,getAUser,createNewUser,updateUser,deleteUser,logIn,logOut}