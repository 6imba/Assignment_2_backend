import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'

const hashPassword = async (password) => await bcrypt.hash(password,10)

const comparePassword = async (reqPass,hashPass) => await bcrypt.compare(reqPass,hashPass)

const generateAccessToken = async (id) => {
    try{
        const payload = {userId:id}
        const token = await jwt.sign(payload, process.env.ACCESS_TOKEN_SECRET_KEY, {expiresIn: 15000})
        // this.tokens = this.tokens.concat({token:token})
        // await this.save()
        return {error:false,token}
    }catch(error){
        return {error:true,errorMsg:error}
    }
}

export {hashPassword,comparePassword,generateAccessToken}