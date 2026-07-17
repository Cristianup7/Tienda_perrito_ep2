variable "region" {
  description = "Región de AWS para los recursos"
  type        = string
  default     = "us-east-1"
}

variable "project_name" {
  description = "Nombre base del proyecto"
  type        = string
  default     = "perritos-tienda"
}

variable "ecr_backend_repo" {
  description = "Nombre del repositorio ECR para el backend"
  type        = string
  default     = "perritos-backend"
}

variable "ecr_frontend_repo" {
  description = "Nombre del repositorio ECR para el frontend"
  type        = string
  default     = "perritos-frontend"
}

variable "db_password" {
  description = "Contraseña para la base de datos"
  type        = string
  sensitive   = true
  default     = "changeme"
}
