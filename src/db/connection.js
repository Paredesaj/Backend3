import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();

export const connectDB = async () => {
  const mongoURI = process.env.MONGO_URL || process.env.MONGODB_URI; // Prioriza MONGO_URL, pero acepta MONGODB_URI también

  if (!mongoURI) {
    console.error('❌ Error: Mongo URI no está definida en el archivo .env');
    process.exit(1); // Sale del proceso si no hay URI
  }

  try {
    await mongoose.connect(mongoURI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('✅ Conexión exitosa a MongoDB');
  } catch (error) {
    console.error('❌ Error al conectar a MongoDB:', error);
    process.exit(1); // Sale del proceso si falla la conexión
  }
};
