import express from "express";
import { connectDB } from "./config/db.js";
import finRouter from "./routes/financialRecordRoutes.js";
import balRouter from "./routes/balanceRecordRoutes.js";
import cors from "cors";
import walRouter from "./routes/walletRecordRoutes.js";

const app = express();
const port = process.env.PORT || 3000;

connectDB();

app.use(express.json());
app.use(cors());

app.use("/api", finRouter);
app.use("/api/bal", balRouter);
app.use("/api/wal", walRouter);
app.get("/", (req, res) => {
  res.send("Hello World guys");
});
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
