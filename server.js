app.post("/paystack-webhook", express.json(), (req, res) => {
  console.log("Webhook received");
  res.status(200).json({ received: true });
});
