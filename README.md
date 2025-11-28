<div align="center">

# 💇‍♀️ HairRush RESTful API

**Robust backend for hair salon appointment management: secure, scalable, and efficient**

[![Node.js](https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=nodedotjs&logoColor=white)](https://nodejs.org/)
[![Express.js](https://img.shields.io/badge/Express.js-000000?style=for-the-badge&logo=express&logoColor=white)](https://expressjs.com/)
[![PostgreSQL](https://img.shields.io/badge/PostgreSQL-316192?style=for-the-badge&logo=postgresql&logoColor=white)](https://postgresql.org/)
[![Sequelize](https://img.shields.io/badge/Sequelize-52B0E7?style=for-the-badge&logo=sequelize&logoColor=white)](https://sequelize.org/)

</div>

---

## 🎯 About The Project

**HairRush RESTful API** is a specialized backend for hair salon management. Built with Node.js, Express, and Sequelize over PostgreSQL, it provides RESTful endpoints optimized for appointment scheduling, robust data validation, and personalized email notifications via Resend API with domain-based authentication.

### What Makes Our API Special?

- 📅 **Complete Appointment System**: Schedule, query, and cancel appointments
- 🔐 **Domain Authentication**: Access control based on authorized domains
- 📧 **Smart Notifications**: Personalized emails for confirmations and reminders
- 🛡️ **Robust Validations**: Advanced data validation middleware
- ⚡ **High Performance**: Optimized for fast concurrent queries
- 🌐 **CORS Configured**: Ready for React.js frontend integration

---

## ✨ Key Features

### 📅 Appointment Management

- Complete appointment scheduling system
- Query appointments by date and status
- Appointment cancellation with reason tracking
- Availability validation

### 🔐 Advanced Security

- Domain-based authentication
- Input sanitization and validation
- CORS configuration for secure cross-origin requests
- Secure environment variable management

### 📧 Email Notifications

- Appointment confirmations via Resend API
- Appointment reminders
- Cancellation notifications
- Custom email templates

### 📊 Data Management

- PostgreSQL relational database
- Optimized queries with Sequelize ORM
- Database migrations and seeders
- Connection pooling for performance

---

## 🛠️ Tech Stack

### Backend Core

- **[Node.js](https://nodejs.org/)** - JavaScript runtime environment
- **[Express.js](https://expressjs.com/)** - Minimalist web framework
- **[Sequelize](https://sequelize.org/)** - Promise-based Node.js ORM

### Database

- **[PostgreSQL](https://postgresql.org/)** - Advanced relational database system

### Services & Middleware

- **[Resend](https://resend.com/)** - Professional email delivery service
- **Custom Middleware** - Validation and authentication
- **CORS** - Cross-origin resource sharing

### DevOps

- **Sequelize CLI** - Database migrations and seeders
- **Environment Variables** - Secure configuration management

---

## 🚀 Quick Start

### Prerequisites

- Node.js 16+
- PostgreSQL 12+
- npm or yarn

### Local Development

1. **Clone the repository**

   ```bash
   git clone https://github.com/your-username/hairrush-restful-api.git
   cd hairrush-restful-api
   ```

2. **Install dependencies**

   ```bash
   npm install
   ```

3. **Configure environment variables**

   ```bash
   cp .env.example .env
   ```

   Edit `.env` with your configurations:

   ```env
   NODE_ENV=development
   PORT=3001

   # Database
   DB_HOST=localhost
   DB_USER=your_username
   DB_PASS=your_password
   DB_NAME=hairrush_db
   DB_PORT=5432

   # Resend Email API
   RESEND_API_KEY=your_resend_api_key

   # Domain Authentication
   ALLOWED_DOMAINS=localhost,your-domain.com
   ```

4. **Set up the database**

   ```bash
   # Create database
   createdb hairrush_db

   # Run migrations
   npx sequelize-cli db:migrate

   # Run seeders (optional)
   npx sequelize-cli db:seed:all
   ```

5. **Start the server**

   ```bash
   npm start
   ```

---

## 🔌 API Endpoints

### Appointment Management

```http
POST /api/scheduleAppointment    # Schedule new appointment
GET  /api/getAppointments        # Query existing appointments
PUT  /api/cancelAppointment      # Cancel scheduled appointment
```

### Request Examples

#### Schedule Appointment

```json
POST /api/scheduleAppointment
{
  "clientName": "Juan Pérez",
  "clientEmail": "juan@example.com",
  "clientPhone": "+52 999 123 4567",
  "service": "Haircut and Styling",
  "date": "2024-08-15",
  "time": "14:30",
  "notes": "Frequent client"
}
```

#### Query Appointments

```json
GET /api/getAppointments?date=2024-08-15
[
  {
    "id": 1,
    "clientName": "Juan Pérez",
    "service": "Haircut and Styling",
    "date": "2024-08-15",
    "time": "14:30",
    "status": "confirmed"
  }
]
```

#### Cancel Appointment

```json
PUT /api/cancelAppointment
{
  "appointmentId": 1,
  "reason": "Schedule change"
}
```

---

## 📊 Database Schema

### Appointments Table

```sql
CREATE TABLE appointments (
  id SERIAL PRIMARY KEY,
  client_name VARCHAR(100) NOT NULL,
  client_email VARCHAR(150) NOT NULL,
  client_phone VARCHAR(20),
  service VARCHAR(100) NOT NULL,
  appointment_date DATE NOT NULL,
  appointment_time TIME NOT NULL,
  status VARCHAR(20) DEFAULT 'confirmed',
  notes TEXT,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);
```

### Appointment Status

- `confirmed` - Appointment confirmed
- `cancelled` - Appointment cancelled
- `completed` - Service completed
- `no_show` - Client did not show up

---

## 🌐 Frontend Integration

The API is configured to work seamlessly with React.js applications:

### CORS Configuration

```javascript
const corsOptions = {
  origin: [
    "http://localhost:3000", // React dev server
    "http://localhost:5173", // Vite dev server
    // Add production domains when deployed
  ],
  credentials: true,
  methods: ["GET", "POST", "PUT", "DELETE"],
  allowedHeaders: ["Content-Type", "Authorization"],
};
```

---

## ⚡ Performance Features

- **Connection Pooling**: Optimized PostgreSQL connection pool
- **Query Optimization**: Indexed SQL queries for fast lookups
- **Async Operations**: Non-blocking async/await patterns
- **Error Handling**: Robust error management and logging
- **Scalability**: Architecture ready for multiple salon locations

---

## 📄 License

© 2025 HairRush. All rights reserved.

This project is a personal portfolio project and is not licensed for public use, modification, or distribution.

---

## 📞 Contact

**Diego Magaña Álvarez**  
_Full-Stack Developer_

soydiegoo71@gmail.com | +52 445 105 9192

[![LinkedIn](https://img.shields.io/badge/LinkedIn-0077B5?style=for-the-badge&logo=linkedin&logoColor=white)](https://www.linkedin.com/in/diego-magana-dev)

---

## 🙏 Acknowledgments

- [Express.js Documentation](https://expressjs.com/)
- [Sequelize ORM Documentation](https://sequelize.org/)
- [PostgreSQL Documentation](https://www.postgresql.org/docs/)
- [Resend Documentation](https://resend.com/docs)

---

<div align="center">

⭐ If you like this project, don't forget to give it a star!

**HairRush** - Transforming the hair salon appointment experience 💇‍♀️

**Made with ❤️ and ☕**

</div>
