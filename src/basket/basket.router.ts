import express from 'express';
import { BasketController } from './basket.controller';

const router = express.Router();

const basketController = new BasketController();

router.get('/:username', basketController.getAll);
router.post('/', basketController.addToolToBasket);


export default router;