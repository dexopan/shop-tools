import type { Request, Response } from 'express'
import { getAll, addToolToBasket, deleteAllToolsFromBasket } from './basket.service'
import { Tool } from '@prisma/client'

export class BasketController {
	async getAll(req: Request, res: Response): Promise<Response> {
		try {
			const { username } = req.params
			const basket = await getAll(username)
			return res.status(200).json(basket)
		} catch (error) {
			return res.status(500).json({ error: error.message })
		}
	}

	async addToolToBasket(req: Request, res: Response): Promise<Response> {
		try {
			const { toolId, userId } = req.body
			const toolToBasket = await addToolToBasket(toolId, userId)
			return res.status(200).json(toolToBasket)
		} catch (error) {
			return res.status(500).json({ error: error.message })
		}
	}

}


