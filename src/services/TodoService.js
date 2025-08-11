import { TodoModel } from '../models/TodoModel.js';

export class TodoService {
    static async createTodo(userId, { title, description, completed }) {
        if (!title || title.length < 3) {
            throw new Error('Title must be at least 3 characters');
        }
        if (description && description.length > 500) {
            throw new Error('Description cannot exceed 500 characters');
        }
        const todo = await TodoModel.create({
            title,
            description,
            completed,
            user_id: userId,
        });
        return todo;
    }

    static async getAllTodos(userId) {
        return await TodoModel.findAll(userId);
    }

    static async getTodoById(userId, id) {
        const todo = await TodoModel.findById(id, userId);
        if (!todo) {
            throw new Error('Todo not found or unauthorized');
        }
        return todo;
    }

    static async updateTodo(userId, id, { title, description, completed }) {
        if (!title || !description) {
            throw new Error('All fields are required');
        }
        if (title.length < 3) {
            throw new Error('Title must be at least 3 characters');
        }
        if (description.length > 500) {
            throw new Error('Description cannot exceed 500 characters');
        }
        const updated = await TodoModel.update(id, {
            title,
            description,
            completed,
            user_id: userId,
        });
        if (!updated) {
            throw new Error('Todo not found or unauthorized');
        }
        return updated;
    }

    static async deleteTodo(userId, id) {
        const result = await TodoModel.delete(id, userId);
        if (!result.id) {
            throw new Error('Todo not found or unauthorized');
        }
    }
}
