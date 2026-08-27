import express from "express";
import cors from "cors";

const app = express();

app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  }),
);

app.use(express.json());

app.post("/auth/google", (req, res) => {
  console.log("Received from frontend:");
  console.log(req.body);

  res.json({
    success: true,
    message: "Received successfully",
    received: req.body,
  });
});

app.listen(3000, () => {
  console.log("Server running on http://localhost:3000");
});
