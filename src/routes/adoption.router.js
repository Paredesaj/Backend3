// src/routes/adoption.router.js
import { Router } from 'express';
import logger from '../utils/logger.js'; // Asegúrate de tener este archivo

const router = Router();

// Simulación de base de datos
let adoptions = [
  { id: 1, userId: 'abc123', petId: 'pet456' }
];

// Obtener todas las adopciones
router.get('/', (req, res) => {
  logger.info('Ruta GET /api/adoptions ejecutada');
  res.status(200).json(adoptions);
});

// Crear una nueva adopción
router.post('/', (req, res) => {
  const { userId, petId } = req.body;

  if (!userId || !petId) {
    logger.warn('Faltan datos para crear adopción');
    return res.status(400).json({ error: 'userId y petId son requeridos' });
  }

  const newAdoption = {
    id: Date.now(),
    userId,
    petId
  };

  adoptions.push(newAdoption);
  logger.info(`Adopción creada: usuario ${userId} adoptó mascota ${petId}`);
  res.status(201).json(newAdoption);
});

export default router;
