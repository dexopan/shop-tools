import type { Request, Response } from 'express'
import { getAll, addToolToBasket, deleteToolFromBasket, deleteAllToolsFromBasket, removeToolFromBasket } from './basket.service'

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

	async removeToolFromBasket(req: Request, res: Response): Promise<Response> {
		try {
			const { toolId, userId } = req.body
			const removeTool = await removeToolFromBasket(toolId, userId)
			return res.status(200).json(removeTool)
		} catch (error) {
			return res.status(500).json({ error: error.message })
		}
	}

	async deleteToolFromBasket(req: Request, res: Response): Promise<Response> {
		try {
			const { toolId, userId } = req.body
			const deleteTool = await deleteToolFromBasket(toolId, userId)
			return res.status(200).json(deleteTool)
		} catch (error) {
			return res.status(500).json({ error: error.message })
		}
	}

	async deleteAllToolsFromBasket(req: Request, res: Response): Promise<Response> {
		try {
			const { userId } = req.body
			const deleteAllTools = await deleteAllToolsFromBasket(userId)
			return res.status(200).json(deleteAllTools)
		} catch (error) {
			return res.status(500).json({ error: error.message })
		}
	}

}


