const express = require('express');
const authRouter = express.Router();
const userModel = require('../models/userModel');
const jwt = require('jsonwebtoken');
const { sendMail } = require('../utility/Nodemailer');
const JWT_KEY = 'jaimakalithoddedhusmankinali'

//signup user
module.exports.signup = async function Signup(req, res) {
    try {
        let dataObj = req.body;
        let user = await userModel.create(dataObj);
        sendMail("signup", user);
        if (user) {
            return res.json({
                msg: "user signed up",
                data: user
            });
        } else {
            res.json({
                message: "error while sign up"
            })
        }
    }
    catch (err) {
        res.status({
            message: err.messsage
        });
    }
};

//loggin user
module.exports.login = async function login(req, res) {
    try {
        let data = req.body;
        if (data.email) {
            let user = await userModel.findOne({ email: data.email });
            if (user) {
                if (user.password == data.password) {
                    let uid = user['_id'];
                    let token = jwt.sign({ payload: uid }, JWT_KEY); //is line se signnature bnega
                    res.cookie('login', token, { httpOnly: true });
                    return res.json({
                        message: "user logged in successfully",
                        userDetails: data

                    })
                }
                else {
                    return res.json({
                        message: "wrong credential"
                    })
                }
            }
            else {
                return res.json({
                    message: "user not fond"
                })
            }
        } else {
            return res.json({
                message: "user not found"
            })
        }
    } catch (err) {
        return res.json({
            message: err.message
        })
    }
};

//isAuthorised function to check the uswe role

module.exports.isAuthorised = function isAuthorised(roles) {
    return function (req, res, next) {
        if (roles.includes(req.role) == true) {
            next();
        }
        else {
            res.status(401).json({
                msg: "user not allowed"
            })
        }
    }
}
//protectRoute
module.exports.protectRoute = async function protectRoute(req, res, next) {
    try {
        let token;
        if (req.cookies.login) {
            console.log(req.cookies);
            token = req.cookies.login;
            let payload = jwt.verify(token, JWT_KEY);
            if (payload) {
                console.log('payload token', payload);
                const user = await userModel.findById(payload);
                req.role = user.role;
                req.id = user.id;
                console.log(req.role);
                next();
            }
            else {
                return res.json({
                    msg: "plz login again"
                })
            }
        } else {
            //browser
            const client = req.get('User-Agent');
            if (client.includes("Mozila") == true) {
                return res.redirect('/login');
            }
            res.json({
                message: "Please login "
            })
        }
    }
    catch (err) {
        return res.json({
            msg: err.msg
        })
    }
}
//forget paasword
module.exports.forgetpassword = async function forgetpassword(req, res) {
    let { email } = req.body;
    try {
        const user = await userModel.findOne({ email: email })
        if (user) {

            const resetToken = user.createResetToken();
            let resetPasswordLink = `${req.protocol}://${req.get("host")}/resetpassword/${resetToken}`;
        }
        let obj = {
            resetPasswordLink: resetPasswordLink,
            email: email
        }
        sendMail("resetpassword", obj);
        return res.json({
            message: "please sign up"
        });
    }

    catch (err) {
        return res.status(500).json({
            message: err.message
        });
    }

}

//reste password

module.exports.resetpassword = async function resetpassword(req, res) {
    try {
        const token = req.params.token;
        let { password, confirmpassword } = req.body;
        const user = await userModel.findOne({ resetToken: token });
        if (user) {
            // reset password handler will update user in database
            user.resetPasswordHandler(password, confirmpassword)
            await user.save();
            res.json({
                message: "password changed successfully login user again"
            })
        }
        else {
            res.json({
                message: "user not found"
            });
        }

    }
    catch (err) {
        res.json({
            message: err.message
        })
    }
}

//logout function

module.exports.logout = function logout(req, res) {
    res.cookie('login', ' ', { maxAge: 1 });
    res.json({
        message: "user logged out successfully"
    })
}

