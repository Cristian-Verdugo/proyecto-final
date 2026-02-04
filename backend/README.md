# 🏡 Backend - Portal Inmobiliario (Hito 3)

¡Hola! 👋 Este proyecto es parte de mi **Proyecto Final de Fullstack**.
En este **Hito 3**, desarrollé toda la lógica del lado del servidor (Backend) para gestionar nuestra inmobiliaria.

La idea principal es tener una API que permita registrar administradores, publicar propiedades y recibir solicitudes de contacto, todo conectado a una base de datos real.

---

## 🚀 Tecnologías que usé

Para construir esto utilicé:
*   **Node.js** y **Express**: Para crear el servidor y manejar las rutas.
*   **PostgreSQL**: Mi base de datos relacional para guardar todo (usuarios, casas, mensajes).
*   **JWT (JSON Web Tokens)**: Para la seguridad.
*   **Bcrypt**: Para encriptar las contraseñas 
*   **Jest & Supertest**: Para probar que todo funcione antes de entregar. ✅

---

## 🛠️ Cómo hacerlo funcionar

Sigue estos pasos sencillos para probar mi proyecto:

### 1. Instalar dependencias
Abre la terminal en esta carpeta y ejecuta:
```bash
npm install
```

### 2. Configurar la Base de Datos
Necesitas tener PostgreSQL instalado.
1.  Crea una base de datos llamada `portal_inmobiliario`.
2.  Ejecuta el script que está en `database/schema.sql` para crear las tablas.

### 3. Variables de Entorno (.env)
Asegúrate de tener un archivo `.env` con tus datos (ya dejé uno de ejemplo configurado para local):
```env
PORT=3000
DATABASE_URL=postgresql://postgres:tu_contraseña@localhost:5432/portal_inmobiliario
JWT_SECRET=mi_secreto_super_seguro
```

### 4. ¡A correr el servidor!
Para iniciar el modo de desarrollo (que se reinicia solo si haces cambios):
```bash
npm run dev
```
Verás un mensaje como: `Servidor corriendo en el puerto 3000`.

---

## 🧪 Tests (Pruebas)
Si quieres verificar que las rutas principales funcionan correctamente, corre los tests que preparé:
```bash
npm test
```
Esto probará automáticamente el registro, login y la creación de propiedades.

---

## 📂 Estructura del Proyecto
Traté de ser ordenado, así que separé el código en carpetas en inglés para seguir estándares, pero los archivos están en español para que sea fácil de leer:

*   `src/controllers/`: Aquí está la magia (lógica) de usuarios, propiedades y solicitudes.
*   `src/routes/`: Aquí defino las URL de mi API (quién puede entrar y quién no).
*   `src/middlewares/`: Los guardias de seguridad que revisan el Token.
*   `src/config/`: La conexión a la base de datos.
*   `src/tests/`: Pruebas automatizadas.

---

¡Espero que te guste! 🚀
*Realizado por un estudiante entusiasta de Fullstack.* 👨‍💻
