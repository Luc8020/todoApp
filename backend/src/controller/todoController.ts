
import { UUIDTypes } from 'uuid';
import todoService from '../service/todoService';
import path from 'path';
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
        const { title, description } = req.body;
        const files = req.files as Express.Multer.File[];
        
        try {
            const filepaths = files ? files.map(file => file.path) : [];
            
            const todo = await todoService.createTodo({
                title,
                description,
                ownerId: req.user?.id || '',
                filepaths
            });
            
            res.status(201).json({ todo });
        } catch (error) {
            res.status(400).json({ error });
        }
    },

    downloadFiles: async (req: Request, res: Response) => {
        const { id } = req.params;
        try {
            const todo = await todoService.getTodoById(id);
            if (!todo) {
                return res.status(404).json({ error: 'Todo not found' });
            }
            res.download(`${todo.filepaths[0]}`);
        } catch (error) {
            res.status(400).json({ error });
        }
    },

    showImage: async (req: Request, res: Response) => {
        const { id } = req.params;
        try {
            const todo = await todoService.getTodoById(id);
            if (!todo) {
                return res.status(404).json({ error: 'Todo not found' });
            }
            res.sendFile(path.resolve(todo.filepaths[0]));
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