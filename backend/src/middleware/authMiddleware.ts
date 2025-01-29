require('dotenv').config();
const jwt = require('jsonwebtoken');
import User from '../models/user';
import { Request, Response, NextFunction } from 'express';

const authMiddleware = async (req: Request, res: Response, next: NextFunction) => {	
  try {
    const authHeader = req.header('Authorization');
    if (!authHeader) {
      return res.status(401).send({ error: 'Authorization header is missing' });
    }
    const token = authHeader.replace('Bearer ', '');
    const data = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findOne({ where: { id: data.id} });
    if (!user) {
      res.status(401).send({ error: 'Not authorized to access this resource' });
    }
    (req as any).user = user;
    next();
} catch (error: any) {
    console.log(error);
    res.status(401).send({ error: 'Not authorized to access this resource' });
  }
}

export default authMiddleware;