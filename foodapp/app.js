const express = require('express');
// cd foodapp /nodemon app.
const app = express();
const cookieParser = require('cookie-parser')
app.use(express.json()); //global middleware function
app.listen(3000);
app.use(cookieParser());
const userRouter = require('./Router/userRouter');
const planRouter = require('./Router/planRouter');
const reviewRouter = require('./Router/reviewRouter');
const bookingRouter = require('./Router/bookingRouter');
// const authRouter = require('./Router/authRouter')
// let users = [
//   {
//     "id":1,
//     "name":"shnau"
//   },
//   {
//     "id":2,
//     "name":"pooja"
//   },
//   {
//     "id":3,
//     "name":"aarti"
//   }
// ];

//mini Router
// const authRouter = express.Router();
// const userRouter = express.Router();
app.use("/plans",planRouter);
app.use("/user",userRouter);
app.use("/review",reviewRouter);
app.use("/booking",bookingRouter);

// app.use("/auth",authRouter);


