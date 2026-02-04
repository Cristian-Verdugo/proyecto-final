import request from 'supertest';
import app from '../app.js';
import { pool } from '../config/db.js';

// Mock simple para evitar conexión real a BD si falla
// Nota: Para pruebas reales integrales, se recomienda una BD de test.
// Aquí probaremos principalmente que las rutas respondan y la protección auth.

/*
jest.mock('../config/db.js', () => ({
  pool: {
    query: jest.fn().mockResolvedValue({ rows: [] }),
    on: jest.fn(),
  },
}));
*/

describe('API Routes', () => {

    // Test Health Check o 404
    test('GET /ruta-inexistente devuelve 404', async () => {
        const res = await request(app).get('/api/no-existe');
        expect(res.statusCode).toBe(404);
    });

    // Test Properties (Asumiendo que falla autenticación sin token)
    test('POST /api/properties sin token devuelve 401', async () => {
        const res = await request(app).post('/api/properties').send({
            title: 'Test Property'
            // El controlador espera 'title' y lo mapea a 'titulo', pero el middleware rechaza antes.
        });
        expect(res.statusCode).toBe(401);
    });

    // Test Properties GET (Público)
    test('GET /api/properties devuelve 200 y un array', async () => {
        const res = await request(app).get('/api/properties');
        expect(res.statusCode).toBe(200);
        expect(Array.isArray(res.body)).toBe(true);
    });

    // Test Inquiries (Público)
    test('POST /api/inquiries valida campos faltantes (400)', async () => {
        // Payload vacío debe fallar
        const res = await request(app).post('/api/inquiries').send({});
        expect(res.statusCode).toBe(400);
    });

});

// Cerrar pool después de tests (si fuera conexión real)
afterAll(async () => {
    // await pool.end();
});
