# Preparación para AWS y GitHub Actions

## 1. GitHub

Asegúrate de tener estos secretos en GitHub Actions:

- AWS_ACCESS_KEY_ID
- AWS_SECRET_ACCESS_KEY
- AWS_SESSION_TOKEN

## 2. Valores de AWS que debes revisar

Actualiza en [.github/workflows/deploy.yml](.github/workflows/deploy.yml) estos valores si tu entorno usa otros nombres:

- `us-east-1` (región)
- `perritos-backend`
- `perritos-frontend`
- `perritos-cluster`
- `perritos-backend-service`
- `perritos-frontend-service`

## 3. Requisitos previos en AWS

Antes de ejecutar el pipeline, verifica que existan o se puedan crear:

- Repositorios ECR para backend y frontend
- Cluster ECS
- Servicios ECS para backend y frontend

## 4. Siguiente paso

Haz push de los cambios a GitHub y ejecuta el workflow desde la pestaña Actions.
