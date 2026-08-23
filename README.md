# 🚌 Bus Booking Platform

A full-stack, production-deployed bus booking platform built with **React, Node.js, Express, PostgreSQL, Nginx, PM2, AWS EC2, and GitHub Actions CI/CD**.

The platform provides an end-to-end online bus booking experience including user authentication, bus search, schedule selection, seat selection, passenger management, payment simulation, booking confirmation, booking history, booking details, and cancellation.

The application is deployed on an AWS EC2 instance and served through Nginx with the Node.js backend managed by PM2.

---

## 🌐 Live Application

**Live Website:**  
http://15.207.223.95/

> The application is currently deployed using the EC2 public IPv4 address.
> HTTPS/domain configuration is not enabled because the project currently uses an IP-based deployment.

---

# 📌 Project Overview

The Bus Booking Platform is designed to simulate a real-world online bus reservation system.

Users can:

- Create an account
- Log in securely using JWT authentication
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
- View individual booking details
- Cancel bookings

The backend uses PostgreSQL for persistent storage and implements booking, payment, passenger, and cancellation workflows.

---

# ✨ Key Features

## 🔐 Authentication

- User registration
- User login
- JWT-based authentication
- Protected API routes
- User profile
- Token-based authorization

---

## 🔎 Bus Search

Users can search buses using:

- Source
- Destination
- Travel date

The search system returns:

- Bus operator
- Operator rating
- Bus number
- Bus type
- Total seats
- Departure time
- Arrival time
- Journey duration
- Base fare

Example:

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
