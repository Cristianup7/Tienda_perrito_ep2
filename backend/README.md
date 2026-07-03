# Backend - Tienda de Alimentos para Perrritos

API Node.js con Express para gestionar productos en MySQL.

## Rutas disponibles

- `GET /api/productos`
- `GET /api/productos/:id`
- `POST /api/productos`
- `PUT /api/productos/:id`
- `DELETE /api/productos/:id`
- `GET /api/health`

## Ejecución local

```powershell
cd backend
npm install
npm start
```

El servidor escucha en el puerto `3001`.

## Variables de entorno

- `DB_HOST`
- `DB_USER`
- `DB_PASSWORD`
- `DB_NAME`
- `DB_PORT`

Para despliegues en AWS, la infraestructura de Terraform crea la base de datos RDS y el backend recibe estas variables en el task definition.
