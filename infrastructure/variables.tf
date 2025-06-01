variable "key_name" {
  type    = string
  default = "AccessKey"
}

variable "instance_type" {
  type    = string
  default = "t3.micro"
}

variable "aws_region" {
  type    = string
  default = "ap-south-1"
}

variable "aws_profile" {
  type    = string
  default = "default"
}
