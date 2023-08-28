const userModel = require('../models/userModel');


module.exports.getUser = async function getUser(req, res) {
  // console.log(req.qu??ery);
  let id = req.params.id;
  // let allUsers = await userModel.findOne({email:"shanukum200@gmail.com"});
  let user = await userModel.findById(id);
  if (user) {
    return res.json(users);
  }
  else {
    return res.json({
      msg: "user not found"
    });
  }
};

// module.exports.postUser = function postUser(req, res) {
//   console.log(req.body);
//   users = req.body;
//   res.json({
//     msg: "hey",
//     user: req.body
//   });
// }

module.exports.updateUser = async function updateUser(req, res) {
  // console.log("req.body->", req.body);
  //update data in user obj

 try{ 
  let id = req.params.id;
  let user = await userModel.findById(id);
  let dataToBeUpdated = req.body;
  if (user) {
    const keys = [];
    for (let key in dataToBeUpdated) {
      keys.push(key);
    }
    for (let i = 0; i < keys.length; i++) {
      user[keys[i]] = dataToBeUpdated[keys[i]];
    }
    const updatedData = await user.save();
    res.json({
      msg: "data updated successfully",
      data: user
    });
  }
  else {
      res.json({
        message:"user not found"
      })
  }
}
catch(err){
  res.json({
    msg:err.message,
  });
}

};

module.exports.deleteUser = async function deleteUser(req, res) {
 try{  
  let id = req.params.id;
  let user = await userModel.findByIdAndDelete(id);
  if(!user){
    res.json({
      msg:"user not found"
    })
  }
  res.json({
    msg: "data has been deleted successfully",
    data: user
  });
}catch(err){
  res.json({
    message:err.message,
  })
}
};

module.exports.getAllUser = async function getAllUser(req, res) {
  let users = await userModel.find();
  if(users){
    res.json({
      message:"user retrieve successfully",
      data:users
    });
  }
  res.send("user id is recieved");
};


module.exports.updateProfileImage = function updateProfileImage(req,res){
  res.json({
    message:"file uploaded successfully"
  });
}
// function setCookies(req, res) {
//   // res.setHeader('set-Cookie','isLoggedIn=true');
//   res.cookie('isLoggedin', true, { maxAge: 1000 * 60 * 60 * 24, secure: true, httpOnly: true });
//   res.cookie('isPrimeNumber', true);
//   res.send('cookies has been set');
// }
// function getCookies(req, res) {
//   let cookies = req.cookies;
//   console.log(cookies)
//   res.send('cookie is recieved');
// }
