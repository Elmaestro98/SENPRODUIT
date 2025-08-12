import express from "express";
import dotenv from "dotenv";
import { connectDB } from "./config/db.js";
import path from "path";
import productRoutes from "./routes/product.route.js";

dotenv.config();
const app = express();
app.use(express.json());

const PORT = process.env.PORT || 5000;

app.use("/api/products", productRoutes);

const __dirname = path.resolve();
//Deploiement
if (process.env.Node_ENV === "production") {
  app.use(express.static(path.join(__dirname, "/frontend/dist")));
  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "frontend", "dist", "index.html"));
  });
}

app.listen(PORT, () => {
  connectDB();
  console.log("le server est lancé à http://localhost:" + PORT);
});

//NDoUWgnuBsqxWzdU
