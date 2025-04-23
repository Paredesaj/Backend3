# Usa una imagen base de Node.js
FROM node:16

# Establece el directorio de trabajo dentro del contenedor
WORKDIR /usr/src/app

# Copia los archivos del proyecto al contenedor
COPY package*.json ./

# Instala las dependencias
RUN npm install

# Copia todo el código fuente del proyecto al contenedor
COPY . .

# Expón el puerto en el que tu aplicación escucha (cambia 8080 por el puerto que usas)
EXPOSE 8080
# Define el comando por defecto para ejecutar la aplicación
CMD ["npm", "start"]
