// 4️⃣ Paystack webhook
app.post(
  "/paystack-webhook",
  express.raw({ type: "application/json" }),
  async (req, res) => {
    try {
      const secret = process.env.PAYSTACK_SECRET_KEY;

      const hash = crypto
        .createHmac("sha512", secret)
        .update(req.body)
        .digest("hex");

      const signature = req.headers["x-paystack-signature"];

      if (hash !== signature) {
        return res.status(401).send("Invalid signature");
      }

      const event = JSON.parse(req.body.toString());
if (event.event === "charge.success") {
  const {
    reference,
    amount,
    currency,
    customer,
    metadata
  } = event.data;

  await supabase.from("payments").insert({
    reference,
    user_id: metadata.user_id,
    order_id: metadata.order_id,
    total_price: metadata.total_price,
    amount: amount / 100,
    email: customer.email,
    currency,
    status: "success"
  });
}

 

      res.sendStatus(200);
    } catch (error) {
      console.error("Webhook error:", error);
      res.sendStatus(500);
    }
  }
);
