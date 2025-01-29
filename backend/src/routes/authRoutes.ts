const express = require('express');
const router = express.Router();
import authController from '../controller/authController';

router.post('/register', authController.register)
router.post('/login', authController.login)

export default router;