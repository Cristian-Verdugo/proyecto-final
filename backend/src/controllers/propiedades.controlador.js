import { pool } from '../config/db.js';

// Helper para transformar fila de BD (Español) a Objeto API (Inglés)
const mapPropertyToApi = (row) => ({
    id: row.id,
    title: row.titulo,
    type: row.tipo,
    price: parseFloat(row.precio), // Asegurar número
    address: row.direccion,
    rooms: row.habitaciones,
    bathrooms: row.banos,
    pets: row.permite_mascotas,
    smoking: row.permite_fumar || false,
    image: row.imagen,
    description: row.descripcion,
});

const parseBool = (value) => value === true || value === 'true';
const normalizeImage = (req) => {
    if (req.file) {
        return `/uploads/${req.file.filename}`;
    }
    if (typeof req.body.image === 'string' && req.body.image.trim() !== '') {
        return req.body.image;
    }
    return null;
};

export const getProperties = async (req, res) => {
    try {
        const result = await pool.query('SELECT * FROM propiedades');
        const properties = result.rows.map(mapPropertyToApi);
        res.json(properties);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const getProperty = async (req, res) => {
    try {
        const { id } = req.params;
        const result = await pool.query('SELECT * FROM propiedades WHERE id = $1', [id]);
        if (result.rows.length === 0) {
            return res.status(404).json({ message: 'Propiedad no encontrada' });
        }
        res.json(mapPropertyToApi(result.rows[0]));
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const createProperty = async (req, res) => {
    try {
        // Mapeo Request (Inglés) -> Variables para DB (Español)
        const { title, type, price, address, rooms, bathrooms, description } = req.body;
        const pets = parseBool(req.body.pets);
        const smoking = parseBool(req.body.smoking);
        const image = normalizeImage(req);

        // Auth Middleware deja req.user
        const result = await pool.query(
            'INSERT INTO propiedades (titulo, descripcion, precio, direccion, habitaciones, banos, tipo, imagen, permite_mascotas, permite_fumar, administrador_id) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11) RETURNING *',
            [title, description, price, address, rooms, bathrooms, type, image, pets, smoking, req.user.id]
        );

        res.status(201).json({
            message: 'Propiedad creada',
            property: mapPropertyToApi(result.rows[0])
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: error.message });
    }
};

export const updateProperty = async (req, res) => {
    try {
        const { id } = req.params;
        const { title, type, price, address, rooms, bathrooms, description } = req.body;
        const pets = parseBool(req.body.pets);
        const smoking = parseBool(req.body.smoking);
        const image = normalizeImage(req);

        // Consulta dinámica o update completo. Haremos completo por simplicidad según el payload
        const result = await pool.query(
            `UPDATE propiedades SET 
        titulo = $1, 
        descripcion = $2, 
        precio = $3, 
        direccion = $4,
        habitaciones = $5,
        banos = $6,
        tipo = $7,
        imagen = $8,
        permite_mascotas = $9,
        permite_fumar = $10
      WHERE id = $11 RETURNING *`,
            [title, description, price, address, rooms, bathrooms, type, image, pets, smoking, id]
        );

        if (result.rows.length === 0) {
            return res.status(404).json({ message: 'Propiedad no encontrada' });
        }

        res.json({
            message: 'Propiedad actualizada',
            property: mapPropertyToApi(result.rows[0])
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const deleteProperty = async (req, res) => {
    try {
        const { id } = req.params;
        const result = await pool.query('DELETE FROM propiedades WHERE id = $1 RETURNING *', [id]);

        if (result.rows.length === 0) {
            return res.status(404).json({ message: 'Propiedad no encontrada' });
        }

        res.json({ message: 'Propiedad eliminada' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};