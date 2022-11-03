import dotenv from 'dotenv'
dotenv.config();

import express from "express";
import cors from 'cors';
import cookieParser from 'cookie-parser'
import connectDB from "./db/conn.js"
import routes  from './routes/router.js'
// import { errorHandler } from './helpers/errorHandler.js'
import { notFound, errorHandler } from './helpers/errorHandler.js'


try {
    await connectDB(); 
} catch (error) {
    console.log('Database connection error:', error)
    process.exit();
}

const app = express()
const EXPRESS_PORT = process.env.PORT || '8000'
const corsOptions = { origin: '*', credentials: true };

app.use(cors(corsOptions));
app.use(express.json())
app.use(cookieParser()) 
app.use('/api', routes)
// app.use('/api/user', userAuth, userRouter)
app.get('/', (req,res) => {
    console.log("Api landing page ...")
    return res.json({status: "Running" ,message: "Api landing page ..."})
})

app.use(notFound);
app.use(errorHandler);

app.listen(EXPRESS_PORT, (req,res) => {
    console.log(`Express start at:${EXPRESS_PORT}`)
})

