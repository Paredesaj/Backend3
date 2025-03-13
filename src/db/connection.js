import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();

export const connectDB = () => {
  const mongoURI = process.env.MONGODB_URI; // Asegúrate de que esta variable esté bien definida en .env

  if (!mongoURI) {
    console.error('Mongo URI no está definida en el archivo .env');
    process.exit(1); // Si no hay URI, termina el proceso
  }

  mongoose.connect(mongoURI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  .then(() => console.log('Conexión exitosa a MongoDB'))
  .catch(err => console.error('Error al conectar a MongoDB:', err));
};
