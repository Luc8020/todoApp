const express = require('express');
const router = express.Router();
import authController from '../controller/authController';
import authMiddleware from '../middleware/authMiddleware';

router.post('/register', authController.register)
router.post('/login', authController.login)
router.get('/check', authMiddleware, authController.check)

export default router;