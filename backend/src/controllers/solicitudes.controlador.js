import { pool } from '../config/db.js';

export const createInquiry = async (req, res) => {
    try {
        const { name, email, message, property_id } = req.body;

        if (!name || !email || !message) {
            return res.status(400).json({ message: 'Faltan campos obligatorios' });
        }

        const result = await pool.query(
            'INSERT INTO solicitudes (nombre, email, mensaje, propiedad_id) VALUES ($1, $2, $3, $4) RETURNING *',
            [name, email, message, property_id]
        );

        const inquiry = result.rows[0];

        res.status(201).json({
            message: 'Solicitud enviada',
            inquiry: {
                id: inquiry.id,
                property_id: inquiry.propiedad_id,
                name: inquiry.nombre,
                email: inquiry.email,
                message: inquiry.mensaje,
                createdAt: inquiry.created_at
            }
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const getInquiries = async (req, res) => {
    try {
        const result = await pool.query('SELECT * FROM solicitudes');

        // Mapeo BD->Response
        const inquiries = result.rows.map(row => ({
            id: row.id,
            property_id: row.propiedad_id,
            name: row.nombre,
            email: row.email,
            message: row.mensaje,
            createdAt: row.created_at
        }));

        res.json(inquiries);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
