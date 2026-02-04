import { Router } from 'express';
import { getProperties, getProperty, createProperty, updateProperty, deleteProperty } from '../controllers/propiedades.controlador.js';
import { authMiddleware } from '../middlewares/autenticacion.middleware.js';
import { upload } from '../middlewares/upload.middleware.js';

const router = Router();

router.get('/', getProperties);
router.get('/:id', getProperty);
router.post('/', authMiddleware, upload.single('image'), createProperty);
router.put('/:id', authMiddleware, upload.single('image'), updateProperty);
router.delete('/:id', authMiddleware, deleteProperty);

export default router;