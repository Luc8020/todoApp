import { Request, Response } from 'express';
import authService from '../service/authService';
const register = async (req: Request & { body: { email: string, password: string, username: string } }, res: Response) => {
    const { email, password, username } = req.body as { email: string, password: string, username: string }

    try {
        const user = await authService.createUser(email, password, username)
        res.status(201).json({
            id: user.id,
            email: user.email,
            username: user.username,
            message: 'User registered successfully'
        });
    } catch (error) {
        res.status(400).json({error})
    }
}

const login = async (req: Request, res: Response) => {
    const {email, password} = req.body

    try {
        const token = await authService.login(email, password)
        res.status(200).json({token})
    } catch (error: any) {
        res.status(400).json({message: error.message})
    }
}

export default { register, login }