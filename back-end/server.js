import express from 'express';
import env from 'dotenv';
import router from './router.js';
import cors from 'cors';
import connection from './connection.js';
import connection2 from './connection.js';

env.config();
const app=express();
app.use(cors());
app.use(express.static('front-end'))
app.use(express.json({limit:"20mb"}))
app.use("/api",router)
connection2()
connection().then(()=>{
    app.listen(process.env.PORT,()=>{
        console.log("SERVER STARTED");
    })
}).catch(error=>{
    console.log(error);
})