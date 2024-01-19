import schema from './user.model.js';
import schema1 from './auth.model.js';
import bcrypt from 'bcrypt';
import pkg from 'jsonwebtoken';

export function addData(req,res)
{
    // const {...movies}=req.body;
    // console.log({...movies});
    // res.status(201).send(schema.create({...movies}));

   try {
    const {...movies}=req.body;
    res.status(201).send(schema.create({...movies}),{msg:"movie added"});
   } catch (error) {
    console.log(error);
    res.status(404).send({msg:error});
   }
}
export async function getData(req,res)
{
    const data = await schema.find();
    res.status(200).send(data);
}
export async function detail(req,res)
{
    const {id}=req.params;
    const data=await schema.findOne({_id:id});
    res.status(200).send(data);
}
export async function deleteTask(req,res)
{
    const {id}=req.params;
    schema.deleteOne({_id:id}).then(()=>{
        console.log("Deleted");
    }).catch((error)=>{
        console.log(error);
    })
    res.end();
}
export async function updateTask(req,res)
{
    try {
    const {id}=req.params;
    console.log(id);
    const {...movies}=req.body;
    await schema.updateOne({_id: id}, {$set: {...movies} });
    return res.status(201).send("updated");
    } catch (error) {
        console.log(error);
    }
}




const {sign}=pkg;
export function addUser(req,res)
{
    try {
        const {User_ID,Pwd}=req.body;
        if(!(User_ID&&Pwd))
        return res.status(404).send("Fileds are empty")
        bcrypt.hash(Pwd,10)
        .then((hashedPwd)=>{
           schema1.create({User_ID,Pwd:hashedPwd});
        })
        .then(()=>{
            res.status(201).send("Successfully registered")
        })
        .catch((error)=>{
            res.status(500).send(error)
        })
        
       } catch (error) {
        console.log(error);
       }
}

export async function login(req,res)
{
    try {
        console.log(req.body);
        const {User_ID,Pwd}=req.body;
        const user=await schema1.findOne({User_ID});
        if(user===null)return res.status(404).send("user not exist");
        const success=await bcrypt.compare(Pwd,user.Pwd);
        if(success!==true)return res.status(404).send("user or password not exist");
        const token=await sign({User_ID},process.env.JWT_KEY,{expiresIn:"24h"});
        console.log(token);
        return res.status(200).send({msg:"successfully loged in",token})
    } catch (error) {
        console.log(error);
    }
}

export async function home(req,res)
{
    try {
        // console.log(req.authorization);
        const name=req.user.User_ID;
        return res.status(200).send({msg:name})
    } catch (error) {
        return res.status(200).send(error)
    }
}