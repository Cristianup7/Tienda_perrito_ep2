output "frontend_url" {
  description = "URL pública del frontend"
  value       = "http://${aws_lb.frontend.dns_name}"
}

output "backend_service_name" {
  description = "Nombre del servicio ECS backend"
  value       = aws_ecs_service.backend.name
}

output "db_endpoint" {
  description = "Endpoint de la base de datos RDS"
  value       = aws_db_instance.main.address
}
