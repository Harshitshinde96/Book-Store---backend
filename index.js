import express from "express";
import connectDB from "./config/db.js";
import authRoutes from "./routes/authRoutes.js";
import bookRoutes from "./routes/bookRoutes.js";
import orderRoutes from "./routes/orderRoutes.js";
import aiRoutes from "./routes/AiRoutes.js";

const app = express();
app.use(express.json());
connectDB();

app.use("/api/auth", authRoutes);
app.use("/api/books", bookRoutes);
app.use("/api/order", orderRoutes);
app.use("/api/ai", aiRoutes);

const PORT = 3000;

app.get("/", (req, res) => {
  res.send("BookStore Api is running");
});

app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
});
