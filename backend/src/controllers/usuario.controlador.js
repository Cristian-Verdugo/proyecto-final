import { pool } from '../config/db.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

// POST /users
export const register = async (req, res) => {
    const { email, password, picture, name } = req.body; // 'name' opcional si el front lo manda, el contrato solo dice email/pass/picture

    try {
        const userExist = await pool.query('SELECT * FROM administradores WHERE email = $1', [email]);
        if (userExist.rows.length > 0) {
            return res.status(400).json({ message: 'El usuario ya existe' });
        }

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        await pool.query(
            'INSERT INTO administradores (email, contraseña, foto, nombre) VALUES ($1, $2, $3, $4)',
            [email, hashedPassword, picture || null, name || 'Admin']
        );

        res.status(201).json({ message: 'Usuario creado con éxito' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error en el servidor' });
    }
};

// POST /login
export const login = async (req, res) => {
    const { email, password } = req.body;

    try {
        const user = await pool.query('SELECT * FROM administradores WHERE email = $1', [email]);
        if (user.rows.length === 0) {
            return res.status(400).json({ message: 'Credenciales inválidas' });
        }

        const validPassword = await bcrypt.compare(password, user.rows[0].contraseña);
        if (!validPassword) {
            return res.status(400).json({ message: 'Credenciales inválidas' });
        }

        const token = jwt.sign({ id: user.rows[0].id }, process.env.JWT_SECRET, {
            expiresIn: '1h',
        });

        // Contract Response: { token, user: { id, email, picture, name } }
        res.json({
            token,
            user: {
                id: user.rows[0].id,
                email: user.rows[0].email,
                picture: user.rows[0].foto, // Mapeo BD->Response
                name: user.rows[0].nombre
            }
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error en el servidor' });
    }
};
