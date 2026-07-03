variable "aws_region" {
  description = "AWS region for deployment"
  type        = string
  default     = "us-east-1"
}

variable "project_name" {
  description = "Project prefix for AWS resources"
  type        = string
  default     = "perritos-tienda"
}

variable "ecr_backend_repo" {
  description = "ECR repository name for backend"
  type        = string
  default     = "perritos-backend"
}

variable "ecr_frontend_repo" {
  description = "ECR repository name for frontend"
  type        = string
  default     = "perritos-frontend"
}

variable "backend_image" {
  description = "Full ECR image URI for backend"
  type        = string
  default     = ""
}

variable "frontend_image" {
  description = "Full ECR image URI for frontend"
  type        = string
  default     = ""
}

variable "db_username" {
  description = "Database user for RDS MySQL"
  type        = string
  default     = "admin"
}

variable "db_password" {
  description = "Database password for RDS MySQL"
  type        = string
  sensitive   = true
}

variable "db_name" {
  description = "Database name for MySQL"
  type        = string
  default     = "tienda_perritos"
}

variable "container_cpu" {
  description = "CPU units for ECS containers"
  type        = number
  default     = 512
}

variable "container_memory" {
  description = "Memory (MiB) for ECS containers"
  type        = number
  default     = 1024
}

variable "task_count_min" {
  description = "Minimum number of ECS tasks"
  type        = number
  default     = 1
}

variable "task_count_max" {
  description = "Maximum number of ECS tasks"
  type        = number
  default     = 3
}
