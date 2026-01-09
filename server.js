import express from "express";

const app = express();

// Middleware
app.use(express.json());

// Health check (very important)
app.get("/", (req, res) => {
  res.send("Backend alive");
});

// Paystack webhook
app.post("/paystack-webhook", (req, res) => {
  console.log("Webhook received");
  res.status(200).json({ received: true });
});

// Start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
