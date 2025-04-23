import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import cartRouter from "./src/routes/carts.router.js";
import productRouter from "./src/routes/products.router.js";
import mocksRouter from "./src/routes/mocks.router.js";
import adoptionRouter from "./src/routes/adoption.router.js";
import { connectDB } from "./src/db/connection.js";
import swaggerJSDoc from 'swagger-jsdoc';
import swaggerUiExpress from 'swagger-ui-express';

// Cargar variables de entorno
dotenv.config();

const app = express();
const PORT = process.env.PORT || 8080;

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Configuración de Swagger
const swaggerOptions = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'API Usuarios y Más',
      version: '1.0.0',
      description: 'Documentación completa del backend de ecommerce, incluyendo componentes y seguridad',
    },
    servers: [
      {
        url: `http://localhost:${PORT}`,
        description: "Servidor local de desarrollo",
      },
    ],
  },
  apis: ['./src/routes/*.js'],
};

const specs = swaggerJSDoc(swaggerOptions);
app.use('/api-docs', swaggerUiExpress.serve, swaggerUiExpress.setup(specs));

// Rutas
app.use("/api/carts", cartRouter);
app.use("/api/products", productRouter);
app.use("/api/mocks", mocksRouter);
app.use("/api/adoptions", adoptionRouter);

// Ruta raíz
app.get("/", (req, res) => {
  res.send("¡Bienvenido a la tienda!");
});

// Conexión y servidor
(async () => {
  try {
    await connectDB(); // Conexión a la base de datos
    app.listen(PORT, () => {
      console.log(`🚀 Servidor corriendo en http://localhost:${PORT}`);
      console.log(`📚 Documentación Swagger disponible en http://localhost:${PORT}/api-docs`);
    });
  } catch (err) {
    console.error("❌ No se pudo iniciar el servidor debido a problemas con la conexión a la base de datos.");
    process.exit(1);
  }
})();
