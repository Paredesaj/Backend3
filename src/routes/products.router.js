import { Router } from 'express';
import logger from '../utils/logger.js'; // Asegurate que exista este archivo
const router = Router();

// Simulación de base de datos de productos
let products = [
  { id: 1, title: 'Producto 1', price: 100 },
  { id: 2, title: 'Producto 2', price: 200 }
];

/**
 * @swagger
 * components:
 *   schemas:
 *     Product:
 *       type: object
 *       properties:
 *         id:
 *           type: integer
 *         title:
 *           type: string
 *         price:
 *           type: integer
 *       required:
 *         - id
 *         - title
 *         - price
 */

/**
 * @swagger
 * /api/products:
 *   get:
 *     summary: Obtener todos los productos
 *     tags: [Products]
 *     responses:
 *       200:
 *         description: Lista de productos
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Product'
 */
router.get('/', (req, res) => {
  logger.info('Ruta GET /api/products ejecutada');
  res.status(200).json(products);
});

/**
 * @swagger
 * /api/products:
 *   post:
 *     summary: Crear un nuevo producto
 *     tags: [Products]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *               price:
 *                 type: integer
 *             required:
 *               - title
 *               - price
 *     responses:
 *       201:
 *         description: Producto creado exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Product'
 */
router.post('/', (req, res) => {
  const { title, price } = req.body;
  const newProduct = {
    id: products.length + 1,
    title,
    price
  };
  products.push(newProduct);
  logger.info(`Producto ${title} creado exitosamente`);
  res.status(201).json(newProduct);
});

/**
 * @swagger
 * /api/products/{id}:
 *   put:
 *     summary: Actualizar un producto por ID
 *     tags: [Products]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *               price:
 *                 type: integer
 *     responses:
 *       200:
 *         description: Producto actualizado
 */
router.put('/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const { title, price } = req.body;
  const product = products.find(p => p.id === id);

  if (!product) return res.status(404).json({ error: 'Producto no encontrado' });

  product.title = title || product.title;
  product.price = price || product.price;

  logger.info(`Producto ${id} actualizado`);
  res.status(200).json(product);
});

/**
 * @swagger
 * /api/products/{id}:
 *   delete:
 *     summary: Eliminar un producto por ID
 *     tags: [Products]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Producto eliminado
 */
router.delete('/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const index = products.findIndex(p => p.id === id);

  if (index === -1) return res.status(404).json({ error: 'Producto no encontrado' });

  const deleted = products.splice(index, 1);
  logger.info(`Producto ${id} eliminado`);
  res.status(200).json(deleted[0]);
});

export default router;
