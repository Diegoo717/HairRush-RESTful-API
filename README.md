# HairRush RESTful API 💇‍♀️

Una API REST robusta desarrollada con Node.js, Express y Sequelize sobre PostgreSQL, especializada en la gestión de citas para peluquerías con validaciones robustas, autenticación por dominio y sistema de notificaciones por email.

## 📋 Descripción

HairRush RESTful API es el backend especializado para peluquerías, desarrollado con Node.js, Express y Sequelize sobre PostgreSQL. Ofrece endpoints RESTful optimizados para la gestión de citas, validaciones robustas de datos y envío de emails personalizados via Resend API con autenticación por dominio, diseñado para integrarse perfectamente con clientes frontend modernos.

## 🚀 Características Principales

- ✅ **Gestión de Citas**: Sistema completo de agendamiento, consulta y cancelación
- 🔐 **Autenticación por Dominio**: Control de acceso basado en dominios autorizados
- 📧 **Notificaciones Inteligentes**: Emails personalizados para confirmaciones y recordatorios
- 🛡️ **Validaciones Robustas**: Middleware avanzado de validación de datos
- 📊 **Base de Datos Relacional**: PostgreSQL con Sequelize ORM para máximo rendimiento
- 🌐 **API RESTful**: Endpoints semánticos y bien estructurados
- ⚡ **Alto Rendimiento**: Optimizado para consultas rápidas y concurrentes
- 🔄 **Integración Seamless**: Diseñado para frontend React.js

## 🛠️ Tecnologías

### Backend
- **Node.js**: Entorno de ejecución JavaScript del lado del servidor
- **Express.js**: Framework web rápido y minimalista
- **Sequelize**: ORM moderno para JavaScript con PostgreSQL

### Base de Datos
- **PostgreSQL**: Sistema de gestión de bases de datos objeto-relacional avanzado

### Servicios y Middleware
- **Resend API**: Servicio profesional de envío de emails
- **Custom Middleware**: Validaciones y autenticación personalizada
- **CORS**: Configuración para integración con frontend React

### DevOps y Desarrollo
- **Sequelize CLI**: Migraciones y seeders para base de datos
- **Environment Variables**: Configuración segura con variables de entorno

## 📁 Estructura del Proyecto

```
HAIRRUSH-RESTFUL-API/
│
├── config/
│   ├── config.json                # Configuración de base de datos
│   └── database.js                # Conexión a PostgreSQL
│
├── controllers/
│   ├── cancelAppointment.js       # Cancelación de citas
│   ├── getAppointments.js         # Consulta de citas
│   └── scheduleAppointment.js     # Agendamiento de citas
│
├── middlewares/                   # Middleware de validación y auth
│
├── migrations/                    # Migraciones de base de datos
│
├── models/
│   ├── appointment.js             # Modelo de citas
│   └── index.js                   # Configuración de modelos
│
├── routes/
│   └── appointmentRoutes.js       # Rutas de citas
│
├── seeders/                       # Datos iniciales
│
├── services/
│   └── resend.js                  # Servicio de emails
│
├── utils/                         # Utilidades y helpers
│
├── .env                           # Variables de entorno
├── app.js                         # Configuración principal
└── package.json                   # Dependencias del proyecto
```

## 🎯 Nuestra Misión

Revolucionar la experiencia de agendamiento en peluquerías mediante tecnología moderna, facilitando la gestión de citas tanto para clientes como para profesionales del sector.

## 🔮 Nuestra Visión

Ser la plataforma líder en soluciones tecnológicas para salones de belleza, conectando profesionales y clientes a través de herramientas digitales intuitivas y eficientes.

## 💎 Nuestros Valores

### Eficiencia
Optimizamos el tiempo de nuestros usuarios mediante procesos automatizados y flujos de trabajo intuitivos.

### Confiabilidad
Garantizamos un servicio estable y seguro para la gestión de citas importantes.

### Innovación
Adoptamos las últimas tecnologías para ofrecer la mejor experiencia posible.

## 🚀 Instalación y Configuración

### Prerrequisitos
- Node.js 16+
- PostgreSQL 12+
- npm o yarn

### Instalación Local

1. **Clona el repositorio**
   ```bash
   git clone https://github.com/tu-usuario/hairrush-restful-api.git
   cd hairrush-restful-api
   ```

2. **Instala dependencias**
   ```bash
   npm install
   ```

3. **Configura variables de entorno**
   ```bash
   cp .env.example .env
   ```
   
   Edita `.env` con tus configuraciones:
   ```env
   NODE_ENV=development
   PORT=3001
   
   # Database
   DB_HOST=localhost
   DB_USER=tu_usuario
   DB_PASS=tu_contraseña
   DB_NAME=hairrush_db
   DB_PORT=5432
   
   # Resend Email API
   RESEND_API_KEY=tu_resend_api_key
   
   # Domain Authentication
   ALLOWED_DOMAINS=localhost,tu-dominio.com
   ```

4. **Configura la base de datos**
   ```bash
   # Crear la base de datos
   createdb hairrush_db
   
   # Ejecutar migraciones
   npx sequelize-cli db:migrate
   
   # Ejecutar seeders (opcional)
   npx sequelize-cli db:seed:all
   ```

5. **Inicia el servidor**
   ```bash
   # Desarrollo
   node app.js
   
   # Producción
   node app.js
   ```

## 🔌 Endpoints de la API

### Gestión de Citas
```http
POST /api/scheduleAppointment    # Agendar nueva cita
GET  /api/getAppointments        # Consultar citas existentes
PUT  /api/cancelAppointment      # Cancelar cita programada
```

### Estructura de Datos

#### Agendar Cita
```json
POST /api/scheduleAppointment
{
  "clientName": "Juan Pérez",
  "clientEmail": "juan@ejemplo.com",
  "clientPhone": "+52 999 123 4567",
  "service": "Corte y Peinado",
  "date": "2024-08-15",
  "time": "14:30",
  "notes": "Cliente frecuente"
}
```

#### Consultar Citas
```json
GET /api/getAppointments?date=2024-08-15
[
  {
    "id": 1,
    "clientName": "Juan Pérez",
    "service": "Corte y Peinado",
    "date": "2024-08-15",
    "time": "14:30",
    "status": "confirmed"
  }
]
```

#### Cancelar Cita
```json
PUT /api/cancelAppointment
{
  "appointmentId": 1,
  "reason": "Cambio de horario"
}
```

## 🔒 Seguridad y Validaciones

### Autenticación por Dominio
- Validación de dominios permitidos para acceso a la API
- Control de CORS configurado para dominios específicos
- Headers de seguridad implementados

### Validaciones de Datos
- Validación de formatos de email y teléfono
- Verificación de fechas y horarios disponibles
- Sanitización de datos de entrada
- Validación de servicios existentes

## 📧 Sistema de Notificaciones

### Resend API Integration
```javascript
// Confirmación de cita
const confirmationEmail = {
  to: clientEmail,
  subject: '✅ Cita confirmada - HairRush',
  template: 'appointment-confirmation',
  data: {
    clientName,
    service,
    date,
    time,
    salonInfo
  }
}

// Recordatorio de cita
const reminderEmail = {
  to: clientEmail,
  subject: '⏰ Recordatorio de cita - HairRush',
  template: 'appointment-reminder',
  data: {
    clientName,
    service,
    appointmentTime
  }
}
```

## 📊 Modelo de Base de Datos

### Tabla Appointments
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

### Estados de Cita
- `confirmed`: Cita confirmada
- `cancelled`: Cita cancelada
- `completed`: Servicio completado
- `no_show`: Cliente no se presentó

## 🌐 Integración con Frontend

### HairRush WebApp (React.js)
La API está diseñada para integrarse perfectamente con:
- **Framework**: React.js con Context API/Redux
- **HTTP Client**: Axios/Fetch API
- **Routing**: React Router
- **Build Tool**: Vite/Create React App

### Configuración de CORS
```javascript
const corsOptions = {
  origin: [
    'http://localhost:3000',      // React dev server
    'http://localhost:5173',      // Vite dev server
    // Dominios de producción cuando se desplieguen
  ],
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization']
};
```

## ⚡ Rendimiento y Optimización

### Optimizaciones Implementadas
- **Connection Pooling**: Pool de conexiones PostgreSQL optimizado
- **Query Optimization**: Consultas SQL optimizadas con índices
- **Async Operations**: Operaciones asíncronas con async/await
- **Error Handling**: Manejo robusto de errores y logging

### Escalabilidad
- Arquitectura preparada para múltiples salones
- Soporte para alta concurrencia de citas
- Optimización para picos de tráfico

## 👨‍💻 Desarrollador

**Ing. Diego Magaña Álvarez**
- **Rol**: Arquitecto y Desarrollador Full-Stack
- **Experiencia**: 3+ años en el ciclo completo de desarrollo de aplicaciones web/móviles y sistemas escalables
- **Enfoque en el proyecto**: 
  - Desarrollo de APIs especializadas para sectores específicos
  - Integración de sistemas de notificaciones avanzados
  - Arquitectura de bases de datos PostgreSQL optimizada
  - Validaciones robustas y seguridad por dominio
  - Integración seamless con frontends React.js
- **Contacto**: [soydiegoo71@gmail.com](mailto:soydiegoo71@gmail.com)

## 🌐 Aplicación Frontend

- **HairRush WebApp**: Interfaz React.js para gestión de citas (en desarrollo)

## 🆘 Soporte

¿Necesitas ayuda? Puedes:
- Crear un [issue](https://github.com/tu-usuario/hairrush-restful-api/issues) en GitHub
- Contactar al desarrollador: [soydiegoo71@gmail.com](mailto:soydiegoo71@gmail.com)

---

⭐ Si te gusta este proyecto, ¡no olvides darle una estrella!

**HairRush** - Transformando la experiencia de agendamiento en peluquerías 💇‍♀️
