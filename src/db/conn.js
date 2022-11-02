import mongoose from "mongoose";
import dotenv from 'dotenv'

dotenv.config()
const DATABASE_URL = process.env.DATABASE_DOMAIN + process.env.DATABASE_NAME

const connectDB = async () => {
    try{
        await mongoose.connect(DATABASE_URL) // 1.connect or create new database.
        console.log(`Express app connected to mongoDB(${process.env.DATABASE_NAME}) at ${DATABASE_URL}`)
    }catch(error){
        console.log("Error while connecting express to mongoDB ==> ",error)
    }
}

connectDB()