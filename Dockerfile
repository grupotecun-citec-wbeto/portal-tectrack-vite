FROM node:20-alpine
WORKDIR /app

COPY package*.json ./
RUN npm install --force

COPY . .
RUN npm run build

# Cloud Run asigna $PORT; usamos 8080 como fallback local
EXPOSE 8080
CMD ["sh", "-c", "npm run preview -- --host 0.0.0.0 --port ${PORT:-8080}"]