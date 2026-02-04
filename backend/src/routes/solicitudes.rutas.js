import { Router } from 'express';
import { createInquiry, getInquiries } from '../controllers/solicitudes.controlador.js';
import { authMiddleware } from '../middlewares/autenticacion.middleware.js';

const router = Router();

router.post('/', createInquiry); // Público (usualmente)
router.get('/', authMiddleware, getInquiries); // Protegido (solo admin/user)

export default router;
