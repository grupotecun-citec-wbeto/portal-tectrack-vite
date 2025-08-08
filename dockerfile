FROM node:20.15.1
WORKDIR /app

# Copiar archivos de dependencias
COPY package*.json ./

# Instalar dependencias (usar install en lugar de ci para evitar problemas de sincronización)
RUN npm install --force

# Copiar resto del código
COPY . .

# Construir la aplicación para producción
RUN npm run build

# Exponer puerto 80 para producción
EXPOSE 80

# Comando para servir la aplicación en puerto 80
CMD ["npm", "run", "preview", "--", "--host", "0.0.0.0", "--port", "80"]