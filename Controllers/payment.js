const stripe = require('stripe')('sk_test_51OkK2WDulwlvkdooh3ykqALd0nifJBu63s9d4ADgPa2fGqqgrE2JgyhzgOHxfBLbq2HQlbY0xbIHQX1REpJNzPaH00vHJyPFhR');
// This example sets up an endpoint using the Express framework.
// Watch this video to get started: https://youtu.be/rPR2aJ6XnAc.

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
    const sig = request.headers['stripe-signature'];

    let event;
  
    try {
      event = stripe.webhooks.constructEvent(request.body, sig, endpointSecret);
    } catch (err) {
      response.status(400).send(`Webhook Error: ${err.message}`);
      return;
    }
  
    // Handle the event
    switch (event.type) {
      case 'payment_intent.succeeded':
        const paymentIntentSucceeded = event.data.object;
        // Then define and call a function to handle the event payment_intent.succeeded
        break;
      // ... handle other event types
      default:
        console.log(`Unhandled event type ${event.type}`);
    }
  
    // Return a 200 response to acknowledge receipt of the event
    response.send();
};

// app.post('/payment-sheet/confirm', async (req, res) => {
//     const paymentIntent = await stripe.paymentIntents.confirm(
//         req.body.paymentIntentId,
//         {payment_method: req.body.paymentMethodId}
//     );
    
//     res.json({paymentIntent: paymentIntent});
//     });

// app.post('/payment-sheet/cancel', async (req, res) => {
//     const paymentIntent = await stripe.paymentIntents.cancel(
//         req.body.paymentIntentId
//     );
    
//     res.json({paymentIntent: paymentIntent});
//     });

module.exports = {
    payment,
    webhook
}