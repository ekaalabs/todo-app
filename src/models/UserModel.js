import { pool } from '../config/pool.js';
import { v4 as uuidv4 } from 'uuid';

export class UserModel {
    static async create({ username, hashedPassword, name, email }) {
        const id = uuidv4();
        await pool.query(
            'INSERT INTO users (id,username,password,name,email) VALUES (?,?,?,?,?)',
            [id, username, hashedPassword, name, email]
        );
        return { id, username, name, email };
    }

    static async findAll() {
        const [rows] = await pool.query(
            'SELECT id, username, name, email FROM users'
        );
        return rows;
    }

    static async findById(id) {
        const [rows] = await pool.query(
            'SELECT id, username, name,email FROM users WHERE id = ?',
            [id]
        );
        return rows[0];
    }

    static async findByUsername(username) {
        const [rows] = await pool.query(
            'SELECT * FROM users WHERE username =?',
            [username]
        );
        return rows[0];
    }

    static async update(id, { username, name, email }) {
        await pool.query(
            'UPDATE users SET username = ?, name = ?, email = ? WHERE id = ?',
            [username, name, email, id]
        );
        return this.findById(id);
    }

    static async updatePassword(id, { hashedPassword }) {
        await pool.query('UPDATE users SET password = ? WHERE id = ?', [
            hashedPassword,
            id,
        ]);
        return this.findById(id);
    }

    static async delete(id) {
        await pool.query('DELETE FROM users WHERE id = ?', [id]);
        return { id };
    }
}
