const express = require('express');
const authRouter = express.Router();
const userModel = require('../models/userModel');
const jwt = require('jsonwebtoken');
const JWT_KEY = require('./secret');

authRouter
  .route('/signup')
  .get(middleware, getSignUp)
  .post(postSignUp)

authRouter
  .route('/login')
  .post(loginUser)

// GET request
// app.get('/user',(req,res)=>{
//   console.log(req.query);
//   res.send(users);
// });

// post request
// app.post('/user',(req,res) =>{
//     console.log(req.body);
//     users=req.body;
//     res.json({
//         msg:"hey",
//         user:req.body
//     });
// });

// // update request

// app.patch('/user',(req,res)=>{
//        console.log("req.body->",req.body);
//        let dataToBeUpdated=req.body;
//        for(key in dataToBeUpdated){
//         users[key] = dataToBeUpdated[key];
//        }
//        res.json({
//         msg:"data updated successfully"
//        });
// });

// // to delete

// app.delete('/user',(req,res)=>{
//   users={};
//   res.json({
//     msg:"data delted successfully"
//   });
// });

//  parameter
// app.get('/user/:username',(req,res)=>{
//   console.log(req.params.username)
//   res.send("user id is recieved");
// })
function middleware(req, res, next) {
  console.log("i am  middle ware");
  next();
}


function getSignUp(req, res, next) {
  console.log("get sihnup called")
  res.sendFile('public/index.html', { root: __dirname });
  next();
}

async function postSignUp(req, res) {
  let dataObj = req.body;
  let user = await userModel.create(dataObj)
  res.json({
    msg: "user signed up",
    data: user
  });
}
async function loginUser(req, res) {
  try {
    let data = req.body;
    if(data.email){
    let user =await userModel.findOne({ email: data.email });
    if (user) {
      if (user.password == data.password) {
        let uid = user['_id'];
        let token=jwt.sign({payload:uid},JWT_KEY); //is line se signnature bnega
        res.cookie('login',token,{httpOnly:true});
        return res.json({
          message: "user logged in successfully",
          userDetails: data

        })
      }
      else {
        return res.json({
          message: "wrong credential"
        })
      }
    }
    else {
      return res.json({
        message: "user not fond"
      })
    }
  }else{
    return res.json({
      message:"user not found"
    })
  }
  }catch(err){
    return res.json({
      message:err.message
    })
  }
}
module.exports = authRouter;