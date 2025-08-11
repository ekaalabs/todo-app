import { UserModel } from '../models/UserModel.js';
import validator from 'validator';
import { UserService } from './UserService.js';

export class ProfileService {
    static async getProfile(userId) {
        if (!userId) {
            throw new Error('User ID is required');
        }
        const user = await UserModel.findById(userId);
        if (!user) {
            throw new Error('User not found');
        }
        return user;
    }

    static async updateProfile(userId, { username, name, email }) {
        if (!userId) {
            throw new Error('User ID is required');
        }
        if (!username || !name || !email) {
            throw new Error('All fields are required');
        }
        if (!validator.isEmail(email)) {
            throw new Error('Invalid email format');
        }
        if (username.length < 3 || username.length > 8) {
            throw new Error('Username must be between 3 and 8 characters');
        }
        if (name.length < 2 || name.length > 12) {
            throw new Error('Name must be between 2 and 12 characters');
        }
        const updated = await UserModel.update(userId, {
            username,
            name,
            email,
        });
        if (!updated) {
            throw new Error('User not found');
        }
        return updated;
    }

    static async updateProfilePassword(userId, { password }) {
        if (!userId) {
            throw new Error('User ID is required');
        }
        if (!password || password.length < 6 || password.length > 10) {
            throw new Error('Password must be between 6 and 10 characters');
        }
        const updated = await UserService.updateUserPassword(userId, {
            password,
        });
        if (!updated) {
            throw new Error('User not found');
        }
        return updated;
    }
}
