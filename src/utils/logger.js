import winston from 'winston';

// Configuración del logger con Winston
const logger = winston.createLogger({
  level: 'info', // Registra logs de nivel 'info' o superior
  transports: [
    // Transportes para la consola (mostrará los logs en la terminal)
    new winston.transports.Console({ format: winston.format.simple() }),

    // Transporte para los logs generales
    new winston.transports.File({ filename: 'logs/combined.log' }),

    // Transporte solo para los errores
    new winston.transports.File({ filename: 'logs/errors.log', level: 'error' }),
  ],
});

export default logger;
