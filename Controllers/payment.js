const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);
// const { v4: uuidv4 } = require("uuid");
const db = require('../lib/prisma');
const jwt = require('jsonwebtoken');

const endpointSecret = process.env.STRIPE_ENDPOINT_SECRET;
const webhook = async (request, response) => {
  
    const sig = request.headers["stripe-signature"];

    let event;
  
    try {
      event = stripe.webhooks.constructEvent(request.rawBody, sig, endpointSecret);
    } catch (err) {
      console.log(`⚠️  Webhook signature verification failed.`+err.message);
      response.status(400).send(`Webhook Error: ${err.message}`);
      return;
    }
    console.log("webhook");
    // Handle the event
    switch (event.type) {
      case "checkout.session.completed":
        const paymentSuccessData = event.data.object;
        const sessionId = paymentSuccessData.id;
        try {
        const update = await db.coinTransaction.update({
          where: {
            sessionId: sessionId,
          },
          data: {
            status: paymentSuccessData.status,
          },
        });
        
        const user = await db.user.findUnique({
          where: {
            id: update.userId,
          },
        });

        const updateUser = await db.user.update({
          where: {
            id: user.id,
          },
          data: {
            coin: user.coin + update.amount,
          },
        });

        }catch (error) {
          console.error('Error updating user:', error);
          response.status(400).json(error);
        }

        console.log('PaymentIntent was successful!');
        break;
      // ... handle other event types
      default:
        console.log(`Unhandled event type ${event.type}`);
    }
  
    // Return a 200 response to acknowledge receipt of the event
    response.send();
};

const checkout = async (req, res) => {
  const { product, information } = req.body;
  console.log("product", product);
  const token = req.headers.authorization.split(" ")[1];
  console.log("token", token);
  const decoded = jwt.verify(token, process.env.JWT_SECRET);
  const user = await db.user.findUnique({
    where: {
      id: decoded.id,
    },
  });
  try {
    // create payment session
    // const orderId = uuidv4();
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card", "promptpay"],
      line_items: [
        {
          price_data: {
            currency: "thb",
            product_data: {
              name: product.name,
            },
            unit_amount: product.price * 100,
          },
          quantity: product.quantity,
        },
      ],
      mode: "payment",
      success_url: `${process.env.WEB_CLIENT_URL}/coin-transaction/success`,
      cancel_url: `${process.env.WEB_CLIENT_URL}/cancel`,
    });

    // create order in database (name, address, session id, status)
    await db.coinTransaction.create({
      data: {
        userId: user.id,
        purchasename: product.name,
        amount: product.price,
        sessionId: session.id,
        status: session.status,
        date: new Date(),
      },
    });
    // console.log("session", session);
    

    res.json({
      message: "Checkout success.",
      id: session.id,
    });
  } catch (error) {
    console.error("Error creating user:", error.message);
    res.status(400).json({ error: "Error payment" });
  }
}

module.exports = {
    webhook,
    checkout
}