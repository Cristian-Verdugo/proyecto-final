import express from 'express';
import cors from 'cors';
import path from 'path';
import { fileURLToPath } from 'url';
import usuariosRutas from './routes/usuarios.rutas.js';
import propiedadesRutas from './routes/propiedades.rutas.js';
import solicitudesRutas from './routes/solicitudes.rutas.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const uploadsDir = path.join(__dirname, '..', 'uploads');

const app = express();

app.use(cors());
app.use(express.json());

app.use('/uploads', express.static(uploadsDir));

// Main Routes
app.use('/api', usuariosRutas); // Exposes /api/users, /api/login
app.use('/api/properties', propiedadesRutas);
app.use('/api/inquiries', solicitudesRutas);

app.use((req, res) => {
    res.status(404).json({ message: 'Ruta no encontrada' });
});

export default app;