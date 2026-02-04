-- Tabla de Administradores (antes users)
CREATE TABLE IF NOT EXISTS administradores (
  id SERIAL PRIMARY KEY,
  nombre VARCHAR(255),
  email VARCHAR(255) UNIQUE NOT NULL,
  contraseña VARCHAR(255) NOT NULL,
  foto VARCHAR(255),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Tabla de Propiedades (antes properties)
CREATE TABLE IF NOT EXISTS propiedades (
  id SERIAL PRIMARY KEY,
  titulo VARCHAR(255) NOT NULL,
  descripcion TEXT,
  precio DECIMAL(10, 2) NOT NULL,
  direccion VARCHAR(255) NOT NULL,
  habitaciones INT,
  banos INT,
  permite_mascotas BOOLEAN,
  permite_fumar BOOLEAN,
  imagen VARCHAR(255),
  tipo VARCHAR(50),
  administrador_id INT REFERENCES administradores(id) ON DELETE CASCADE ON UPDATE CASCADE,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Tabla de Solicitudes (antes inquiries)
CREATE TABLE IF NOT EXISTS solicitudes (
  id SERIAL PRIMARY KEY,
  nombre VARCHAR(255) NOT NULL,
  email VARCHAR(255) NOT NULL,
  mensaje TEXT NOT NULL,
  propiedad_id INT REFERENCES propiedades(id) ON DELETE CASCADE ON UPDATE CASCADE,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
