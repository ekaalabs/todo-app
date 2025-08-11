import { Router } from 'express';
import { TodoController } from '../controllers/TodoController.js';
import { authenticate } from '../middleware/Auth.js';

const router = Router();

router.post('/', authenticate, TodoController.createTodo);
router.get('/', authenticate, TodoController.getAllTodos);
router.get('/:id', authenticate, TodoController.getTodoById);
router.put('/:id', authenticate, TodoController.updateTodo);
router.delete('/:id', authenticate, TodoController.deleteTodo);

export default router;
