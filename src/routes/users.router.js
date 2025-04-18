import { Router } from 'express';
const router = Router();

// Simulación de base de datos de usuarios
let users = [
  { id: 1, name: 'Juan', email: 'juan@example.com' },
  { id: 2, name: 'Ana', email: 'ana@example.com' }
];

/**
 * @swagger
 * tags:
 *   name: Users
 *   description: Operaciones sobre usuarios
 */

/**
 * @swagger
 * /api/users:
 *   get:
 *     summary: Obtener todos los usuarios
 *     tags: [Users]
 *     responses:
 *       200:
 *         description: Lista de usuarios
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: integer
 *                     example: 1
 *                   name:
 *                     type: string
 *                     example: Juan
 *                   email:
 *                     type: string
 *                     example: juan@example.com
 */
router.get('/', (req, res) => {
  res.status(200).json(users);
});

/**
 * @swagger
 * /api/users:
 *   post:
 *     summary: Crear un nuevo usuario
 *     tags: [Users]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *               - email
 *             properties:
 *               name:
 *                 type: string
 *                 example: Maria
 *               email:
 *                 type: string
 *                 example: maria@example.com
 *     responses:
 *       201:
 *         description: Usuario creado exitosamente
 */
router.post('/', (req, res) => {
  const { name, email } = req.body;
  const newUser = {
    id: users.length + 1,
    name,
    email,
  };
  users.push(newUser);
  res.status(201).json(newUser);
});

export default router;
