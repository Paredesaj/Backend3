# Imagen base
FROM node:18

# Establece el directorio de trabajo dentro del contenedor
WORKDIR /app

# Copia únicamente los archivos necesarios para instalar dependencias
COPY package*.json ./

# Instala las dependencias dentro del contenedor
RUN npm install

# Copia el resto del código fuente
COPY . .

# Evita copiar node_modules de tu host al contenedor (asegúrate de tener un .dockerignore también)
# Esto lo evita en práctica si tenés .dockerignore correctamente configurado

# Expone el puerto de la aplicación
EXPOSE 8080

# Comando por defecto para iniciar tu app
CMD ["node", "app.js"]
