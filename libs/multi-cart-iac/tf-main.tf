##################################################################################
# MAIN CONFIG
##################################################################################
terraform {
  backend "remote" {
    hostname     = "app.terraform.io"
    organization = "multi-cart"

    workspaces {
      prefix = "multi-cart-"
    }
  }
  required_providers {
    aws = {
      source  = "hashicorp/aws"
      version = "~> 3.27"
    }
  }

  required_version = ">= 0.13.0"
}


provider "aws" {
  profile = "default"
  region  = var.AWS_REGION
}

resource "aws_budgets_budget" "cost" {
  budget_type       = "COST"
  limit_amount      = "95"
  limit_unit        = "USD"
  time_period_end   = "2087-06-15_00:00"
  time_period_start = "2017-07-01_00:00"
  time_unit         = "MONTHLY"
}

