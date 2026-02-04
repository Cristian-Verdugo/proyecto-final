import { Router } from 'express';
import { register, login } from '../controllers/usuario.controlador.js';

const router = Router();

// Contract: POST /users, POST /login
// Mounted at /api in app.js -> /api/users, /api/login

router.post('/users', register);
router.post('/login', login);

export default router;
