# Defensa Técnica — Evaluación Parcial N°3

## Resumen de la solución
Se desplegó la aplicación "Tienda de Alimentos para Perritos" usando AWS ECS (Fargate) con imágenes almacenadas en Amazon ECR. La infraestructura se provisiona con Terraform y el pipeline CI/CD está implementado con GitHub Actions para build → push → deploy.

## Arquitectura
- VPC con 2 subredes públicas y 2 privadas.
- Application Load Balancer (ALB) público exponiendo el `frontend`.
- `frontend` y `backend` como servicios ECS (Fargate).
  - `frontend` registrado en ALB target group (HTTP 80 → container 8080).
  - `backend` registrado en Service Discovery (`backend.<project>.local:3001`) para comunicación interna.
- Base de datos MySQL en Amazon RDS (no pública) conectada solo desde `backend`.
- CloudWatch Logs para frontend y backend.

## Roles y seguridad
- IAM Roles:
  - `ecsTaskExecutionRole` (permite pull desde ECR y envío de logs a CloudWatch).
  - `ecsTaskRole` para permisos mínimos necesarios (lectura de secretos si aplica).
- Security Groups:
  - ALB SG: permite HTTP público.
  - Frontend SG: permite tráfico ALB → frontend.
  - Backend SG: permite tráfico frontend → backend (puerto 3001).
  - RDS SG: permite tráfico solo desde Backend SG (puerto 3306).
- Secrets: credenciales RDS se pasan mediante variables de Terraform; en producción usar Secrets Manager o SSM.

## Autoscaling (justificación)
- Tipo: Target Tracking Autoscaling en ECS (Application Auto Scaling).
- Métrica: `ECSServiceAverageCPUUtilization` con target value 50%.
- Rango: `min=1`, `max=3`.
- Justificación: la app es una demo con carga baja; 50% CPU balancea sobre-provisionamiento y latencia. Min=1 garantiza disponibilidad mínima; Max=3 permite absorber picos de tráfico de pruebas sin costos excesivos.

## CI/CD (GitHub Actions)
- Flujo:
  1. `actions/checkout`
  2. `aws-actions/configure-aws-credentials` con secrets GitHub
  3. Crear repositorios ECR (si no existen)
  4. Build y push de imágenes usando `docker build` y `docker push` a ECR
  5. Terraform init + apply usando las imágenes empujadas
- Secrets necesarios en GitHub: `AWS_ACCESS_KEY_ID`, `AWS_SECRET_ACCESS_KEY`, `AWS_REGION`, `AWS_ACCOUNT_ID`, `TF_VAR_db_password`.

## Monitoreo y logs
- CloudWatch Logs por servicio con retención 14 días.
- Métricas clave:
  - CPU y memoria por servicio
  - Latencia del ALB
  - Número de requests / error rate
- Procedimiento de análisis: revisar CloudWatch Alarms (no implementadas por defecto) y usar logs para rastrear errores en endpoints `/api`.

## Pruebas y validación
- Local: `docker compose up --build` para verificar funcionalidad completa.
- Pipeline: activar GitHub Actions en `main` para validar build → push → deploy.
- Validaciones manuales:
  - `curl http://<ALB_DNS>/` → frontend
  - `curl http://<ECS_TASK_IP>:3001/api/health` (desde bastion o tareas internas) → backend

## Problemas conocidos y mitigaciones
- Tiempo de inicialización de RDS: la tarea backend puede fallar si intenta conectar antes de que RDS esté lista. Mitigación: añadir retries exponenciales en `server.js` o Healthcheck/depends_on en Terraform.
- Secrets en TF vars: usar AWS Secrets Manager para producción.

## Comandos útiles
```bash
# Local
make compose-up
# Terraform (local)
cd terraform
terraform init
terraform apply -auto-approve

# CI/CD en GitHub: push a main activa el workflow
```

## Preguntas frecuentes para la defensa
- ¿Por qué ECS Fargate y no EKS?
  - Fargate reduce complejidad operativa para la evaluación, permite despliegues rápidos y autoescalado sin manejar nodos.
- ¿Cómo asegurar las credenciales?
  - GitHub Secrets para pipeline; AWS Secrets Manager para runtime; políticas IAM con privilegios mínimos.

---

Si quieres, genero una diapositiva de 1 página (Markdown o PDF) con estos puntos para apoyar la defensa.