import mongoose from "mongoose";

import dotenv from 'dotenv'
dotenv.config();
console.log(`process.env.DATABASE_URL: ${process.env.DATABASE_URL}`)

const DATABASE_URL = process.env.DATABASE_URL

const connectDB = async () => {
        await mongoose.connect(DATABASE_URL) // 1.connect or create new database.
        console.log(`Express app connected to mongoDB at ${DATABASE_URL}`)
}

export default connectDB;