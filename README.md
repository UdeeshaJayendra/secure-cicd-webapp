# SecureOps — Secure Team File Management Platform

A cloud-native **DevSecOps file management platform** built with React, Node.js, MongoDB, AWS S3, Docker, ClamAV, Trivy, Terraform, Amazon ECS Fargate, Amazon ECR, AWS CodeBuild, AWS CodePipeline, CloudWatch, and AWS Secrets Manager.
SecureOps demonstrates how application development, security scanning, infrastructure automation, CI/CD, monitoring, and deployment rollback can be integrated into a single secure workflow.

---
---

# Overview

**SecureOps** is a secure team file management platform designed to demonstrate practical **DevSecOps and cloud engineering practices**.
Users can authenticate, upload files, download files, delete files, manage team roles, and view activity logs.
Uploaded files are scanned using **ClamAV** before being stored in Amazon S3. Container images are scanned using **Trivy** during the CI/CD process before being deployed to Amazon ECS Fargate.
The infrastructure is provisioned using **Terraform**, while AWS CodePipeline automates the deployment workflow.
The project also includes CloudWatch monitoring and ECS deployment circuit breaker functionality with automatic rollback.

### Core workflow

<img width="1408" height="768" alt="architecture" src="https://github.com/user-attachments/assets/83c9e3b2-393b-4768-8538-30fe49c79805" />

---

# Key Features

## Application

* User registration and authentication
* JWT-based authentication
* Role-based access control
* Admin, manager, and member roles
* User activation/deactivation
* Team member management
* File upload
* File download
* File deletion
* File metadata management
* Activity and audit logging

## Security

* Password hashing using bcrypt
* JWT authentication
* Role-based authorization
* File type restrictions
* 10 MB upload limit
* Malware scanning using ClamAV
* EICAR malware detection testing
* Docker image vulnerability scanning using Trivy
* ECR image scanning
* Hardened production Docker image
* AWS IAM least-privilege policies
* AWS Secrets Manager for sensitive configuration
* Private S3 bucket
* S3 server-side encryption
* S3 versioning

## DevSecOps

* GitHub source control
* AWS CodeConnections
* AWS CodePipeline
* AWS CodeBuild
* Automated Docker image build
* Automated Trivy vulnerability scanning
* Amazon ECR
* Amazon ECS Fargate
* CloudWatch monitoring
* ECS deployment circuit breaker
* Automatic deployment rollback
* Infrastructure as Code using Terraform

---

# Architecture

## High-Level Architecture

```text
                         ┌──────────────────────┐
                         │       Developer      │
                         └──────────┬───────────┘
                                    │
                                    ▼
                         ┌──────────────────────┐
                         │       GitHub         │
                         │   Source Repository  │
                         └──────────┬───────────┘
                                    │
                                    ▼
                         ┌──────────────────────┐
                         │    AWS CodePipeline  │
                         └──────────┬───────────┘
                                    │
                                    ▼
                         ┌──────────────────────┐
                         │     AWS CodeBuild    │
                         │                      │
                         │ npm test             │
                         │ Docker build         │
                         │ Trivy scan           │
                         └──────────┬───────────┘
                                    │
                                    ▼
                         ┌──────────────────────┐
                         │     Amazon ECR       │
                         │  SecureOps Backend   │
                         └──────────┬───────────┘
                                    │
                                    ▼
                ┌────────────────────────────────────┐
                │        Amazon ECS Fargate          │
                │                                    │
                │  ┌──────────────────────────────┐  │
                │  │   SecureOps Backend          │  │
                │  │   Node.js / Express          │  │
                │  │   Port 5000                  │  │
                │  └──────────────┬───────────────┘  │
                │                 │                  │
                │  ┌──────────────▼───────────────┐  │
                │  │        ClamAV                │  │
                │  │        Port 3310             │  │
                │  └──────────────────────────────┘  │
                └────────────────────────────────────┘
                           │       │       │
                 ┌─────────┘       │       └─────────┐
                 ▼                 ▼                 ▼
          ┌────────────┐   ┌──────────────┐  ┌──────────────┐
          │ Amazon S3  │   │   MongoDB    │  │   Secrets    │
          │ File Store │   │   Database   │  │   Manager    │
          └────────────┘   └──────────────┘  └──────────────┘
                                   │
                                   ▼
                           ┌──────────────┐
                           │  CloudWatch  │
                           │ Logs/Alarms  │
                           └──────────────┘
```

---

# Technology Stack

| Category               | Technologies                    |
| ---------------------- | ------------------------------- |
| Frontend               | React, JavaScript, CSS          |
| Backend                | Node.js, Express.js             |
| Database               | MongoDB                         |
| Authentication         | JWT, bcrypt                     |
| File Storage           | Amazon S3                       |
| Malware Scanning       | ClamAV                          |
| Containerization       | Docker                          |
| Vulnerability Scanning | Trivy                           |
| Container Registry     | Amazon ECR                      |
| Container Platform     | Amazon ECS Fargate              |
| Infrastructure as Code | Terraform                       |
| CI/CD                  | AWS CodePipeline, AWS CodeBuild |
| Source Control         | GitHub                          |
| Secrets                | AWS Secrets Manager             |
| Monitoring             | Amazon CloudWatch               |
| Cloud Platform         | AWS                             |
| Region                 | ap-south-1 (Mumbai)             |

---

# Application Features

## Authentication

SecureOps provides user registration and login functionality.
Passwords are securely hashed using bcrypt before being stored in MongoDB.
JWT tokens are used to authenticate API requests.

---

## File Management

Authenticated users can:

* Upload files
* View uploaded files
* Download files
* Delete files

Supported file types include common documents, images, text files, JSON, CSV, ZIP, DOCX, and XLSX files.

File uploads are limited to **10 MB**.

### Login Page

<img width="1906" height="907" alt="01-login-page" src="https://github.com/user-attachments/assets/5161d666-1e79-43ad-b9ba-77f0aeec8087" />

### Dashboard

<img width="1882" height="917" alt="02-dashboard" src="https://github.com/user-attachments/assets/67f9de74-8a29-4c55-ab3c-af43e451b242" />


### File Management

<img width="1917" height="910" alt="04-file-management" src="https://github.com/user-attachments/assets/88312b13-5d44-409e-815c-87f73a2037b6" />


### File Upload

<img width="1911" height="910" alt="03-file-upload" src="https://github.com/user-attachments/assets/a7809963-1f22-470a-9042-d61de8d6075b" />

### File Download

<img width="1917" height="917" alt="05-file-download" src="https://github.com/user-attachments/assets/2c70c954-3a8c-4423-b256-b1dbecc0c1c6" />

### File Deleted

<img width="1911" height="915" alt="05-file-deleted" src="https://github.com/user-attachments/assets/b75f63be-2fe7-412c-8240-835f7e5af179" />

---

# Security Features

## Malware Detection with ClamAV

Every uploaded file is scanned by ClamAV before it is stored in Amazon S3.


``

The EICAR antivirus test file was used to verify that malware detection works correctly.

### ClamAV Container

<img width="1306" height="125" alt="07-clamav-container" src="https://github.com/user-attachments/assets/9a9f835b-ff9f-4cac-817a-b239d67ffd72" />

### Malware Detection Test

<img width="1245" height="335" alt="8 malware detecting 1" src="https://github.com/user-attachments/assets/8c9037c5-39c3-4fef-9dc3-f86ef0f34af5" />
<img width="1907" height="840" alt="8 malware detecting 2" src="https://github.com/user-attachments/assets/6df9c0d8-deac-49fc-a571-dc798874e8e2" />
<img width="1606" height="356" alt="8 malware detecting 3" src="https://github.com/user-attachments/assets/3a54e5e4-c1ab-43ae-ada7-84dfba099c11" />



--

# Docker and Container Security

The backend is packaged as a Docker container.

The production Docker image uses a multi-stage build and removes unnecessary package-management tooling from the final image.

The final container is scanned using Trivy.

## Trivy Security Scanning

An initial Trivy scan was used to identify vulnerabilities in the container image.

### Initial Vulnerability Scan

<img width="1310" height="472" alt="31-trivy-vulnerability-report 1" src="https://github.com/user-attachments/assets/7b00ff1a-551d-43d6-bcb8-7821f84e08e9" />

The results were used to harden the Docker image.

### Final Trivy Scan

After hardening the Docker image, the final scan was configured to detect HIGH and CRITICAL vulnerabilities.

<img width="1337" height="623" alt="09 1-trivy-before clean scan" src="https://github.com/user-attachments/assets/12c7b899-9bab-405a-a8d5-e38beb9ec689" />
<img width="1597" height="570" alt="09-trivy-clean-scan" src="https://github.com/user-attachments/assets/0ebb013c-0d30-46dc-ac8f-2238eb964d8f" />


The final scan completed with:

```text
0: Clean
No HIGH or CRITICAL security findings detected
```

---

## Dockerfile

<img width="1605" height="826" alt="10 dockerfile" src="https://github.com/user-attachments/assets/7d263a7a-3016-40c9-85d1-19fe7fe74f14" />

---

# Amazon ECR

The Docker image is stored in Amazon Elastic Container Registry.

### ECR Security Scan

<img width="1884" height="764" alt="11-ecr-security-scan" src="https://github.com/user-attachments/assets/7854e73d-3c03-4ba1-88cd-eb0c111ed3f9" />

---

# AWS Infrastructure

The AWS infrastructure is designed around a public ECS Fargate deployment without requiring a NAT Gateway.

## VPC

<img width="1909" height="713" alt="13-vpc" src="https://github.com/user-attachments/assets/7d92903c-709c-4e4e-a536-bafc49debb28" />

---

## Networking

An Internet Gateway and public route table provide internet connectivity for the ECS task.

<img width="1909" height="407" alt="14-networking 1" src="https://github.com/user-attachments/assets/5e06fb23-7255-43da-8e23-62361b2500f0" />
<img width="1677" height="215" alt="14-networking 2" src="https://github.com/user-attachments/assets/0aca49c7-3f0b-4cdd-bb62-772e0f577594" />
<img width="1685" height="193" alt="14-networking 3" src="https://github.com/user-attachments/assets/16564fdd-ff0c-4b08-a0ea-bc2788398175" />

---

## Security Group

The ECS application security group allows backend traffic on:

```text
TCP 5000
```

Outbound traffic is allowed for required application communication.

<img width="1910" height="516" alt="15-security-group 1" src="https://github.com/user-attachments/assets/18a1a27f-e5bc-4c73-863a-e6433fb0ba78" />
<img width="1907" height="507" alt="15-security-group 2" src="https://github.com/user-attachments/assets/41d08a21-2daa-41f4-8e78-b42f1706558d" />

---

## IAM

Separate IAM roles are used for AWS services.

Examples include:

```text
secureops-ecs-execution-role
secureops-ecs-task-role
secureops-codebuild-role
secureops-codepipeline-role
```

Permissions are scoped according to the responsibilities of each service.

<img width="1910" height="487" alt="16-iam-roles" src="https://github.com/user-attachments/assets/3663b9eb-4bfe-4314-980f-4907afc21485" />

---

# Secrets Management

Sensitive application configuration is stored in AWS Secrets Manager instead of being hard-coded into the Docker image or committed to GitHub.

Secrets include:

```text
secureops/mongodb-uri
secureops/jwt-secret
```

The ECS task retrieves these values securely at runtime.

<img width="1905" height="267" alt="12-secrets-manager" src="https://github.com/user-attachments/assets/27e5b132-30a5-42bd-873f-e3db5a3cb610" />

---

# Amazon ECS Fargate

The backend runs on Amazon ECS using AWS Fargate.

The backend depends on the ClamAV container becoming healthy before the backend container starts.

## ECS Cluster

<img width="1905" height="566" alt="18-ecs-cluster" src="https://github.com/user-attachments/assets/82d3143e-bf3d-496d-84ef-76cd69ba9adc" />

## ECS Service

<img width="1883" height="843" alt="19-ecs-service" src="https://github.com/user-attachments/assets/76019665-fc70-4325-b591-8bec19bebaf1" />

## ECS Task Definition

The task definition uses:

<img width="1883" height="591" alt="20-ecs-task-definition" src="https://github.com/user-attachments/assets/2be9f2a8-924e-486b-910f-bf1ad70ec2c9" />

---

# CI/CD Pipeline

SecureOps uses AWS CodePipeline to automate the application deployment process.

## Pipeline Flow

```text
GitHub
   │
   ▼
CodeConnections
   │
   ▼
CodePipeline
   │
   ▼
CodeBuild
   │
   ├── Install dependencies
   ├── Run tests
   ├── Build Docker image
   ├── Run Trivy scan
   │
   ▼
Amazon ECR
   │
   ▼
Amazon ECS Fargate
```

---

## AWS CodeConnections

AWS CodeConnections provides the connection between GitHub and AWS CodePipeline.

The connection was verified using AWS CLI and confirmed as:
<img width="1608" height="412" alt="30-codeconnections-github" src="https://github.com/user-attachments/assets/a754dfc8-da4f-4208-9946-b3f8556076c3" />

---

## AWS CodeBuild

The CodeBuild project performs:

1. Dependency installation
2. Application testing
3. Docker image building
4. Trivy vulnerability scanning
5. Docker image tagging
6. Amazon ECR push

<img width="1909" height="747" alt="23-codebuild-success 1" src="https://github.com/user-attachments/assets/52ebda64-8d98-4782-92e5-ef901137c7d9" />
<img width="1883" height="766" alt="23-codebuild-success 2" src="https://github.com/user-attachments/assets/6ec0b200-7c38-44eb-a9af-95a2193ef0c5" />

---

## CodePipeline Deployment

The pipeline contains three stages:

```text
Source
  ↓
Build
  ↓
Deploy
```

The successful execution was verified with AWS CLI.

<img width="1909" height="459" alt="24-codepipeline-success" src="https://github.com/user-attachments/assets/da7a922d-88a3-45f1-b3f2-17943f72f0dc" />

### CLI Pipeline Verification

<img width="1596" height="442" alt="32-codepipeline-cli-success" src="https://github.com/user-attachments/assets/4165052b-4168-4a31-9bc8-8aff40c0d66e" />

---

# Monitoring and Reliability

SecureOps uses Amazon CloudWatch to monitor ECS service health and resource utilization.

Three CloudWatch alarms are configured.

## Monitoring Alarms

### High CPU

```text
Metric: CPUUtilization
Threshold: >= 80%
```

### High Memory

```text
Metric: MemoryUtilization
Threshold: >= 80%
```

### No Running Tasks

```text
Metric: RunningTaskCount
Threshold: < 1
```

The alarms were verified in the `OK` state.

<img width="1903" height="373" alt="25-cloudwatch-alarms 1" src="https://github.com/user-attachments/assets/660517a1-ca7b-4439-9138-9cde811f5f04" />

### CLI Alarm Verification

<img width="1601" height="455" alt="34-cloudwatch-alarm-verification" src="https://github.com/user-attachments/assets/afe71b33-d7dd-4ce4-ac0a-140226d20718" />

---

# Deployment Rollback

SecureOps uses the ECS deployment circuit breaker with automatic rollback.

The configuration was verified using AWS CLI:


<img width="1603" height="441" alt="33-ecs-rollback-configuration" src="https://github.com/user-attachments/assets/039456fa-9383-40cc-86ca-2187f65352af" />

---

# Rollback Testing

The rollback mechanism was intentionally tested using an invalid Docker image tag.

The deployment then failed and ECS initiated a rollback to the previous healthy deployment.

<img width="1890" height="418" alt="26-rollback-failure" src="https://github.com/user-attachments/assets/5f98fe95-b045-4d6a-a75a-9d21b42dcc69" />

The healthy production revision remained available and the ECS service recovered.

This demonstrates a complete failure-recovery workflow:

```text
Invalid Deployment
       │
       ▼
Container Image Pull Failure
       │
       ▼
ECS Deployment Failure
       │
       ▼
Deployment Circuit Breaker
       │
       ▼
Automatic Rollback
       │
       ▼
Previous Healthy Revision
```

---

# Application API Testing

Backend file operations were also tested directly through the browser developer console.

<img width="1172" height="913" alt="29-file-operations-test 1" src="https://github.com/user-attachments/assets/79ed7337-ca2b-4195-9f1f-6dc32189f3a4" />
<img width="1002" height="346" alt="29-file-operations-test 2" src="https://github.com/user-attachments/assets/a5c8d0ba-cc1b-41d5-9209-ff5b25104f7a" />

This provides additional evidence that the backend APIs operate correctly independently of the frontend interface.

---

---

# DevSecOps Security Pipeline

The project integrates security directly into the deployment lifecycle.

```text
                    SOURCE
                      │
                      ▼
                   GitHub
                      │
                      ▼
               AWS CodePipeline
                      │
                      ▼
                 AWS CodeBuild
                      │
             ┌────────┴────────┐
             │                 │
             ▼                 ▼
          npm Test         Docker Build
                               │
                               ▼
                         Trivy Scan
                               │
                    ┌──────────┴──────────┐
                    │                     │
                 Pass                    Fail
                    │                     │
                    ▼                     ▼
                  ECR                 Stop Build
                    │
                    ▼
              ECS Fargate
                    │
                    ▼
             Health Checks
                    │
             ┌──────┴──────┐
             │             │
          Healthy        Failed
             │             │
             ▼             ▼
          Running       Rollback
```

---

# Security Design

The project follows several security principles:


### Least Privilege

AWS IAM roles and policies are used to restrict access to only the resources required by each service.

### Secure Secrets

Sensitive credentials are stored outside source code using AWS Secrets Manager.

### Secure File Storage

Uploaded files are stored in a private Amazon S3 bucket with server-side encryption and versioning.

### Continuous Security

Trivy scanning is integrated into the CI/CD pipeline so that images containing HIGH or CRITICAL vulnerabilities can stop the build.

---

---

# Learning Outcomes

This project provided practical experience with:

* Full-stack web application development
* REST API development
* Authentication and authorization
* Secure file handling
* Malware detection
* Docker containerization
* Container hardening
* Vulnerability management
* AWS cloud infrastructure
* IAM and least privilege
* Amazon S3
* Amazon ECR
* Amazon ECS Fargate
* Infrastructure as Code with Terraform
* CI/CD automation
* AWS CodeBuild
* AWS CodePipeline
* CloudWatch monitoring
* Deployment failure handling
* Automatic rollback
* DevSecOps practices

---

# Author

**Udeesha Jayendra**
