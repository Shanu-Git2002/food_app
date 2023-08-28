const express = require('express');
const planRouter = express.Router();
const {protectRoute, isAuthorised} = require('../controller/authController');

const {getAllPlans,getPlan,createPlan,deletePlan,updatePlan,top3plans} =require('../controller/planController');
// all plan ko lekar aayega
planRouter.route('/allPlans')
.get(getAllPlans)

//own plan -> logged in necessary
planRouter.use(protectRoute) 
planRouter.route('/plan/:id') 
.get(getPlan)


// admin and restaurant owner can only create delete and update plans
planRouter.use(isAuthorised(['admin',
'restaurantowner']));

planRouter
.route('/crudPlan')
.post(createPlan)


planRouter
.route('/crudPlan/:id')
.patch(updatePlan)
.delete(deletePlan)

planRouter .route("/top3")
.get(top3plans)

module.exports = planRouter;