# Tienda de Alimentos para Perritos

Proyecto de demo con Frontend, Backend y MySQL, dockerizado para desarrollo local y preparado para despliegue productivo en AWS ECS.

## Arquitectura actual

- `frontend/`: sitio web estático servido por Nginx.
- `backend/`: API Node.js + Express.
- `db/`: inicialización de MySQL con datos de ejemplo.
- `docker-compose.yml`: orquesta frontend, backend y base de datos.

## Uso local

Desde la raíz del repositorio:

```powershell
docker compose up --build
```

Abrir `http://localhost` en el navegador.

## Despliegue recomendado en AWS

Este repositorio contiene soporte para despliegue en AWS usando ECS Fargate y ECR. El flujo recomendado es:

1. Crear repositorios ECR para `perritos-frontend` y `perritos-backend`.
2. Configurar GitHub Actions Secrets.
3. Ejecutar el pipeline en `.github/workflows/ci-cd.yml`.
4. Terraform provisiona VPC, ECS, ALB, ECR, RDS y autoscaling.

### GitHub Actions Secrets necesarios

- `AWS_ACCESS_KEY_ID`
- `AWS_SECRET_ACCESS_KEY`
- `AWS_REGION`
- `AWS_ACCOUNT_ID`
- `TF_VAR_db_password`
- `TF_VAR_project_name` (opcional, por defecto `perritos-tienda`)
- `TF_VAR_ecr_backend_repo` (opcional, por defecto `perritos-backend`)
- `TF_VAR_ecr_frontend_repo` (opcional, por defecto `perritos-frontend`)

### Flujo CI/CD

El workflow realiza:

1. Build de `backend` y `frontend`.
2. Push de imágenes a ECR.
3. Terraform apply para desplegar ECS y RDS.

### Infraestructura como código

La carpeta `terraform/` contiene la infraestructura principal.

- `terraform/main.tf`
- `terraform/variables.tf`
- `terraform/outputs.tf`
- `terraform/terraform.tfvars.example`

## Estructura de carpetas

- `backend/`
- `frontend/`
- `db/`
- `.github/workflows/`
- `terraform/`

## Notas de defensa técnica

- Usa ECS Fargate para servicios frontend/backend.
- El frontend se expone con un ALB público.
- El backend se resuelve internamente con AWS Cloud Map `backend.local`.
- El backend se conecta a una base de datos MySQL administrada en Amazon RDS.
- Se configura autoscaling de ECS con target tracking CPU 50%.
