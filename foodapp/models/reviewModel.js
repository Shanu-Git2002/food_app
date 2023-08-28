const mongoose = require('mongoose');
const db_link='mongodb://127.0.0.1:27017/admin?readPreference=primary&appname=MongoDB%20Compass&directConnection=true&ssl=false';
mongoose.connect(db_link)
.then(function(db){
  // console.log(db)
  console.log("review db_connected")
})
.catch(function(err){
  console.log(err)
});

const reviewSchema = new mongoose.Schema({
    review:{
        type:String,
        require:[true,'review is require'],   
    },
    rating:{
        type:Number,
        min:1,
        max:10,
        require:[true,'rating is require']
    },
    createdAt:{
        type:Date,
        default:Date.now()
    },
    user:{
        type:mongoose.Schema.ObjectId,
        ref:'refModel',
        required:[true,'review must belong to a user']
    },
    plan:{
        type:mongoose.Schema.ObjectId,
        ref:'planModel',
        required:[true,'review must belong to a plan']
    },

});

// find findByid, findOne
reviewSchema.pre('/^find', function (next){
    this.populate({
        path:"user",
        select:"nameProfileImage"
    }).populate("plan");
    next();
})



const reviewModel = mongoose.model('reviewModel',reviewSchema);

module.exports = reviewModel;