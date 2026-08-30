# 🚌 BusGo — Bus Booking Platform

A **full-stack, production-deployed bus booking platform** that simulates a real-world online bus reservation system.

The application provides an end-to-end booking experience including **user authentication, bus search, schedule selection, seat selection, passenger management, booking, payment simulation, booking history, and cancellation**.

The project was initially deployed on **AWS EC2** using **Nginx** and **PM2** with **GitHub Actions CI/CD**.

As an infrastructure upgrade, the application was later **containerized with Docker and migrated to Amazon EKS (Elastic Kubernetes Service)**. The upgraded architecture uses **Amazon ECR, Kubernetes Deployments and Services, AWS Load Balancers, Amazon RDS PostgreSQL, and GitHub Actions CI/CD with AWS OIDC authentication**.

---

## 🌐 Application Deployment

### Original Deployment

The application was initially deployed on **AWS EC2** using:

- Nginx
- Node.js
- PM2
- PostgreSQL
- GitHub Actions

### EKS Upgrade

The application was upgraded to a containerized Kubernetes deployment using:

- Docker
- Amazon ECR
- Amazon EKS
- Kubernetes
- AWS Load Balancer
- Amazon RDS PostgreSQL
- GitHub Actions
- AWS IAM OIDC

> The EC2 deployment is retained as the original deployment architecture, while EKS represents the upgraded deployment architecture.

---

# 📌 Project Overview

BusGo is designed to provide a complete online bus reservation workflow from **bus search to booking confirmation and cancellation**.

### Users can:

* Create an account
* Log in using JWT authentication
* Search buses between cities
* Select travel dates
* View available schedules
* View bus details
* Select available seats
* Enter passenger information
* Select boarding and dropping points
* Review fare breakdown
* Select a payment method
* Create a booking
* Receive a booking reference
* View booking history
* View booking details
* Cancel bookings

The backend uses **PostgreSQL** for persistent data storage and handles booking, payment, passenger, and cancellation workflows.

---

# 🛠️ Technology Stack

| Category | Technologies |
| -------- | ------------ |
| **Frontend** | React.js |
| **Backend** | Node.js, Express.js |
| **Database** | PostgreSQL |
| **Authentication** | JWT |
| **Web Server** | Nginx |
| **Process Management** | PM2 |
| **Containerization** | Docker |
| **Container Registry** | Amazon ECR |
| **Original Cloud Deployment** | AWS EC2 |
| **Upgraded Cloud Deployment** | Amazon EKS |
| **Database Hosting** | Amazon RDS PostgreSQL |
| **Load Balancing** | AWS Load Balancer |
| **Orchestration** | Kubernetes |
| **CI/CD** | GitHub Actions |
| **AWS Authentication** | IAM OIDC |
| **Version Control** | Git, GitHub |

---

# ✨ Key Features

## 🔐 Authentication & Authorization

The application provides user authentication and protected application workflows.

* User registration
* User login
* JWT-based authentication
* Protected API routes
* Token-based authorization
* User profile

---

## 🔎 Bus Search

Users can search available buses based on:

* Source
* Destination
* Travel date

The search results provide important journey information including:

* Bus operator
* Operator rating
* Bus number
* Bus type
* Total seats
* Departure time
* Arrival time
* Journey duration
* Base fare

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

Users can view available buses and select a suitable travel schedule.

* Bus details
* Bus type
* Departure and arrival times
* Journey duration
* Fare information
* Schedule selection

---

## 💺 Seat Selection

The platform provides an interactive seat-selection workflow.

* View available seats
* Select seats
* Manage selected seats
* Continue with selected seats during booking

---

## 👤 Passenger Management

Passenger information is collected as part of the booking workflow.

* Passenger details
* Boarding point selection
* Dropping point selection
* Booking information validation

---

## 💳 Payment & Booking

The application includes a simulated payment workflow as part of the booking process.

* Fare breakdown
* Payment method selection
* Payment simulation
* Booking creation
* Booking reference generation
* Booking confirmation

---

## 📋 Booking Management

Users can manage their existing bookings through the application.

* Booking history
* Individual booking details
* Booking reference
* Passenger information
* Cancellation workflow

---

# 🏗️ Application Architecture

The application follows a full-stack architecture with a React frontend, Node.js/Express backend, and PostgreSQL database.

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

Before the Kubernetes upgrade, BusGo was deployed directly on **AWS EC2**.

The EC2-based architecture used:

- **AWS EC2** for application hosting
- **Nginx** as the web server and reverse proxy
- **Node.js** for the backend
- **PM2** for backend process management
- **PostgreSQL** for application data
- **GitHub Actions** for deployment automation

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
                  │    Web Server     │
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

### EC2 Deployment Components

* **AWS EC2** — Application hosting
* **Nginx** — Web server and reverse proxy
* **Node.js** — Backend runtime
* **PM2** — Node.js process management
* **PostgreSQL** — Application database
* **GitHub Actions** — CI/CD automation

---

# 🚀 EKS Upgrade

To improve the deployment architecture, BusGo was upgraded from a traditional EC2-based deployment to a **containerized Kubernetes deployment using Amazon EKS**.

The upgrade introduced:

* Docker containerization
* Amazon ECR
* Amazon EKS
* Kubernetes Deployments
* Kubernetes Services
* Multiple application replicas
* AWS Load Balancers
* Amazon RDS PostgreSQL
* Kubernetes Secrets
* GitHub Actions CI/CD
* AWS IAM OIDC authentication

The application code and booking functionality remained the same. The major change was the **deployment and infrastructure layer**.

---

# 🐳 Docker Containerization

The frontend and backend were separated into independent Docker images.

### Backend

The Node.js/Express backend is packaged into a Docker image using a Node.js Alpine base image.

```text
BusGo Backend
     │
     ▼
Docker Image
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

### Frontend

The React frontend is built using Node.js and served using Nginx inside a Docker container.

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

Amazon Elastic Container Registry (ECR) is used to store the BusGo Docker images.

Two repositories are used:

```text
Amazon ECR
│
├── busgo-backend
│
└── busgo-frontend
```

The Docker images are tagged using the Git commit SHA during CI/CD deployment.

This provides versioned container images and makes deployments more consistent and repeatable.

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
                     │  Frontend     Frontend │
                     │    Pod          Pod    │
                     │                        │
                     │  ┌──────────────────┐  │
                     │  │ Backend Service  │  │
                     │  └────────┬─────────┘  │
                     │           │            │
                     │     ┌─────┴─────┐      │
                     │     ▼           ▼      │
                     │  Backend      Backend  │
                     │    Pod          Pod    │
                     └─────────┬──────────────┘
                               │
                               ▼
                    ┌────────────────────────┐
                    │   Amazon RDS            │
                    │   PostgreSQL            │
                    └────────────────────────┘
```

---

# 🏗️ Complete EKS Deployment Flow

The complete upgraded architecture can be represented as:

```text
                              User
                               │
                               ▼
                    ┌─────────────────────┐
                    │  AWS Load Balancer  │
                    └──────────┬──────────┘
                               │
                               ▼
                    ┌─────────────────────┐
                    │   EKS Frontend      │
                    │      Service        │
                    └──────────┬──────────┘
                               │
                     ┌─────────┴─────────┐
                     ▼                   ▼
              ┌─────────────┐     ┌─────────────┐
              │  Frontend   │     │  Frontend   │
              │    Pod      │     │    Pod      │
              └──────┬──────┘     └──────┬──────┘
                     │                   │
                     └─────────┬─────────┘
                               │
                            REST API
                               │
                               ▼
                    ┌─────────────────────┐
                    │   EKS Backend       │
                    │      Service        │
                    └──────────┬──────────┘
                               │
                     ┌─────────┴─────────┐
                     ▼                   ▼
              ┌─────────────┐     ┌─────────────┐
              │  Backend    │     │  Backend    │
              │    Pod      │     │    Pod      │
              └──────┬──────┘     └──────┬──────┘
                     │                   │
                     └─────────┬─────────┘
                               │
                               ▼
                    ┌─────────────────────┐
                    │   Amazon RDS         │
                    │   PostgreSQL        │
                    └─────────────────────┘
```

---

# ☸️ Kubernetes Components

The EKS deployment uses Kubernetes resources to manage the application.

### Backend Deployment

The backend is deployed with **2 replicas**.

```text
Backend Deployment
       │
       ├── Backend Pod 1
       │
       └── Backend Pod 2
```

Running multiple replicas provides better availability and allows Kubernetes to distribute traffic between the pods.

### Frontend Deployment

The frontend is also deployed with **2 replicas**.

```text
Frontend Deployment
       │
       ├── Frontend Pod 1
       │
       └── Frontend Pod 2
```

### Kubernetes Services

Two Kubernetes Services are used:

```text
busgo-frontend
       │
       └── LoadBalancer

busgo-backend
       │
       └── LoadBalancer
```

The LoadBalancer Services create AWS Load Balancers that provide external access to the application.

---

# 🔄 Kubernetes Self-Healing

One of the important benefits of Kubernetes is **self-healing**.

For example, if one backend pod fails:

```text
Before:

Backend Deployment
     │
     ├── Pod 1 ✅
     └── Pod 2 ✅


Pod 1 fails


After:

Backend Deployment
     │
     ├── Pod 1 ❌
     └── New Pod ✅
```

Kubernetes automatically creates a replacement pod to maintain the desired number of replicas.

---

# 🗄️ PostgreSQL Migration to Amazon RDS

As part of the EKS upgrade, PostgreSQL was moved to **Amazon RDS for PostgreSQL**.

The existing database was exported using a PostgreSQL dump and restored into the RDS database.

The database contains the application's persistent data including:

* Users
* Bus operators
* Buses
* Routes
* Bus schedules
* Seats
* Boarding points
* Dropping points
* Bookings
* Booking passengers
* Payments

The upgraded architecture keeps the database outside the Kubernetes cluster.

```text
EKS Backend Pods
       │
       │ PostgreSQL connection
       ▼
┌────────────────────────┐
│   Amazon RDS            │
│   PostgreSQL            │
└────────────────────────┘
```

The backend connects to RDS using environment variables provided through a **Kubernetes Secret**.

---

# 🔐 Kubernetes Secrets

Database credentials and connection information are not hard-coded into the backend deployment.

The backend receives database configuration through a Kubernetes Secret.

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

This keeps sensitive database configuration separate from the application source code.

---

# 🔄 CI/CD Pipeline

The project uses **GitHub Actions** for continuous integration and continuous deployment.

The upgraded pipeline works as follows:

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
│ Check backend       │
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
│ Update EKS           │
└──────────┬──────────┘
           │
           ▼
     Running on EKS
```

---

# 🔐 GitHub Actions → AWS Authentication

The CD pipeline uses **GitHub OIDC with AWS IAM**.

Instead of storing a permanent AWS access key inside GitHub, GitHub Actions receives an OIDC identity token.

AWS IAM validates the token and allows the workflow to assume a dedicated deployment role.

```text
GitHub Actions
       │
       │ OIDC Token
       ▼
┌─────────────────────┐
│     AWS IAM         │
│                     │
│ GitHubActions-      │
│ BusGo-EKS Role      │
└──────────┬──────────┘
           │
           ▼
       AWS Services
           │
      ┌────┴────┐
      ▼         ▼
     ECR       EKS
```

This provides a more secure authentication method than storing long-term AWS credentials in GitHub repository secrets.

---

# 🚀 EKS CD Deployment Process

After CI succeeds, the CD workflow performs the following steps:

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
Connect to EKS
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

Docker images are tagged using the GitHub commit SHA, which allows each deployment to reference a specific application version.

---

# 🔄 Original EC2 Deployment vs EKS Upgrade

| Area | Original EC2 Deployment | EKS Upgrade |
| ---- | ----------------------- | ----------- |
| **Application Hosting** | AWS EC2 | Amazon EKS |
| **Application Packaging** | Direct Node.js/Nginx deployment | Docker containers |
| **Backend Management** | PM2 | Kubernetes Deployment |
| **Scaling** | Manual | Kubernetes replicas |
| **Self-Healing** | Limited/manual | Kubernetes automatically replaces failed pods |
| **Frontend** | Nginx on EC2 | Nginx container on EKS |
| **Database** | PostgreSQL | Amazon RDS PostgreSQL |
| **Container Registry** | Not required | Amazon ECR |
| **Load Balancing** | Nginx / EC2 | AWS Load Balancer + Kubernetes Service |
| **Deployment** | GitHub Actions → EC2 | GitHub Actions → ECR → EKS |
| **AWS Authentication** | SSH credentials | GitHub OIDC + IAM |
| **Orchestration** | PM2 / OS processes | Kubernetes |
| **Replicas** | Manually managed | Kubernetes-managed replicas |

---

# 🔄 Booking Workflow

```text
User
  │
  ▼
Login / Register
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

# 📊 Database Structure

The application uses PostgreSQL with the following main tables:

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

The database was successfully migrated from the original PostgreSQL deployment to Amazon RDS PostgreSQL as part of the infrastructure upgrade.

---

# 🧪 Deployment Verification

The upgraded EKS deployment was verified using Kubernetes and API-level testing.

### Kubernetes Cluster

```bash
kubectl get nodes
```

The EKS worker nodes were successfully registered and reported a `Ready` status.

### Application Pods

```bash
kubectl get pods
```

The application was deployed with:

```text
2 × Backend Pods
2 × Frontend Pods
```

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

### Final Application Test

The frontend was accessed through the AWS Load Balancer and the complete BusGo booking workflow was tested successfully.

---

# 📂 Core Development Areas

This project demonstrates hands-on experience with:

* Full-stack web development
* React.js frontend development
* Node.js backend development
* Express.js REST API development
* PostgreSQL database integration
* JWT authentication
* Protected API routes
* CRUD operations
* Bus search and filtering
* Seat selection workflows
* Booking management
* Payment workflow implementation
* Docker containerization
* Amazon ECR
* Amazon EKS
* Kubernetes Deployments
* Kubernetes Services
* Kubernetes replicas
* Kubernetes self-healing
* AWS Load Balancers
* Amazon RDS PostgreSQL
* Kubernetes Secrets
* AWS IAM
* GitHub OIDC
* GitHub Actions CI/CD
* Original AWS EC2 deployment
* Nginx configuration
* PM2 process management
* Git and GitHub workflow

---

# ☁️ Current AWS Architecture

The upgraded BusGo architecture uses the following AWS services:

```text
AWS
│
├── Amazon EKS
│     │
│     ├── Frontend Deployment
│     │     ├── Frontend Pod
│     │     └── Frontend Pod
│     │
│     └── Backend Deployment
│           ├── Backend Pod
│           └── Backend Pod
│
├── Amazon ECR
│     ├── busgo-frontend
│     └── busgo-backend
│
├── Amazon RDS
│     └── PostgreSQL
│
├── AWS Load Balancer
│     ├── Frontend
│     └── Backend
│
└── AWS IAM
      └── GitHub Actions OIDC Role
```

---

# 🔮 Future Improvements

Potential improvements for the platform include:

* Real payment gateway integration
* HTTPS and custom domain configuration
* Kubernetes Ingress
* Application Load Balancer with path-based routing
* Horizontal Pod Autoscaling
* Kubernetes resource limits and requests
* Redis-based caching
* Email/SMS booking notifications
* Advanced seat availability management
* Admin dashboard
* Bus operator management
* Enhanced monitoring and logging
* Centralized application logging
* AWS CloudWatch monitoring
* Infrastructure as Code using Terraform or AWS CDK

---

# 👨‍💻 Developer

**Vishwajeet K. Mahore**

Full Stack Software Developer

### Core Technologies

`React.js` · `Node.js` · `Express.js` · `JavaScript` · `PostgreSQL` · `REST APIs` · `Docker` · `Kubernetes` · `Amazon EKS` · `Amazon ECR` · `Amazon RDS` · `AWS EC2` · `Nginx` · `PM2` · `GitHub Actions` · `AWS IAM` · `Git` · `GitHub`

---

## 📄 License

This project is developed for **learning, demonstration, and portfolio purposes**.
