// protect route
// let flag = false;     //user logged in or not
const jwt = require('jsonwebtoken');
const JWT_KEY = require('./secret');

module.exports = protectRoute; 