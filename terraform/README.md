# Terraform - Despliegue AWS ECS

Esta carpeta contiene la infraestructura como código para desplegar el proyecto en AWS usando ECS Fargate.

## Requisitos

- AWS CLI configurado o credenciales de GitHub Actions
- Terraform instalado (1.5.x o superior)
- Cuenta AWS con permisos para ECS, ECR, RDS, VPC y IAM

## Variables necesarias

Crea un archivo `terraform/terraform.tfvars` basado en `terraform/terraform.tfvars.example`.

Variables importantes:

- `aws_region`
- `project_name`
- `ecr_backend_repo`
- `ecr_frontend_repo`
- `db_password`

## Comandos locales

Desde `terraform/`:

```powershell
terraform init
terraform validate
terraform apply -auto-approve
```

## Deploy desde GitHub Actions

El workflow en `.github/workflows/ci-cd.yml` realiza:

1. Checkout del repositorio
2. Configuración de credenciales AWS
3. Creación de repositorios ECR si no existen
4. Build y push de imágenes Docker para backend y frontend
5. Inicialización de Terraform
6. Aplicación de Terraform con las imágenes y la contraseña de la base de datos

## Notas

- El frontend se expone través del Application Load Balancer público.
- El backend solo recibe tráfico de la tarea frontend mediante grupos de seguridad.
- MySQL se despliega en RDS y no es accesible públicamente.
- El autoscaling de ECS usa Target Tracking CPU al 50%.
