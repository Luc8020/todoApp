import express from 'express';
import authRoutes from '../routes/authRoutes';
import todoRoutes from '../routes/todoRoutes';
const cors = require('cors');

const initRoutes = (app: express.Application) => {
    app.use(express.json());
    app.use(cors({
        origin: 'http://localhost:5173'
      }))
    app.use('/auth', authRoutes);
    app.use('/todo', todoRoutes);
}

module.exports = initRoutes;