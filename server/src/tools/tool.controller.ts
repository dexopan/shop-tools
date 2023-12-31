import type { Request, Response } from 'express'
import {
	getAllTools, paginateAndFilterTools,
	bestsellersTools, newTools,
	findToolById, findToolByName, searchByString,
} from './tool.service'


export class ToolController {

	async getAllTools(req: Request, res: Response): Promise<Response> {
		try {
			const { sort, priceFrom, priceTo, manufacturers, typesTools } = req.query
			const tools = await getAllTools({
				sort: String(sort),
				priceFrom: String(priceFrom),
				priceTo: String(priceTo),
				manufacturers: String(manufacturers),
				typesTools: String(typesTools),
			})
			return res.status(200).json(tools)
		} catch (error) {
			return res.status(500).json({ error: error.message })
		}
	}

	async paginateAndFilterTools(req: Request, res: Response): Promise<Response> {
		try {
			const { limit, offset, sort, priceFrom, priceTo, manufacturers, typesTools } = req.query
			const tools = await paginateAndFilterTools({
				limit: Number(limit),
				offset: Number(offset),
				sort: String(sort),
				priceFrom: String(priceFrom),
				priceTo: String(priceTo),
				manufacturers: String(manufacturers),
				typesTools: String(typesTools),
			})
			return res.status(200).json(tools)
		} catch (error) {
			return res.status(500).json({ error: error.message })
		}
	}

	async bestsellersTools(req: Request, res: Response): Promise<Response> {
		const tools = await bestsellersTools()
		return res.status(200).json(tools)
	}

	async newTools(req: Request, res: Response): Promise<Response> {
		const tools = await newTools()
		return res.status(200).json(tools)
	}

	async findToolById(req: Request, res: Response): Promise<Response> {
		const { id } = req.params
		const tool = await findToolById(id)
		return res.status(200).json(tool)
	}

	async findToolByName(req: Request, res: Response): Promise<Response> {
		try {
			const { name } = req.body
			const tool = await findToolByName(name)
			return res.status(200).json(tool)
		} catch (error) {
			return res.status(500).json({ error: error.message })
		}
	}

	async searchByString(req: Request, res: Response): Promise<Response> {
		try {
			const { search } = req.body
			const tool = await searchByString(search)
			return res.status(200).json(tool)
		} catch (error) {
			return res.status(500).json({ error: error.message })
		}
	}
}
