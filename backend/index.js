
const express = require('express');
const jwt = require('jsonwebtoken');
const cors = require('cors');

const app = express();
app.use(express.json());
app.use(cors());

const SECRET = "secret";

let workouts = [];

function auth(req,res,next){
 const token = req.headers.authorization;
 if(!token) return res.sendStatus(401);
 try{
  req.user = jwt.verify(token, SECRET);
  next();
 }catch{
  res.sendStatus(403);
 }
}

app.post('/api/login',(req,res)=>{
 const token = jwt.sign({user:"test"}, SECRET);
 res.json({token});
});

app.get('/api/workouts', auth, (req,res)=>{
 res.json(workouts);
});

app.post('/api/workouts', auth, (req,res)=>{
 workouts.push(req.body);
 res.json(req.body);
});

app.delete('/api/workouts/:id', auth, (req,res)=>{
 workouts.splice(req.params.id,1);
 res.json({msg:"deleted"});
});

app.put('/api/workouts/:id', auth, (req,res)=>{
 workouts[req.params.id] = req.body;
 res.json(req.body);
});

app.listen(3000,()=>console.log("running"));
