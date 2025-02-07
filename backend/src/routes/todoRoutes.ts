const express = require('express');
const router = express.Router();
import todoController from '../controller/todoController';
import authMiddleware from '../middleware/authMiddleware';
import {upload} from '../middleware/uploadMiddleware';

router.get('/', authMiddleware, todoController.getTodos);
router.get('/:id/files', authMiddleware, todoController.downloadFiles);
router.post('/', authMiddleware, upload.array('files'), todoController.createTodo);
router.patch('/:id', authMiddleware, todoController.completeTodo);
router.delete('/:id', authMiddleware, todoController.deleteTodo);
router.get('/:id/image', authMiddleware, todoController.showImage);

export default router;