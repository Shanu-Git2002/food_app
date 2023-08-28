const mongoose = require('mongoose');
const emailValidator = require('email-validator')
// const bcrypt = require('bcrypt');
// // nmongodb connection

const crypto = require('crypto');

const db_link='mongodb://127.0.0.1:27017/admin?readPreference=primary&appname=MongoDB%20Compass&directConnection=true&ssl=false';
mongoose.connect(db_link)
.then(function(db){
  // console.log(db)
  console.log("db_connected")
})
.catch(function(err){
  console.log(err)
});

const userSchema=mongoose.Schema({
    name:{
      type:String,
      require:true
    },
    email:{
      type:String,
      require:true,
      unique:true,
      validate:function(){
        return emailValidator.validate(this.email);
      }
    },
    password:{
      type:String,
      require:true,
      minLength:8
    },
    confirmPassword:{
      type:String,
      require:true,
      minLength:8,
      validate:function(){
        return this.confirmPassword==this.password
      }
    },
    role:{
      type:String,
      enum:['admin','user','restorantowner','deliveryboy'],
      default:'user'
    },
    profileImage:{
      type:String,
      default:'img/user/default.jpg'
    },

    resetToken:String,

});



// pre post hooks

// userSchema.pre('save',function(){
//       console.log("before saving in db",this)
// })

// userSchema.post('save',function(doc){
//   console.log("after saving in db",doc)
// })

// userSchema.pre('save',function(){
//   this.confirmPassword = undefined;
// })
// password hashing
// userSchema.pre('save',async function(){
//     let salt = await bcrypt.genSalt();
//     let hashedString= await bcrypt.hash(this.password,salt);
//     this.password=hashedString;
// })
//model

userSchema.methods.createResetToken=function(){
  //creating unique token using npm  i crypto
  const resetToken = crypto.randomBytes(32).toString("hex");
  this.resetToken = resetToken;
  return resetToken; 
}

userSchema.methods.resetPasswordHandler=function(password, confirmPassword){
  this.password=password;
  this.confirmPassword= confirmPassword;
  this.resetToken=undefined;
  
}

const userModel=mongoose.model('userModel',userSchema);
module.exports=userModel

//  (async function createUser(){