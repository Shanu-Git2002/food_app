const express = require('express');
const userRouter = express.Router();
const multer = require('multer');
// const protectRoute= require('../Router/authHelpre')
const {getUser,getAllUser,updateUser,deleteUser,updateProfileImage} = require('../controller/userController');
const {signup,login,isAuthorised,protectRoute,forgetpassword,resetpassword}=require('../controller/authController');
//usre ke options 
userRouter.route('/:id')
.patch(updateUser)
.delete(deleteUser)

userRouter
.route('/signup')
.post(signup) 

userRouter
.route('/login')
.post(login)

userRouter
.route('/forgetpassword')
.post(forgetpassword)

userRouter
.route('/resetspassword/:token')
.post(resetpassword)

// multer for fileupload
// upload -> storage , filter

const multerStorage = multer.diskStorage({
   destination:function(req,file,cb){
     cb(null,'public/images');
    },
    filename:function(req,file,cb){
        cb(null,`user-${Date.now()}-${file.originalname}`);
    }

});

const filter = function (req,file,cb){
    if(file.mimetype.startsWith("image")){
        cb(null,true)
    } else{
        cb(new Error("Not an Image! Please an  image"),false)
    }
}

const upload = multer({
    storage:multerStorage,
    fileFilter: filter
});
userRouter.post("/ProfileImage",upload.single('photo') , updateProfileImage);

//get request

userRouter.get('/ProfileImage',(req,res) =>{
     res.sendFile('/Users/user/Desktop/backend series/foodapp/multer.html');
});


 
//profile page
userRouter.use(protectRoute);
userRouter
.route('/userProfile')
.get(getUser)

//admin specific work as middleware  
userRouter.use(isAuthorised(['admin']));
userRouter
.route('/')
.get(getAllUser)

module.exports = userRouter;