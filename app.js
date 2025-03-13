import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import cartRouter from "./src/routes/carts.router.js";
import productRouter from "./src/routes/products.router.js";
import mocksRouter from "./src/routes/mocks.router.js";
import { connectDB } from "./src/db/connection.js";

dotenv.config();
const app = express();
const PORT = process.env.PORT || 8080;

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Conexión a MongoDB
connectDB();  // Esta función se encargará de conectar a MongoDB, que usas de manera modular.

// Rutas
app.use("/api/carts", cartRouter);
app.use("/api/products", productRouter);
app.use("/api/mocks", mocksRouter);

// Ruta de prueba
app.get("/", (req, res) => {
  res.send("¡Bienvenido a la tienda!");
});

// Iniciar el servidor
app.listen(PORT, () => {
  console.log(`🚀 Servidor corriendo en http://localhost:${PORT}`);
});
