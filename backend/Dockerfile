# ETAPA 1: Dependencias (Build)
FROM node:18-alpine AS builder
WORKDIR /app
COPY package*.json ./
RUN npm install --production

# ETAPA 2: Producción y Mínimo Privilegio
FROM node:18-alpine
WORKDIR /app
# Copiamos solo lo necesario de la etapa anterior
COPY --from=builder /app/node_modules ./node_modules
COPY server.js ./

# Aplicamos Principio de Mínimo Privilegio (Usuario node en vez de root)
USER node

EXPOSE 3001
CMD ["npm", "start"]