import prisma from '../utils/db.server'
import { Basket } from '@prisma/client'



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

export async function addToolToBasket(toolId: string, userId: string): Promise<Basket> {

	const tool = await prisma.tool.findUnique({
		where: {
			id: toolId
		}
	})

	const basket = await prisma.basket.findUnique({
		where: {
			userId
		}
	})

	if (!basket) {
		const newBasket = await prisma.basket.create({
			data: {
				userId,
				tools: {
					connect: [{
						id: toolId,
					}]
				},
				count: 1,
				totalPrice: tool.price
			}
		})

		await prisma.tool.update({
			where: {
				id: toolId
			},
			data: {
				inBasket: 1
			}
		})
		return newBasket
	}

	const addToolToBasket = await prisma.basket.update({
		where: {
			userId
		},
		data: {
			tools: {
				connect: [{
					id: toolId
				}]
			},
			count: basket.count + 1,
			totalPrice: basket.totalPrice + tool.price
		}
	})

	await prisma.tool.update({
		where: {
			id: toolId
		},
		data: {
			inBasket: tool.inBasket + 1
		}
	})


	return addToolToBasket
}

// export async function updateCount(count: number, userId: string): Promise<{ count: number }> {
// 	const updateCount = await prisma.basket.update({
// 		where: { userId },
// 		data: {
// 			count
// 		},
// 		select: {
// 			count: true
// 		}
// 	})
// 	return updateCount
// }

// export async function totalPrice(totalPrice: number, userId: string): Promise<{ totalPrice: number }> {
// 	const updateTotalPrice = await prisma.basket.update({
// 		where: { userId },
// 		data: {
// 			totalPrice
// 		},
// 		select: {
// 			totalPrice: true
// 		}
// 	})
// 	return updateTotalPrice
// }

export async function deleteToolFromBasket(toolId: string, userId: string): Promise<Basket> {

	const tool = await prisma.tool.findUnique({
		where: {
			id: toolId
		}
	})
	const basket = await prisma.basket.findUnique({
		where: {
			userId
		}
	})

	const basketUpdate = await prisma.basket.update({
		where: { userId },
		data: {
			tools: {
				disconnect: [{
					id: toolId
				}]
			},
			count: basket.count - 1,
			totalPrice: basket.totalPrice - tool.price
		}
	})

	await prisma.tool.update({
		where: {
			id: toolId
		},
		data: {
			inBasket: 0
		}
	})

	return basketUpdate
}

export async function deleteAllToolsFromBasket(userId: string): Promise<void> {

	const basket = await prisma.basket.findUnique({
		where: {
			userId
		}
	})
	if (!basket) {
		return
	}
	await prisma.basket.delete({
		where: { userId }
	})
}




