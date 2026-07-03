# Makefile para despliegue y tareas comunes

.PHONY: tf-init tf-validate tf-plan tf-apply tf-destroy build-backend build-frontend compose-up compose-down

# Terraform
tf-init:
	cd terraform && terraform init

tf-validate:
	cd terraform && terraform validate

tf-plan:
	cd terraform && terraform plan -out=tfplan

tf-apply:
	cd terraform && terraform apply -auto-approve

tf-destroy:
	cd terraform && terraform destroy -auto-approve

# Docker build local (tags useful for debugging)
build-backend:
	docker build -t perritos-backend:local backend

build-frontend:
	docker build -t perritos-frontend:local frontend

# Docker Compose (desarrollo)
compose-up:
	docker compose up --build

compose-down:
	docker compose down

# Helper: show env requirements
env-check:
	@echo "Required ENV: AWS_ACCESS_KEY_ID, AWS_SECRET_ACCESS_KEY, AWS_REGION, AWS_ACCOUNT_ID, TF_VAR_db_password"
