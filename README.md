# 🚌 BusGo — Bus Booking Platform

A **full-stack bus booking platform** designed to simulate a real-world online bus reservation system.

BusGo provides an end-to-end booking experience including **user authentication, bus search, schedule selection, seat selection, passenger management, booking, payment simulation, booking history, and cancellation**.

The application was initially deployed on **AWS EC2** using **Nginx, PM2, Node.js, PostgreSQL, and GitHub Actions**.

As an infrastructure upgrade, the application was **containerized with Docker and migrated to Amazon EKS (Elastic Kubernetes Service)**. The upgraded architecture uses **Amazon ECR, Kubernetes Deployments and Services, AWS Load Balancers, Amazon RDS PostgreSQL, Kubernetes Secrets, GitHub Actions CI/CD, AWS IAM OIDC, and AWS CloudFormation**.

---

## 🌐 Deployment Overview

BusGo has gone through two major deployment architectures.

### Original EC2 Deployment

The initial application was deployed directly on AWS EC2 using:

- AWS EC2
- Nginx
- Node.js
- PM2
- PostgreSQL
- GitHub Actions

### EKS Upgrade

The application was later upgraded to a containerized Kubernetes architecture using:

- Docker
- Amazon ECR
- Amazon EKS
- Kubernetes
- AWS Load Balancers
- Amazon RDS PostgreSQL
- Kubernetes Secrets
- GitHub Actions
- AWS IAM OIDC
- AWS CloudFormation

> The original EC2 deployment is retained as the initial deployment architecture, while Amazon EKS represents the upgraded production-style architecture.

---

# 📌 Project Overview

BusGo is designed to provide a complete online bus reservation workflow from **bus search to booking confirmation and cancellation**.

### Users can:

- Create an account
- Log in using JWT authentication
- Search buses between cities
- Select travel dates
- View available schedules
- View bus details
- Select available seats
- Enter passenger information
- Select boarding and dropping points
- Review fare breakdown
- Select a payment method
- Create a booking
- Receive a booking reference
- View booking history
- View booking details
- Cancel bookings

The backend uses **PostgreSQL** for persistent data storage and handles booking, passenger, payment, and cancellation workflows.

---

# 🛠️ Technology Stack

| Category | Technologies |
| -------- | ------------ |
| **Frontend** | React.js, JavaScript, HTML, CSS |
| **Backend** | Node.js, Express.js |
| **Database** | PostgreSQL |
| **Authentication** | JWT |
| **Web Server** | Nginx |
| **Process Management** | PM2 |
| **Containerization** | Docker |
| **Container Registry** | Amazon ECR |
| **Original Deployment** | AWS EC2 |
| **Container Orchestration** | Amazon EKS, Kubernetes |
| **Database Hosting** | Amazon RDS PostgreSQL |
| **Load Balancing** | AWS Load Balancer |
| **Secrets Management** | Kubernetes Secrets |
| **CI/CD** | GitHub Actions |
| **AWS Authentication** | IAM OIDC |
| **Infrastructure as Code** | AWS CloudFormation |
| **Version Control** | Git, GitHub |

---

# ✨ Key Features

## 🔐 Authentication

- User registration
- User login
- JWT-based authentication
- Protected API routes
- Token-based authorization
- User profile

---

## 🔎 Bus Search

Users can search for available buses based on:

- Source
- Destination
- Travel date

Search results provide journey information such as:

- Bus operator
- Operator rating
- Bus number
- Bus type
- Total seats
- Departure time
- Arrival time
- Journey duration
- Base fare

### Example

```text
Pune → Mumbai
Travel Date: 24 August 2026

National Travels
├── MH12-PM-101
│   ├── AC Sleeper
│   ├── Departure: 06:30
│   ├── Arrival: 10:00
│   └── Fare: ₹650
│
└── MH12-PM-102
    ├── AC Seater
    ├── Departure: 20:30
    ├── Arrival: 00:00
    └── Fare: ₹750
```

---

## 🚌 Bus & Schedule Selection

Users can view and select available buses and travel schedules.

Features include:

- Bus details
- Bus type
- Departure and arrival times
- Journey duration
- Fare information
- Schedule selection

---

## 💺 Seat Selection

The application provides an interactive seat-selection workflow.

Users can:

- View available seats
- Select seats
- Manage selected seats
- Continue with selected seats during booking

---

## 👤 Passenger Management

Passenger information is collected during the booking process.

- Passenger details
- Boarding point selection
- Dropping point selection
- Booking information validation

---

## 💳 Payment & Booking

BusGo includes a simulated payment workflow.

- Fare breakdown
- Payment method selection
- Payment simulation
- Booking creation
- Booking reference generation
- Booking confirmation

> Payment processing is simulated and does not use a real payment gateway.

---

## 📋 Booking Management

Users can manage their bookings through the application.

- Booking history
- Booking details
- Booking reference
- Passenger information
- Booking cancellation

---

# 🏗️ Application Architecture

The application follows a standard full-stack architecture.

```text
                         ┌──────────────────┐
                         │       User       │
                         └────────┬─────────┘
                                  │
                                  ▼
                       ┌─────────────────────┐
                       │     React.js        │
                       │     Frontend        │
                       └──────────┬──────────┘
                                  │
                              REST APIs
                                  │
                                  ▼
                       ┌─────────────────────┐
                       │ Node.js + Express   │
                       │      Backend        │
                       └──────────┬──────────┘
                                  │
                                  ▼
                       ┌─────────────────────┐
                       │    PostgreSQL       │
                       │      Database       │
                       └─────────────────────┘
```

---

# ☁️ Original AWS EC2 Deployment

Before the Kubernetes migration, BusGo was deployed directly on AWS EC2.

The EC2 architecture used:

- **AWS EC2** — Application hosting
- **Nginx** — Web server and reverse proxy
- **Node.js** — Backend runtime
- **PM2** — Node.js process management
- **PostgreSQL** — Application database
- **GitHub Actions** — Deployment automation

### EC2 Architecture

```text
                         Internet
                            │
                            ▼
                  ┌───────────────────┐
                  │      AWS EC2      │
                  │    Public IP      │
                  └─────────┬─────────┘
                            │
                            ▼
                  ┌───────────────────┐
                  │       Nginx       │
                  │  Web Server/Proxy │
                  └─────────┬─────────┘
                            │
                            ▼
                  ┌───────────────────┐
                  │    Node.js API    │
                  │       PM2         │
                  └─────────┬─────────┘
                            │
                            ▼
                  ┌───────────────────┐
                  │    PostgreSQL     │
                  │     Database      │
                  └───────────────────┘
```

---

# 🚀 EKS Infrastructure Upgrade

The major infrastructure upgrade moved BusGo from a traditional EC2 deployment to a **containerized Kubernetes deployment using Amazon EKS**.

### Main improvements

- Docker-based application packaging
- Amazon ECR image storage
- Amazon EKS container orchestration
- Kubernetes Deployments
- Kubernetes Services
- Multiple application replicas
- Kubernetes self-healing
- AWS Load Balancers
- PostgreSQL hosted on Amazon RDS
- Kubernetes Secrets
- GitHub Actions CI/CD
- GitHub OIDC authentication
- CloudFormation infrastructure management

The application functionality remained largely unchanged. The primary focus of the upgrade was the **deployment, scalability, availability, and infrastructure architecture**.

---

# 🐳 Docker Containerization

The frontend and backend are packaged as separate Docker images.

## Backend Container

The Node.js/Express backend is packaged into a Docker image.

```text
BusGo Backend
      │
      ▼
Docker Build
      │
      ▼
Backend Docker Image
      │
      ▼
Amazon ECR
      │
      ▼
Amazon EKS
      │
      ▼
Backend Pods
```

---

## Frontend Container

The React frontend is built into a production bundle and served using Nginx inside a Docker container.

```text
React Source Code
       │
       ▼
Docker Build
       │
       ▼
React Production Build
       │
       ▼
Nginx Container
       │
       ▼
Amazon ECR
       │
       ▼
Amazon EKS
```

---

# 📦 Amazon ECR

Amazon Elastic Container Registry (ECR) stores the BusGo Docker images.

Two repositories are used:

```text
Amazon ECR
│
├── busgo-backend
│
└── busgo-frontend
```

Docker images are tagged using the Git commit SHA during CI/CD.

For example:

```text
busgo-backend:<commit-sha>
busgo-frontend:<commit-sha>
```

Using commit SHAs provides a clear relationship between:

```text
Git Commit
     │
     ▼
Docker Image
     │
     ▼
EKS Deployment
```

This makes deployments versioned and traceable.

---

# ☸️ Amazon EKS Architecture

The upgraded application runs on **Amazon EKS**, AWS's managed Kubernetes service.

```text
                              Internet
                                  │
                                  ▼
                     ┌────────────────────────┐
                     │   AWS Load Balancer    │
                     │      Frontend          │
                     └────────────┬───────────┘
                                  │
                                  ▼
                     ┌────────────────────────┐
                     │    EKS Cluster         │
                     │                        │
                     │  ┌──────────────────┐  │
                     │  │ Frontend Service │  │
                     │  └────────┬─────────┘  │
                     │           │            │
                     │     ┌─────┴─────┐      │
                     │     ▼           ▼      │
                     │ Frontend     Frontend  │
                     │    Pod          Pod    │
                     │                        │
                     │  ┌──────────────────┐  │
                     │  │ Backend Service  │  │
                     │  └────────┬─────────┘  │
                     │           │            │
                     │     ┌─────┴─────┐      │
                     │     ▼           ▼      │
                     │ Backend       Backend  │
                     │   Pod            Pod   │
                     └─────────┬──────────────┘
                               │
                               ▼
                    ┌────────────────────────┐
                    │     Amazon RDS          │
                    │     PostgreSQL          │
                    └────────────────────────┘
```

---

# ☸️ Kubernetes Components

The EKS deployment uses Kubernetes resources to manage the application.

## Backend Deployment

The backend is deployed with multiple replicas.

```text
Backend Deployment
       │
       ├── Backend Pod 1
       │
       └── Backend Pod 2
```

Multiple replicas improve application availability and allow Kubernetes Services to distribute traffic between pods.

---

## Frontend Deployment

The frontend is also deployed with multiple replicas.

```text
Frontend Deployment
       │
       ├── Frontend Pod 1
       │
       └── Frontend Pod 2
```

---

## Kubernetes Services

The application uses Kubernetes Services to expose and route traffic to the application pods.

```text
Frontend Service
       │
       ▼
Frontend Pods


Backend Service
       │
       ▼
Backend Pods
```

The externally exposed services use AWS Load Balancers.

---

# 🔄 Kubernetes Self-Healing

Kubernetes maintains the desired number of replicas.

For example:

```text
Before:

Backend Deployment
     │
     ├── Pod 1 ✅
     └── Pod 2 ✅
```

If a pod fails:

```text
Pod 1 ❌
```

Kubernetes automatically creates a replacement:

```text
After:

Backend Deployment
     │
     ├── New Pod ✅
     └── Pod 2 ✅
```

This provides a level of self-healing that is not available with a simple process-based deployment.

---

# 🗄️ PostgreSQL Migration to Amazon RDS

As part of the EKS upgrade, PostgreSQL was moved to **Amazon RDS for PostgreSQL**.

The database was migrated using a PostgreSQL dump and restored into the RDS instance.

The database stores application data including:

- Users
- Bus operators
- Buses
- Routes
- Bus schedules
- Seats
- Boarding points
- Dropping points
- Bookings
- Booking passengers
- Payments

The database runs outside the Kubernetes cluster.

```text
EKS Backend Pods
       │
       │ PostgreSQL connection
       ▼
┌────────────────────────┐
│     Amazon RDS         │
│     PostgreSQL         │
└────────────────────────┘
```

This separates the application workload from persistent database infrastructure.

---

# 🔐 Kubernetes Secrets

Database configuration is not hard-coded into the application.

The backend receives database configuration through Kubernetes Secrets.

```text
Kubernetes Secret
       │
       ├── DB_HOST
       ├── DB_PORT
       ├── DB_NAME
       ├── DB_USER
       └── DB_PASSWORD
                │
                ▼
          Backend Pods
                │
                ▼
          Amazon RDS
```

This keeps database configuration separate from the application source code.

> Secret values are not committed to the Git repository.

---

# 🔐 GitHub Actions → AWS Authentication

The CD pipeline uses **GitHub OIDC with AWS IAM**.

Instead of storing permanent AWS access keys in GitHub, the workflow uses an OIDC identity token to authenticate with AWS.

AWS IAM validates the token and allows GitHub Actions to assume the dedicated deployment role.

```text
GitHub Actions
       │
       │ OIDC Token
       ▼
┌─────────────────────────┐
│        AWS IAM          │
│                         │
│ GitHubActions-BusGo-EKS │
│         Role            │
└────────────┬────────────┘
             │
             ▼
        AWS Services
          │     │
          ▼     ▼
         ECR   EKS
```

The IAM trust policy restricts access to the BusGo GitHub repository and deployment branch.

This is more secure than storing long-term AWS access keys in GitHub repository secrets.

---

# 🔄 CI/CD Pipeline

GitHub Actions is used for continuous integration and continuous deployment.

```text
Developer
    │
    ▼
Git Push to main
    │
    ▼
GitHub Repository
    │
    ▼
┌─────────────────────┐
│        CI           │
│                     │
│ Install dependencies│
│ Build frontend      │
│ Validate application│
└──────────┬──────────┘
           │
           │ CI Success
           ▼
┌─────────────────────┐
│        CD           │
│                     │
│ AWS OIDC            │
│ Docker Build        │
│ Push to ECR         │
│ Update EKS          │
└──────────┬──────────┘
           │
           ▼
      Running on EKS
```

---

# 🚀 CD Deployment Process

After CI succeeds, the CD workflow performs the following operations:

```text
GitHub Actions
      │
      ▼
Authenticate with AWS using OIDC
      │
      ▼
Login to Amazon ECR
      │
      ▼
Build Backend Docker Image
      │
      ▼
Push Backend Image to ECR
      │
      ▼
Build Frontend Docker Image
      │
      ▼
Push Frontend Image to ECR
      │
      ▼
Connect to Amazon EKS
      │
      ▼
Update Backend Deployment
      │
      ▼
Update Frontend Deployment
      │
      ▼
Wait for Kubernetes Rollout
      │
      ▼
Verify Pods and Services
```

The deployment uses the GitHub workflow's commit SHA as the Docker image tag.

---

# ☁️ AWS CloudFormation

AWS CloudFormation is used as **Infrastructure as Code (IaC)** for the BusGo infrastructure.

Existing AWS resources were adopted into CloudFormation instead of being deleted and recreated.

The main CloudFormation stack is:

```text
busgo-infrastructure
```

The stack currently manages:

```text
busgo-infrastructure
│
├── Amazon ECR
│   ├── busgo-backend
│   └── busgo-frontend
│
├── Amazon RDS
│   └── busgo-postgres
│
├── RDS Security Group
│   └── busgo-rds-sg
│
├── RDS Subnet Group
│   └── busgo-rds-subnet-group
│
└── GitHub Actions IAM
    ├── GitHub OIDC Provider
    └── GitHubActions-BusGo-EKS
```

### CloudFormation Templates

The infrastructure templates are stored in:

```text
cloudformation/
│
├── ecr.yaml
├── rds.yaml
├── rds-sg.yaml
├── rds-subnet-group.yaml
└── github-oidc.yaml
```

### Resource Adoption

The existing resources were imported into CloudFormation using CloudFormation resource import and change sets.

This allowed the infrastructure to become managed by CloudFormation without recreating the existing resources.

The import process covered:

- Existing ECR repositories
- Existing RDS database
- Existing RDS security group
- Existing RDS subnet group
- Existing GitHub OIDC provider
- Existing GitHub Actions IAM role

---

# 🏗️ EKS and VPC Infrastructure

The EKS cluster and its networking infrastructure were originally created using **eksctl**.

The resulting EKS and networking resources are backed by CloudFormation stacks generated by `eksctl`.

```text
eksctl
  │
  ├── EKS Cluster CloudFormation Stack
  │
  └── EKS Node Group CloudFormation Stack
```

The application infrastructure managed by the custom `busgo-infrastructure` CloudFormation stack is kept separate from these existing EKS/VPC stacks.

This avoids duplicating ownership of the same AWS resources.

---

# 🏗️ Complete AWS Architecture

```text
                                  Internet
                                      │
                                      ▼
                           ┌────────────────────┐
                           │  AWS Load Balancer  │
                           └──────────┬─────────┘
                                      │
                                      ▼
                         ┌────────────────────────┐
                         │      Amazon EKS        │
                         │                        │
                         │  Frontend Service     │
                         │       │                │
                         │   ┌───┴───┐            │
                         │   ▼       ▼            │
                         │ Frontend Frontend      │
                         │   Pod      Pod         │
                         │                        │
                         │ Backend Service        │
                         │       │                │
                         │   ┌───┴───┐            │
                         │   ▼       ▼            │
                         │ Backend  Backend       │
                         │   Pod      Pod         │
                         └──────────┬─────────────┘
                                    │
                                    ▼
                          ┌─────────────────────┐
                          │   Amazon RDS         │
                          │   PostgreSQL         │
                          └─────────────────────┘


       GitHub Actions
             │
             │ OIDC
             ▼
       ┌───────────────┐
       │   AWS IAM     │
       │ Deployment    │
       │     Role      │
       └───────┬───────┘
               │
          ┌────┴────┐
          ▼         ▼
        Amazon    Amazon
         ECR       EKS
          │
          │ Docker Images
          ▼
    ┌───────────────┐
    │               │
    │ busgo-backend │
    │ busgo-frontend│
    │               │
    └───────────────┘


       CloudFormation
             │
             ▼
    ┌──────────────────────┐
    │ busgo-infrastructure │
    └──────────┬───────────┘
               │
       ┌───────┼──────────┐
       ▼       ▼          ▼
      ECR     RDS       IAM/OIDC
```

---

# 🔄 EC2 Deployment vs EKS Upgrade

| Area | Original EC2 | EKS Upgrade |
| ---- | ------------ | ----------- |
| **Application Hosting** | AWS EC2 | Amazon EKS |
| **Application Packaging** | Direct deployment | Docker containers |
| **Backend Management** | PM2 | Kubernetes Deployment |
| **Frontend** | Nginx on EC2 | Nginx container |
| **Scaling** | Manual | Kubernetes replicas |
| **Self-Healing** | Manual/process-based | Kubernetes |
| **Database** | PostgreSQL | Amazon RDS PostgreSQL |
| **Container Registry** | Not required | Amazon ECR |
| **Load Balancing** | Nginx / EC2 | AWS Load Balancer + Kubernetes Service |
| **Deployment** | GitHub Actions → EC2 | GitHub Actions → ECR → EKS |
| **AWS Authentication** | SSH credentials | GitHub OIDC + IAM |
| **Orchestration** | PM2 / OS processes | Kubernetes |
| **Infrastructure as Code** | Limited | AWS CloudFormation |

---

# 🔄 Booking Workflow

```text
User
  │
  ▼
Register / Login
  │
  ▼
Search Bus
  │
  ▼
Select Travel Schedule
  │
  ▼
Select Seats
  │
  ▼
Enter Passenger Details
  │
  ▼
Select Boarding / Dropping Points
  │
  ▼
Review Fare
  │
  ▼
Payment Simulation
  │
  ▼
Create Booking
  │
  ▼
Booking Confirmation
  │
  ▼
Booking History
```

---

# 🗄️ Database Structure

The application uses PostgreSQL with the following main entities:

```text
users
 │
 ├── bookings
 │      │
 │      ├── booking_passengers
 │      │
 │      └── payments
 │
bus_operators
 │
 └── buses
       │
       └── seats

routes
 │
 └── bus_schedules
       │
       ├── boarding_points
       │
       └── dropping_points
```

The PostgreSQL database was migrated to Amazon RDS as part of the infrastructure upgrade.

---

# 🧪 Deployment Verification

The EKS deployment was verified using Kubernetes commands and application-level testing.

### Kubernetes Nodes

```bash
kubectl get nodes
```

The EKS worker nodes were successfully registered with the cluster.

### Application Pods

```bash
kubectl get pods
```

The deployment runs multiple frontend and backend replicas.

### Services

```bash
kubectl get svc
```

The Kubernetes Services expose the application components and provide traffic routing to the pods.

### Backend Health Check

```text
GET /api/health
```

Expected response:

```json
{
  "success": true,
  "message": "Bus Booking API is running"
}
```

### Database Connection Test

```text
GET /api/db-test
```

Expected response:

```json
{
  "success": true,
  "message": "PostgreSQL connection successful"
}
```

### CI/CD Verification

The GitHub Actions pipeline was successfully verified with:

```text
CI  →  Passed
CD  →  Passed
```

The CD pipeline successfully:

- Authenticated with AWS using OIDC
- Built Docker images
- Pushed images to Amazon ECR
- Updated Kubernetes deployments
- Completed Kubernetes rollouts
- Verified application services

---

# 📂 Project Structure

```text
BusGo/
│
├── client/
│   ├── src/
│   ├── Dockerfile
│   └── .dockerignore
│
├── server/
│   ├── db/
│   ├── Dockerfile
│   └── .dockerignore
│
├── k8s/
│   ├── backend.yaml
│   └── frontend.yaml
│
├── cloudformation/
│   ├── ecr.yaml
│   ├── rds.yaml
│   ├── rds-sg.yaml
│   ├── rds-subnet-group.yaml
│   └── github-oidc.yaml
│
├── .github/
│   └── workflows/
│       ├── ci.yml
│       └── cd.yml
│
├── .gitignore
└── README.md
```

---

# 🔐 Security Considerations

The project follows several security practices:

- JWT authentication for protected application workflows
- Database credentials supplied through Kubernetes Secrets
- AWS authentication through GitHub OIDC
- No long-term AWS access keys required by GitHub Actions
- IAM role with limited ECR and EKS permissions
- IAM trust policy restricted to the BusGo GitHub repository
- RDS configured as private/non-publicly accessible
- RDS security group restricts PostgreSQL access to the EKS-related security group
- Environment-specific configuration separated from source code
- Sensitive `.env` files excluded through `.gitignore`

---

# 📊 Infrastructure Summary

| AWS Service | Purpose |
| ----------- | ------- |
| **Amazon EKS** | Kubernetes container orchestration |
| **Amazon ECR** | Docker image registry |
| **Amazon RDS PostgreSQL** | Managed relational database |
| **AWS Load Balancer** | External application traffic |
| **AWS IAM** | Access control and GitHub authentication |
| **AWS IAM OIDC** | Keyless GitHub Actions authentication |
| **AWS CloudFormation** | Infrastructure as Code |
| **Amazon VPC** | Network isolation |
| **EC2** | Original application deployment |

---

# 🎯 What This Project Demonstrates

This project demonstrates practical experience with:

### Full-Stack Development

- React.js
- Node.js
- Express.js
- REST APIs
- PostgreSQL
- JWT authentication
- CRUD operations
- Booking workflows
- Seat selection
- Payment simulation

### Cloud & DevOps

- AWS EC2
- Amazon EKS
- Amazon ECR
- Amazon RDS
- AWS IAM
- AWS IAM OIDC
- AWS Load Balancers
- Docker
- Kubernetes
- Kubernetes Deployments
- Kubernetes Services
- Kubernetes Secrets
- Kubernetes replicas
- Kubernetes self-healing
- GitHub Actions
- CI/CD
- AWS CloudFormation
- Infrastructure as Code

### Deployment Engineering

- EC2 → EKS migration
- Application containerization
- PostgreSQL → Amazon RDS migration
- Docker image versioning
- Automated EKS deployments
- OIDC-based AWS authentication
- Existing resource adoption into CloudFormation
- Infrastructure separation between application resources and EKS/VPC resources

---

# 🔮 Future Improvements

Potential future improvements include:

- HTTPS with a custom domain
- Kubernetes Ingress / AWS Application Load Balancer
- Horizontal Pod Autoscaling
- Kubernetes resource requests and limits
- Redis caching
- Real payment gateway integration
- Email/SMS booking notifications
- Admin dashboard
- Bus operator management
- Advanced seat availability management
- AWS CloudWatch monitoring
- Centralized application logging
- Distributed tracing
- Automated database backups
- Disaster recovery strategy
- Terraform or AWS CDK evaluation

---

# 👨‍💻 Developer

## Vishwajeet K. Mahore

**Software Developer | Full-Stack & Cloud**

### Technologies

`React.js` · `Node.js` · `Express.js` · `JavaScript` · `PostgreSQL` · `REST APIs` · `Docker` · `Kubernetes` · `Amazon EKS` · `Amazon ECR` · `Amazon RDS` · `AWS EC2` · `AWS IAM` · `AWS CloudFormation` · `GitHub Actions` · `Nginx` · `PM2` · `Git` · `GitHub`

---

## 📄 License

This project is developed for **learning, demonstration, and portfolio purposes**.
