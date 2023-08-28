// monggoose ke through connect mongo db

const mongoose = require('mongoose');
const db_link='mongodb://127.0.0.1:27017/admin?readPreference=primary&appname=MongoDB%20Compass&directConnection=true&ssl=false';
mongoose.connect(db_link)
.then(function(db){
  // console.log(db)
  console.log("plan db_connected")
})
.catch(function(err){
  console.log(err)
});

const planSchema = mongoose.Schema({
    name:{
        type:String,
        require:true, 
        unique:true,
        maxlength:[20,'plan name should not exceed more than 20 characters']
      },
      duration:{
        type:Number,
        required:true
      },
      price:{
        type:Number,
        required:[true,'price not entered']
      },
      ratingsAverage:{
        type:Number
      },
      discount:{
        type:Number,
        validate:[function(){
          return this.discount<100},' discount should not exceed price']
        
      }
});
//model

const planModel=mongoose.model('planModel',planSchema);

(async function createPlan(){
  let planObj={
    name:'SuperFood1',
    duration:30,
    price:1000,
    ratingsAverage:5,
    discount:20
  }
  // let data = await planModel.create(planObj);
  // console.log(data)
  const doc = new planModel(planObj);
  await doc.save();

})();


module.exports=planModel;