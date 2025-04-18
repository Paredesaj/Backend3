import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import cartRouter from "./src/routes/carts.router.js";
import productRouter from "./src/routes/products.router.js";
import mocksRouter from "./src/routes/mocks.router.js";
import adoptionRouter from "./src/routes/adoption.router.js"; // <-- agregado
import { connectDB } from "./src/db/connection.js";

// Swagger
import swaggerJSDoc from 'swagger-jsdoc';
import swaggerUiExpress from 'swagger-ui-express';

dotenv.config();
const app = express();
const PORT = process.env.PORT || 8080;

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Conexión a MongoDB
connectDB();

// Swagger config
const swaggerOptions = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'API Users',
      version: '1.0.0',
      description: 'Documentación del módulo de Usuarios',
    },
  },
  apis: ['./src/routes/users.router.js'], // asegurate de tener este archivo creado
};

const specs = swaggerJSDoc(swaggerOptions);
app.use('/api-docs', swaggerUiExpress.serve, swaggerUiExpress.setup(specs));

// Rutas principales
app.use("/api/carts", cartRouter);
app.use("/api/products", productRouter);
app.use("/api/mocks", mocksRouter);
app.use("/api/adoptions", adoptionRouter); // <-- agregado

// Ruta raíz
app.get("/", (req, res) => {
  res.send("¡Bienvenido a la tienda!");
});

// Servidor en marcha
app.listen(PORT, () => {
  console.log(`🚀 Servidor corriendo en http://localhost:${PORT}`);
  console.log(`📚 Documentación Swagger disponible en http://localhost:${PORT}/api-docs`);
});
