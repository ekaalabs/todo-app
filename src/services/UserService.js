import { UserModel } from '../models/UserModel.js';
import bcrypt from 'bcrypt';

export class UserService {
    static async createUser({ username, password, name, email }) {
        const hashedPassword = await bcrypt.hash(password, 10);
        return await UserModel.create({
            username,
            hashedPassword,
            name,
            email,
        });
    }

    static async loginUser({ username, password }) {
        const user = await UserModel.findByUsername(username);
        if (!user) {
            throw new Error('User not found');
        }
        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            throw new Error('Invalid password');
        }
        return user;
    }

    static async updateUserPassword(id, { password }) {
        const hashedPassword = await bcrypt.hash(password, 10);
        return await UserModel.updatePassword(id, { hashedPassword });
    }
}
