import {verifyToken} from '../helpers/authHelper.js'
import {generateToken} from '../helpers/authHelper.js'

const verify = async(token,secret) => {
    if(!token){
        return {error:true, message:'Token not found'}
    }
    const tokenVerification = await verifyToken(token,secret)
    if(tokenVerification.error){
        console.log(tokenVerification)
        return tokenVerification
    }
    else{
        console.log(tokenVerification)
        return tokenVerification
    }  
}

const auth = async (req,res,next) => {
    const accessToken = req.cookies.accessToken;
    const tokenVerification = await verify(accessToken, process.env.ACCESS_TOKEN_SECRET_KEY)
    if(tokenVerification.error){
        console.log("access token expire")
        const refreshToken = req.cookies.refreshToken;
        const tokenVerification = await verify(refreshToken, process.env.REFRESH_TOKEN_SECRET_KEY)
        console.log(tokenVerification)
        if(!tokenVerification.error){
            console.log("generate new access token")
            // generate new access token and return
            const {accessToken} = await generateToken(tokenVerification.tokenDetail.userId)
            res.cookie('accessToken', accessToken)
            res.status(200)
            next()
        }
        else{
            res.status(401)
            res.clearCookie('accessToken')
            res.clearCookie('refreshToken')        
            return next(new Error('Token not authenticated.'))
        }
    }
    else{
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