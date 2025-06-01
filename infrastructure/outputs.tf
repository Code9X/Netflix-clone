output "ec2_public_ip" {
  value = aws_eip.netflix_eip.public_ip
}
