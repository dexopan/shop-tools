import express from 'express';
import { UserController } from './user.controller';
import authMiddleware from '../middleware/auth';

const router = express.Router();

const userController = new UserController();

router.post('/register', userController.createUser);
router.post('/login', userController.login);
router.get('/checkAuth', authMiddleware, userController.checkAuth);

export default router;