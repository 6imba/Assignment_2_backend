import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'

const hashPassword = async (password) => await bcrypt.hash(password,10)

const comparePassword = async (reqPass,hashPass) => await bcrypt.compare(reqPass,hashPass)

const generateAccessToken = async (id) => {
    try{
        const payload = {userId:id}
        const token = await jwt.sign(payload, process.env.ACCESS_TOKEN_SECRET_KEY, {expiresIn: 1000*60*5})
        // this.tokens = this.tokens.concat({token:token})
        // await this.save()
        return {error:false,token}
    }catch(error){
        return {error:true,errorMsg:error}
    }
}

const verifyToken = async (token) => {
        try{
            const tokenDetail = await jwt.verify(token,process.env.ACCESS_TOKEN_SECRET_KEY) //check_2: verify the refresh token send with http request is valid token.
            return { error:false, tokenDetail, message:"Valid access token!..." }
        }    
        catch(err){
            return {error:true, message:"Invalid token!",error_object:err}
        }
    }


export {hashPassword,comparePassword,generateAccessToken,verifyToken}