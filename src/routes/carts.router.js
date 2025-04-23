import { Router } from 'express';
import logger from '../utils/logger.js'; // Asegúrate de tener este archivo

const router = Router();

// Simulación de base de datos de carritos
let carts = [
  { id: 1, products: [1, 2] },
  { id: 2, products: [2] }
];

/**
 * @swagger
 * components:
 *   schemas:
 *     Cart:
 *       type: object
 *       properties:
 *         id:
 *           type: integer
 *         products:
 *           type: array
 *           items:
 *             type: integer
 *       required:
 *         - id
 *         - products
 */

/**
 * @swagger
 * /api/carts:
 *   get:
 *     summary: Obtener todos los carritos
 *     tags: [Carts]
 *     responses:
 *       200:
 *         description: Lista de carritos
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Cart'
 */
router.get('/', (req, res) => {
  logger.info('Ruta GET /api/carts ejecutada');
  res.status(200).json(carts);
});

/**
 * @swagger
 * /api/carts:
 *   post:
 *     summary: Crear un nuevo carrito
 *     tags: [Carts]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               products:
 *                 type: array
 *                 items:
 *                   type: integer
 *             required:
 *               - products
 *     responses:
 *       201:
 *         description: Carrito creado exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Cart'
 */
router.post('/', (req, res) => {
  const { products } = req.body;
  const newCart = {
    id: carts.length + 1,
    products
  };
  carts.push(newCart);
  logger.info(`Carrito con ID ${newCart.id} creado exitosamente`);
  res.status(201).json(newCart);
});

export default router;
