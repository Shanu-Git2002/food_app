// This is a public sample test API key.
// Don’t submit any personally identifiable information in requests made with this key.
// Sign in to see your own test API key embedded in code samples.

let SK = "sk_test_51NNrrFSGrG7BrHF7MYytP2r0bvuaA8xUJOtVTkaJy3a5ftg5ezJaXg2EycNIZsgcWh8v9u6ir69yPa9YuyZiw8rc00P6Pa0Zd8"
const stripe = require('stripe')(SK);
const planModel = require('../models/planModel');
const userModel = require('../models/userModel');

module.exports.createSession = async function createSession(req,res) {
  try {
    let userId = req.id;
    let planId = req.params.id;

    const user = await userModel.findById(userId);
    const plan = await planModel.findById(planId);

    const session = await stripe.checkout.sesion.create({
      payment_method_types: ['card'],
      customer_email: user.email,
      client_reference_id: plan.id,
      line_items: [
        {
          name: plan.name,
          description: plan.description,
          //deploy website
          amount: plan.price * 100,
          currency: "inr",
          quantity: 1
        }
      ],
      // dev => http
      // production =>https

      success_url: `${req.protocol}://${req.get('host')}/profile`,
      cancel_url: `${req.protocol}://${req.get('host')}/profile`,
    })

    res.status(200).json({
      status: "success",
      session
    })
  } catch (err) {
    res.status(200).json({
      err: err.message
    })
  }
}
