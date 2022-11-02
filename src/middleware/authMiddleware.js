import {verifyToken} from '../helpers/authHelper.js'

const auth = async (req,res,next) => {
    if(!req.cookies.jwt_token){
        console.log({error:true,errorMsg:"Token not found!"})
        res.status(400)
        return next(new Error('Token not found'))
        // return res.status(400).send({error:"Token not found!"}).status(400)
    }
    const tokenVerification = await verifyToken(req.cookies.jwt_token)
    if(tokenVerification.error){
        console.log(tokenVerification)
        console.log({error:true,errorMsg:"Token not authenticated. So need to login!"})
        res.status(400)
        return next(new Error('Token not authenticated. So need to login!'))
    }
    else{
        console.log(tokenVerification)
        console.log("Token authenticated. So no need to login!")
        next()
    }   
}

export {auth}