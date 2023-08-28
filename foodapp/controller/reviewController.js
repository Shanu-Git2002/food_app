const reviewModel = require('../models/reviewModel');
const planModel = require('../models/planModel');

module.exports.getAllReviews = async function getAllReviews(req, res) {
    try {

        const reviews = await reviewModel.find();
        if (reviews) {
            return res.json({
                message: "reviews retrived",
                data: reviews
            })
        }
        else {
            return res.json({
                message: "review not found"
            })
        }
    } catch (error) {
        res.json({
            message: err.message
        })
    }
};

module.exports.top3reviews = async function top3reviews(req, res) {
    try {

        const reviews = await reviewModel.find().sort({
            ratings: -1
        }).limit(3);
        if (reviews) {
            return res.json({
                message: "reviews retrived",
                data: reviews
            })
        }
        else {
            return res.json({
                message: "review not found"
            })
        }
    } catch (error) {
        res.json({
            message: err.message
        })
    }
};

module.exports.getPlanReviews = async function getPlanReviews(req, res) {
    try {
        const id = req.params.id;
        const review = await reviewModel.findById(id)
        if (review) {
            return res.json({
                message: "reviews retrived",
                data: review
            })
        }
        else {
            return res.json({
                message: "review not found"
            })
        }
    } catch (error) {
        res.json({
            message: err.message
        })
    }
};
module.exports.createReview = async function createReview(req, res) {
    try {
        let id = req.params.plan;
        let plan = await planModel.findById(id)
        let review = await reviewModel.create(req.body);
        plan.ratingsAverage = (plan.ratingsAverage + body.rating)/2;
        await plan.save();
        res.json({
            message: "review created",
            data: review
        });
    }
    catch (err) {
        res.json({
            message: err.message
        })
    }

};

module.exports.updateReview= async function updateReview(req,res){
   let id = req.params.id;
   let dataToBeUpdated = req.body;
   let keys = [];
   for (let key in dataToBeUpdated) {
       keys.push(key);
   }
   let review= await reviewModel.findById(id);
   for (let i = 0; i < keys.length; i++) {
       review[keys[i]] = dataToBeUpdated[keys[i]]
   }
   //doc
   await review.save();
   return res.json({
       message: "plan updated successfully",
       data: review
   });
};

module.exports.deleteReview = async function deleteReview(req, res) {
    try {
        let id = req.params.plan;
        let review = await reviewModel.findByIdAndDelete(id);
        res.json({
            message: "review created",
            data: review
        });
    }
    catch (err) {
        res.json({
            message: err.message
        })
    }

};




