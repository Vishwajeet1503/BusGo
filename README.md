# 🚌 Bus Booking Platform

A **full-stack, production-deployed bus booking platform** that simulates a real-world online bus reservation system.

The application provides an end-to-end booking experience including **user authentication, bus search, schedule selection, seat selection, passenger management, booking, payment simulation, booking history, and cancellation**.

The application is deployed on **AWS EC2**, served through **Nginx**, with the Node.js backend managed by **PM2** and deployment automated using **GitHub Actions CI/CD**.

---

## 🌐 Live Application

**Live Website:**
http://15.207.223.95/

> The application is currently deployed using the EC2 public IPv4 address. HTTPS and custom domain configuration are not enabled because the project currently uses an IP-based deployment.

---

## 📌 Project Overview

The Bus Booking Platform is designed to provide a complete online bus reservation workflow from **bus search to booking confirmation and cancellation**.

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

## 🛠️ Technology Stack

| Category               | Technologies        |
| ---------------------- | ------------------- |
| **Frontend**           | React.js            |
| **Backend**            | Node.js, Express.js |
| **Database**           | PostgreSQL          |
| **Authentication**     | JWT                 |
| **Web Server**         | Nginx               |
| **Process Management** | PM2                 |
| **Cloud**              | AWS EC2             |
| **CI/CD**              | GitHub Actions      |
| **Version Control**    | Git, GitHub         |

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
                       │  Nginx Web Server   │
                       └──────────┬──────────┘
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

# 🚀 AWS Deployment Architecture

The application is deployed on an **AWS EC2 instance**.

```text
                       Internet
                          │
                          ▼
                ┌───────────────────┐
                │    AWS EC2        │
                │   Public IP       │
                └─────────┬─────────┘
                          │
                          ▼
                ┌───────────────────┐
                │      Nginx        │
                │   Web Server      │
                └─────────┬─────────┘
                          │
                          ▼
                ┌───────────────────┐
                │   Node.js API     │
                │      PM2          │
                └─────────┬─────────┘
                          │
                          ▼
                ┌───────────────────┐
                │    PostgreSQL     │
                │     Database      │
                └───────────────────┘
```

### Deployment Components

* **AWS EC2** — Application hosting
* **Nginx** — Web server and reverse proxy
* **PM2** — Node.js process management
* **GitHub Actions** — CI/CD automation
* **PostgreSQL** — Persistent application data

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

# 🔄 CI/CD Workflow

The project uses **GitHub Actions** for deployment automation.

```text
Developer
   │
   ▼
Git Push
   │
   ▼
GitHub Repository
   │
   ▼
GitHub Actions
   │
   ▼
Deployment Process
   │
   ▼
AWS EC2
   │
   ▼
Application Update
   │
   ▼
PM2
   │
   ▼
Running Application
```

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
* Application deployment on AWS EC2
* Nginx configuration
* PM2 process management
* GitHub Actions CI/CD
* Git and GitHub workflow

---

# ☁️ Deployment

The application is currently deployed on **AWS EC2** and accessed through the EC2 public IPv4 address.

**Live Application:**
http://15.207.223.95/

### Production Setup

```text
AWS EC2
   │
   ├── Nginx
   │
   ├── Node.js
   │     └── PM2
   │
   └── PostgreSQL
```

---

# 🔮 Future Improvements

Potential improvements for the platform include:

* Real payment gateway integration
* HTTPS and custom domain configuration
* AWS RDS for managed PostgreSQL
* AWS Load Balancer
* Auto Scaling
* Redis-based caching
* Email/SMS booking notifications
* Advanced seat availability management
* Admin dashboard
* Bus operator management
* Enhanced monitoring and logging

---

# 👨‍💻 Developer

**Vishwajeet K. Mahore**

Full Stack Software Developer

**Core Technologies**

`React.js` · `Node.js` · `Express.js` · `JavaScript` · `PostgreSQL` · `REST APIs` · `AWS EC2` · `Nginx` · `PM2` · `GitHub Actions` · `Git`

---

## 📄 License

This project is developed for **learning, demonstration, and portfolio purposes**.
