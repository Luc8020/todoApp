const express = require('express');
const router = express.Router();
import todoController from '../controller/todoController';
import authMiddleware from '../middleware/authMiddleware';

router.get('/', authMiddleware, todoController.getTodos);
router.post('/', authMiddleware, todoController.createTodo);
router.patch('/:id', authMiddleware, todoController.completeTodo);
router.delete('/:id', authMiddleware, todoController.deleteTodo);

export default router;