# 🏡 Portal Inmobiliario - Hito 2 (Frontend)

¡Hola! 👋 Este es el repositorio de mi proyecto final para el Hito 2. Aquí está todo el trabajo de la parte visual (Frontend) de la aplicación inmobiliaria.

## 🚀 ¿De qué trata este hito?
En esta etapa me enfoqué en construir la estructura de la página, diseñar las vistas y hacer que todo funcione de manera fluida usando React. La idea es tener una aplicación donde los usuarios puedan ver propiedades y un administrador pueda gestionarlas.

## 📝 Lo que he desarrollado

### 1. Vistas Públicas (Para todos)
Cualquiera que entre a la página puede ver esto:
*   **Inicio (`/`):** La portada bonita con un banner y propiedades destacadas.
*   **Galería (`/properties`):** Donde se ven todas las casas y departamentos. ¡Incluye filtros para buscar más fácil!
*   **Detalle (`/properties/:id`):** Al pinchar una propiedad, te muestra toda la info, fotos y un formulario para contactar.
*   **Registro e Inicio de Sesión:** Formularios para que el administrador pueda entrar al sistema.

### 2. Vistas Privadas (Solo Admin 🔐)
Si inicias sesión ("Login"), se desbloquean nuevas funciones:
*   **Mi Perfil (`/profile`):** Para ver tus datos y administrar tus publicaciones (editar o borrar).
*   **Crear Publicación (`/create`):** Un formulario completo para subir nuevas propiedades con fotos y todo.

> **Ojo:** Si intentas entrar a estas páginas sin loguearte, ¡el sistema te manda al Login automáticamente!.

## 🛠️ Tecnologías que usé
*   **React + Vite:** 
*   **React Router:** Para navegar entre páginas sin que se recargue el sitio (SPA).
*   **Context API:** Para manejar el estado del usuario (saber si está logueado o no en toda la app).
*   **Bootstrap:** Para que el diseño se vea profesional y ordenado sin complicarse tanto con CSS.

## 🏃‍♂️ ¿Cómo correr el proyecto?

1.  Abre la terminal en la carpeta del proyecto.
2.  Instala las dependencias (si no lo has hecho):
    ```bash
    npm install
    ```
3.  Levanta el servidor de desarrollo:
    ```bash
    npm run dev
    ```
4.  ¡Listo! Abre el link que te sale en la consola (usualmente `http://localhost:5173`).

---
*Proyecto realizado para el desafío final de Fullstack.* 🎓
