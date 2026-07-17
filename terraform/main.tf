terraform {
  required_version = ">= 1.5.0"

  required_providers {
    aws = {
      source  = "hashicorp/aws"
      version = "~> 5.0"
    }
  }
}

provider "aws" {
  region = var.region
}

resource "aws_ecr_repository" "backend" {
  name = var.ecr_backend_repo
}

resource "aws_ecr_repository" "frontend" {
  name = var.ecr_frontend_repo
}
