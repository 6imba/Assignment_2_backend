import express from "express";
import dotenv from 'dotenv'
import "./db/conn.js"
import userRouter  from './routes/user.js'
import cors from 'cors';


dotenv.config()
const app = express()
const EXPRESS_PORT = process.env.EXPRESS_PORT || '8000'

// app.use(cors());
var corsOptions = {
    origin: '*',
    credentials: true
};
app.use(cors(corsOptions));
app.use(express.json())
app.use('/api/user',userRouter)

app.get('/', (req,res) => {
    console.log("Api landing page ...")
    res.send("Api landing page ...")
})

app.listen(EXPRESS_PORT, (req,res) => {
    console.log(`Express start at http://localhost:${EXPRESS_PORT}`)
})