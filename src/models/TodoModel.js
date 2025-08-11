import { pool } from '../config/pool.js';
import { v4 as uuidv4 } from 'uuid';

export class TodoModel {
    static async create({ title, description, completed = false, user_id }) {
        if (!user_id) {
            throw new Error('User ID is required');
        }
        const id = uuidv4();
        await pool.query(
            'INSERT INTO todos (id, title,description,completed, user_id) VALUES  (?,?,?,?,?)',
            [id, title, description, completed, user_id]
        );
        return { id, title, description, completed, user_id };
    }

    static async findAll(user_id) {
        if (!user_id) {
            throw new Error('User ID is required');
        }
        const [rows] = await pool.query(
            'SELECT * FROM todos WHERE user_id = ?',
            [user_id]
        );
        return rows;
    }

    static async findById(id, user_id) {
        if (!user_id) {
            throw new Error('User ID is required');
        }
        const [rows] = await pool.query(
            'SELECT * FROM todos WHERE id = ? AND user_id = ?',
            [id, user_id]
        );
        return rows[0];
    }

    static async update(
        id,
        { title, description, completed = false, user_id }
    ) {
        if (!user_id) {
            throw new Error('User ID is required');
        }
        await pool.query(
            'UPDATE todos SET title = ?, description = ?, completed = ? WHERE id =? AND user_id = ?',
            [title, description, completed, id, user_id]
        );
        return this.findById(id, user_id);
    }

    static async delete(id, user_id) {
        await pool.query('DELETE FROM todos WHERE id = ? AND user_id = ?', [
            id,
            user_id,
        ]);
        return { id };
    }
}
