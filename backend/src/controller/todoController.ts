
import { UUIDTypes } from 'uuid';
import todoService from '../service/todoService';
import { Request, Response } from 'express';

declare global {

    namespace Express {

        interface Request {

            user?: {

                id: UUIDTypes

            };

        }

    }

}

const todoController = {
    createTodo: async (req: Request, res: Response) => {
        const { title, description} = req.body;
        try {
            const todo = await todoService.createTodo({
                title,
                description,
                ownerId: req.user?.id || ''
            });
            res.status(201).json({ todo });
        } catch (error) {
            res.status(400).json({ error });
        }
    },

    getTodos: async (req: Request, res: Response) => {
        try {
            if (!req.user?.id) {
                return res.status(400).json({ error: 'User ID is required' });
            }
            const todos = await todoService.getTodos(req.user.id);
            res.status(200).json({ todos });
        } catch (error) {
            res.status(400).json({ error });
        }
    },

    completeTodo: async (req: Request, res: Response) => {
        const { id } = req.params;
        try {
            const todo = await todoService.completeTodo(id);
            res.status(200).json({ todo });
        } catch (error) {
            res.status(400).json({ error });
        }
    },

    deleteTodo: async (req: Request, res: Response) => {
        const { id } = req.params;
        try {
            await todoService.deleteTodo(id);
            res.status(204).send();
        } catch (error) {
            res.status(400).json({ error });
        }
    }
}

export default todoController;