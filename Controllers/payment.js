const stripe = require('stripe')('sk_test_51OkK2WDulwlvkdooh3ykqALd0nifJBu63s9d4ADgPa2fGqqgrE2JgyhzgOHxfBLbq2HQlbY0xbIHQX1REpJNzPaH00vHJyPFhR');
const { v4: uuidv4 } = require("uuid");
const db = require('../lib/prisma');
const jwt = require('jsonwebtoken');

const payment =  async (req, res) => {
  // Use an existing Customer ID if this is a returning customer.
  const customer = await stripe.customers.create();
  const ephemeralKey = await stripe.ephemeralKeys.create(
    {customer: customer.id},
    {apiVersion: '2023-10-16'}
  );
  const paymentIntent = await stripe.paymentIntents.create({
    amount: 1099,
    currency: 'thb',
    customer: customer.id,
    // payment_method_types: ['card', 'promptpay'],
    // In the latest version of the API, specifying the `automatic_payment_methods` parameter
    // is optional because Stripe enables its functionality by default.
    automatic_payment_methods: {
      enabled: true,
    },
  });

  res.json({
    paymentIntent: paymentIntent.client_secret,
    ephemeralKey: ephemeralKey.secret,
    customer: customer.id,
    publishableKey: 'pk_test_51OkK2WDulwlvkdoosW76OZEezA58xYfIm7aVPQvQvajiwG3rcVUg3YXKlRlivhv6FjDJVKpfDx2OnRtFSwKRqDpq00qCjUa9eG'
  });
};

const endpointSecret = "whsec_cb11971fda820ef6ab4ddc4844f52c16ff655725faf3203c4fd288b9e7304941";
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
        console.log("sessionId", sessionId);
        console.log("paymentSuccessData", paymentSuccessData);
        console.log("status", paymentSuccessData.status)
        try {
        const update = await db.coinTransaction.update({
          where: {
            sessionId: sessionId,
          },
          data: {
            status: paymentSuccessData.status,
          },
        });
        if(update){
          console.log("update success");
        }
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
    const orderId = uuidv4();
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
      success_url: `http://localhost:8888/success.html?id=${orderId}`,
      cancel_url: `http://localhost:8888/cancel.html?id=${orderId}`,
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
    payment,
    webhook,

    checkout
}