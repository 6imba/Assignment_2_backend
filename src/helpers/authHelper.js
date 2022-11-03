import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'

const hashPassword = async (password) => await bcrypt.hash(password,10)

const comparePassword = async (reqPass,hashPass) => await bcrypt.compare(reqPass,hashPass)

const generateToken = async (id) => {
    try{
        const payload = {userId:id}
        const accessToken = await jwt.sign(payload, process.env.ACCESS_TOKEN_SECRET_KEY, {expiresIn: '15s'})
        const refreshToken = await jwt.sign(payload, process.env.REFRESH_TOKEN_SECRET_KEY, {expiresIn: '1h'})
        return {error:false,accessToken,refreshToken}
    }catch(error){
        return {err:true,errorMsg:error}
    }
}

const verifyToken = async (token) => {
        try{
            const tokenDetail = await jwt.verify(token,process.env.ACCESS_TOKEN_SECRET_KEY) //check_2: verify the refresh token send with http request is valid token.
            return { error:false, tokenDetail, message:"Valid access token!..." }
        }
        catch(err){
            return {error:true, message:err.message}
        }
    }


export {hashPassword,comparePassword,generateToken,verifyToken}