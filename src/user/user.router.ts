import express from 'express';
import { UserService } from './user.service';
import authMiddleware from '../middleware/auth';

const router = express.Router();

const userService = new UserService();

router.post('/register', userService.createUser);
router.post('/login', userService.login);
router.get('/checkAuth', authMiddleware, userService.checkAuth);

export default router;