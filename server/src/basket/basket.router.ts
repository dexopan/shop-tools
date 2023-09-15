import express from 'express';
import { BasketController } from './basket.controller';
import authMiddleware from '../middleware/auth';

const router = express.Router();

const basketController = new BasketController();

router.get('/:username', authMiddleware, basketController.getAll);
router.post('/add', basketController.addToolToBasket);
router.delete('/delete', basketController.deleteToolFromBasket);
router.delete('/delete/all', basketController.deleteAllToolsFromBasket);


export default router;