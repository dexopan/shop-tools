import prisma from '../utils/db.server'
import { Basket, User } from '@prisma/client'
import { Tool } from '@prisma/client'




export async function getAll(username: string): Promise<Basket[]> {
	const user = await prisma.user.findUnique({
		where: {
			username
		}
	})
	const basket = await prisma.basket.findMany({
		where: {
			userId: user.id
		},
		include: { tools: true }
	})
	return basket
}

export async function addToolToBasket(toolId: string, userId: string): Promise<any> {

	const tool = await prisma.tool.findUnique({
		where: {
			id: toolId
		}
	})
	const basket = await prisma.toolsToBaskets.create({
		data: {
			tool: {
				connect: {
					id: toolId
				}
			},
			basket: {
				connect: {
					userId
				}
			}
		}
	}
	)
	return basket
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

// export async function deleteToolFromBasket(idTool: string, idBasket: string): Promise<Basket> {
// 	const tool = await prisma.tool.findUnique({ where: { id: idTool } })
// 	const basket = await prisma.basket.update({
// 		where: { id: idBasket },
// 		data: {
// 			tools: {
// 				disconnect: {
// 					id: idTool
// 				}
// 			}
// 		}
// 	})

// 	return basket
// }

export async function deleteAllToolsFromBasket(id: string): Promise<Basket> {
	const basket = await prisma.basket.delete({
		where: { userId: id }
	})
	return basket
}




