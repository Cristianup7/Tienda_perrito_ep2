# syntax=docker/dockerfile:1.7

FROM node:20-alpine AS deps
WORKDIR /app
COPY package*.json ./
RUN npm install --omit=dev --no-audit --no-fund

FROM node:20-alpine AS runtime
ENV NODE_ENV=production
WORKDIR /app
RUN addgroup -S app && adduser -S -G app app
COPY --from=deps /app/node_modules ./node_modules
COPY package*.json ./
COPY server.js ./
USER app
EXPOSE 3001
CMD ["npm", "start"]