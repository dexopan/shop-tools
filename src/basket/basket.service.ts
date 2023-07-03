import prisma from '../utils/db.server'
import { Basket } from '@prisma/client'
import { Tool } from '@prisma/client'




export async function getAll(userId: string): Promise<Basket[]> {
	const basket = await prisma.basket.findMany({
		where: {
			userId
		}
	})
	return basket
}

export async function addToolToBasket(tools: Tool, username: string): Promise<Basket> {
	const user = await prisma.user.findUnique({ where: { username } })
	const tool = await prisma.tool.findUnique({ where: { id: tools.id } })
	const toolToBasket = await prisma.basket.create({
		data: {
			userId: user.id,
			manufacturer: tool.manufacturer,
			price: tool.price,
			name: tool.name,
			type: tool.type,
			image: tool.images[0],
			inStock: tool.inStock,
			totalPrice: tool.price,
		}
	})
	return toolToBasket
}

export async function updateCount(count: number, id: string): Promise<{ count: number }> {
	const updateCount = await prisma.basket.update({
		where: { id },
		data: {
			count
		},
		select: {
			count: true
		}
	})
	return updateCount
}

export async function totalPrice(totalPrice: number, id: string): Promise<{ totalPrice: number }> {
	const updateTotalPrice = await prisma.basket.update({
		where: { id },
		data: {
			totalPrice
		},
		select: {
			totalPrice: true
		}
	})
	return updateTotalPrice
}

export async function deleteToolFromBasket(idTool: string, idBasket: string): Promise<Basket> {
	const tool = await prisma.basket.findUnique({ where: { id: idTool } })
	const basket = await prisma.basket.update({
		where: { id: idBasket },
		data: {
			count: tool.count - 1,
			totalPrice: tool.totalPrice - tool.price,
			tools: {
				delete: {
					id: idTool
				}
			}
		}
	})

	return basket
}

export async function deleteAllToolsFromBasket(id: string): Promise<Basket> {
	const basket = await prisma.basket.delete({
		where: { userId: id }
	})
	return basket
}




