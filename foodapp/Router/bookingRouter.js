const express = require('express');
const bookingRouter =express.Router();
const{protectRoute}=require('../controller/authController');
const {createSession} = require('../controller/bookingController')

// bookingRouter.post('/createSession', protectRoute(createSession))
bookingRouter.post('/createSession', function(req, res){
    protectRoute(createSession)
  });
bookingRouter.get('/createSession', function(req,res){
    res.sendFile('/Users/user/Desktop/backend series/foodapp/booking.html');
});

module.exports = bookingRouter;
