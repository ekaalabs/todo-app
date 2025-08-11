import { TodoService } from '../services/TodoService.js';

export class TodoController {
    static async createTodo(req, res) {
        try {
            const userId = req.user.id;
            const { title, description, completed } = req.body;
            const todo = await TodoService.createTodo(userId, {
                title,
                description,
                completed,
            });
            res.status(201).json({ data: todo });
        } catch (error) {
            res.status(400).json({ error: error.message });
        }
    }

    static async getAllTodos(req, res) {
        try {
            const userId = req.user.id;
            const todos = await TodoService.getAllTodos(userId);
            res.status(200).json({ data: todos });
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }

    static async getTodoById(req, res) {
        try {
            const userId = req.user.id;
            const { id } = req.params;
            const todo = await TodoService.getTodoById(userId, id);
            res.status(200).json({ data: todo });
        } catch (error) {
            res.status(404).json({ error: error.message });
        }
    }

    static async updateTodo(req, res) {
        try {
            const userId = req.user.id;
            const { id } = req.params;
            const { title, description, completed } = req.body;
            const updated = await TodoService.updateTodo(userId, id, {
                title,
                description,
                completed,
            });
            res.status(200).json({
                message: 'Todo updated successfully',
                data: updated,
            });
        } catch (error) {
            res.status(404).json({ error: error.message });
        }
    }

    static async deleteTodo(req, res) {
        try {
            const userId = req.user.id;
            const { id } = req.params;
            const result = await TodoService.deleteTodo(userId, id);
            res.status(200).json({
                message: 'Todo deleted successfully',
                data: result,
            });
        } catch (error) {
            res.status(404).json({ error: error.message });
        }
    }
}
