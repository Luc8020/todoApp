require('dotenv').config();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
import User from '../models/user';

const authService = {
    createUser: async (email: string, password: string, username: string) => {
        console.log(email, password, username)
        const existingUser = await User.findOne({ where: { email } })
        if (existingUser) {
            throw new Error('User with that email already exists')
        }

        if (await User.findOne({ where: { username } })) {
            throw new Error('User with that username already exists')
        }

        const hashedPassword = await bcrypt.hash(password, 10)
        const user = await User.create({
            email,
            password: hashedPassword,
            username
        })

        return user
    },

    login: async (email: string, password: string) => {
        const user = await User.findOne({ where: { email } })
        if (!user) {
            throw new Error('Invalid email or password')
        }

        const isPasswordValid = await bcrypt.compare(password, user.password)
        if (!isPasswordValid) {
            throw new Error('Invalid email or password')
        }

        const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, { expiresIn: '24h' })
        return token
    }
}

export default authService;