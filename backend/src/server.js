import app from './app.js';
import dotenv from 'dotenv';
import { pool } from './config/db.js';

dotenv.config();

const PORT = process.env.PORT || 3000;

const startServer = async () => {
    try {
        // Optional: Check DB connection on startup
        // const res = await pool.query('SELECT NOW()');
        // console.log('DB Connected:', res.rows[0]);

        app.listen(PORT, () => {
            console.log(`Servidor corriendo en el puerto ${PORT}`);
        });
    } catch (error) {
        console.error('Error al iniciar el servidor:', error);
    }
};

startServer();
