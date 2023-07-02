import express from 'express';
import { ToolController } from './tool.controller';
import authMiddleware from '../middleware/auth';

const router = express.Router();

const toolController = new ToolController();

router.get('/', authMiddleware, toolController.paginateAndFilterTools);
router.get('/bestsellers', toolController.bestsellersTools);
router.get('/new', toolController.newTools);
router.get('/search/:id', toolController.findToolById);
router.post('/name', toolController.findToolByName);
router.post('/search', toolController.searchByString);

export default router;
