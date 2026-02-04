# Proyecto Final Fullstack - Hito 4 (Educativo)

Este proyecto es **netamente educativo** y forma parte de la entrega del **Hito 4** de un curso de Fullstack.
El objetivo es consolidar el flujo completo **Frontend + Backend + Base de Datos**, incluyendo autenticacion,
CRUD de propiedades y envio de solicitudes de contacto.

---

## Tecnologias

**Frontend:**
- React + Vite
- React Router
- Bootstrap
- Axios

**Backend:**
- Node.js + Express
- PostgreSQL
- JWT
- Bcrypt
- Multer (subida de imagenes)

---

## Estructura

- `frontend/` -> Aplicacion React
- `backend/` -> API REST con Express
- `backend/database/schema.sql` -> Script de tablas
- `backend/uploads/` -> Imagenes subidas

---

## Requisitos

- Node.js 18+
- PostgreSQL 14+

---

## Instalacion

### 1) Backend
```bash
cd backend
npm install
```

### 2) Base de Datos
1. Crea una base de datos: `portal_inmobiliario`
2. Ejecuta el script:
```bash
psql -d portal_inmobiliario -f database/schema.sql
```

### 3) Variables de entorno
Crea un `.env` en `backend/` (puedes usar este ejemplo):
```env
PORT=3000
DATABASE_URL=postgresql://postgres:tu_contrasena@localhost:5432/portal_inmobiliario
JWT_SECRET=mi_secreto_super_seguro
```

### 4) Frontend
```bash
cd frontend
npm install
```

---

## Ejecucion

### Backend
```bash
cd backend
npm run dev
```
API disponible en: `http://localhost:3000/api`

### Frontend
```bash
cd frontend
npm run dev
```
App disponible en: `http://localhost:5173`

---

## Funcionalidades

- Registro e inicio de sesion
- Autenticacion con JWT
- CRUD de propiedades
- Subida de imagenes
- Envio de solicitudes de contacto
- Vista de solicitudes en perfil de administrador

---

## Endpoints principales

- `POST /api/users` -> registro
- `POST /api/login` -> login
- `GET /api/properties` -> listar propiedades
- `POST /api/properties` -> crear (auth + imagen)
- `PUT /api/properties/:id` -> editar (auth + imagen)
- `DELETE /api/properties/:id` -> eliminar (auth)
- `POST /api/inquiries` -> enviar solicitud
- `GET /api/inquiries` -> ver solicitudes (auth)

---

## Notas

- Las imagenes se guardan en `backend/uploads` y se exponen en `http://localhost:3000/uploads/...`.
- Proyecto de uso **educativo** para evaluacion academica.

---

## Autor

Estudiante de Fullstack (entrega academica).