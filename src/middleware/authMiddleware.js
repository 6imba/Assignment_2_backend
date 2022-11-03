import {verifyToken} from '../helpers/authHelper.js'

const auth = async (req,res,next) => {
    const accessToken = req.cookies.accessToken;
    if(!accessToken){
        res.status(400)
        return next(new Error('Token not found'))
    }
    const accessTokenVerification = await verifyToken(accessToken)
    if(accessTokenVerification.error){
        console.log(accessTokenVerification)
        res.status(401)
        return next(new Error('Token not authenticated.'))
    }
    else{
        console.log(accessTokenVerification)
        console.log("Token authenticated. So no need to login!")
        next()
    }   
}

// const logAuth = async (req,res,next) => {
//     if(!req.cookies.jwt_token){
//         console.log("Token not found. So need to login!")
//         next()
//     }
//     else{
//         const tokenVerification = await verifyToken(req.cookies.jwt_token)
//         if(tokenVerification.error){
//             console.log("Token not verified. So need to login!")
//             next()
//         }
//         else{
//             res.status(400)
//             return next(new Error('Token not authenticated. So need to login!'))
//         }
//     }   
// }

export {auth}
// export {auth,logAuth}