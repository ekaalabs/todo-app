import { ProfileService } from '../services/ProfileService.js';

export class ProfileController {
    static async getProfile(req, res) {
        try {
            const userId = req.user.id;
            const profile = await ProfileService.getProfile(userId);
            res.status(200).json({ data: profile });
        } catch (error) {
            res.status(400).json({ error: error.message });
        }
    }

    static async updateProfile(req, res) {
        try {
            const userId = req.user.id;
            const { username, name, email } = req.body;
            const updated = await ProfileService.updateProfile(userId, {
                username,
                name,
                email,
            });
            res.status(200).json({
                message: 'Profile updated successfully',
                data: updated,
            });
        } catch (error) {
            res.status(400).json({ error: error.message });
        }
    }

    static async updateProfilePassword(req, res) {
        try {
            const userId = req.user.id;
            const { password } = req.body;
            const updated = await ProfileService.updateProfilePassword(userId, {
                password,
            });
            res.status(200).json({
                message: 'Password updated successfully',
                data: updated,
            });
        } catch (error) {
            res.status(400).json({ error: error.message });
        }
    }
}
