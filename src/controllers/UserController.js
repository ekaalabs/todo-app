import { UserService } from '../services/UserService.js';
import jwt from 'jsonwebtoken';

export class UserController {
    static async register(req, res) {
        try {
            const { username, password, name, email } = req.body;
            const user = await UserService.createUser({
                username,
                password,
                name,
                email,
            });
            res.status(201).json({ message: 'User created', user });
        } catch (error) {
            res.status(400).json({ error: error.message });
        }
    }

    static async login(req, res) {
        try {
            const { username, password } = req.body;
            const user = await UserService.loginUser({ username, password });
            const token = jwt.sign(
                { id: user.id, username: user.username },
                process.env.JWT_SECRET,
                {
                    expiresIn: '1h',
                }
            );
            res.json({ token });
        } catch (error) {
            res.status(401).json({ error: error.message });
        }
    }
}
