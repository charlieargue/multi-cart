##################################################################################
# MAIN CONFIG
##################################################################################
terraform {
  backend "local" {
  }
  required_providers {
    aws = {
      source  = "hashicorp/aws"
      version = "~> 3.27"
    }
  }
}

provider "aws" {
  profile = "default"
  region  = var.aws_region
}

resource "aws_budgets_budget" "cost" {
  budget_type       = "COST"
  limit_amount      = "100"
  limit_unit        = "USD"
  time_period_end   = "2087-06-15_00:00"
  time_period_start = "2017-07-01_00:00"
  time_unit         = "MONTHLY"
}


locals {
  env_name = lower(terraform.workspace) # a nice lowercase version, in case I ever switch actual workspace names
  common_tags = {
    Environment = local.env_name
    AppPrefix = "multicart_"
  }
}
