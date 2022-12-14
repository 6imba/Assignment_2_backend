import dotenv from 'dotenv'
dotenv.config();

import express from "express";
import cors from 'cors';
import cookieParser from 'cookie-parser'
import connectDB from "./db/conn.js"
import routes  from './routes/router.js'
import { notFound, errorHandler } from './helpers/errorHandler.js'

try {
    await connectDB(); 
} catch (error) {
    console.log('Database connection error:', error)
    process.exit();
}

const app = express()
const EXPRESS_PORT = process.env.PORT || '8000'
const corsOptions = {
    origin: true,
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
    preflightContinue: false,
    optionsSuccessStatus: 204,
    credentials: true
  }


app.use(cors(corsOptions));
app.use(express.json())
app.use(cookieParser()) 
app.use('/api', routes)

app.get('/', (req,res) => {
    console.log("Api landing page ...")
    return res.json({status: "Running" ,message: "Api landing page ..."})
})

app.use(notFound);
app.use(errorHandler);

app.listen(EXPRESS_PORT, (req,res) => {
    console.log("Express server started")
    console.log("-------------------------------------------------------------------------------------------------------------------")
})

