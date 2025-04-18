// src/routes/adoption.router.js
import { Router } from 'express';
const router = Router();

// Simulación de base de datos
let adoptions = [
  { id: 1, userId: 'abc123', petId: 'pet456' }
];

// Obtener todas las adopciones
router.get('/', (req, res) => {
  res.json(adoptions);
});

// Crear una nueva adopción
router.post('/', (req, res) => {
  const { userId, petId } = req.body;
  const newAdoption = { id: Date.now(), userId, petId };
  adoptions.push(newAdoption);
  res.status(201).json(newAdoption);
});

export default router;
