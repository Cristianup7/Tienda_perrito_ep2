# Frontend - Tienda de Alimentos para Perrritos

Aplicación web estática servida con Nginx.

## Ejecución local

```powershell
cd frontend
docker build -t perritos-frontend .
```

Para correr localmente usando Docker Compose:

```powershell
cd ..
docker compose up --build
```

Luego abre `http://localhost`.

## Arquitectura en AWS

El frontend se despliega en ECS Fargate y se expone mediante un Application Load Balancer.
La configuración de Nginx direcciona las peticiones a `/api/` hacia `http://backend.local:3001`.
