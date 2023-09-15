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
		include: {
			tools: {
				include: { tool: true }
			}
		}
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
				quantity: 1,
				totalPrice: tool.priceOne,
				tools: {
					create: [{
						count: 1,
						price: tool.priceOne,
						tool: {
							connect: {
								id: tool.id
							}
						}
					}],
				}
			},
			include: {
				tools: {
					include: { tool: true }
				}
			}
		})
		return newBasket
	}

	const toolsOnBaskets = await prisma.toolsOnBaskets.findUnique({
		where: {
			toolId_basketId: {
				toolId: tool.id,
				basketId: basket.id
			}
		}
	})

	if (!toolsOnBaskets) {
		const addFirstToolToBasket = await prisma.basket.update({
			where: {
				userId
			},
			data: {
				quantity: basket.quantity + 1,
				totalPrice: basket.totalPrice + tool.priceOne,
				tools: {
					create: [{
						count: 1,
						price: tool.priceOne,
						tool: {
							connect: {
								id: toolId
							}
						}
					}]
				}
			},
			include: {
				tools: {
					include: { tool: true }
				}
			}
		})
		return addFirstToolToBasket
	}

	const addToolToBasket = await prisma.basket.update({
		where: {
			userId
		},
		data: {
			quantity: basket.quantity + 1,
			totalPrice: basket.totalPrice + tool.priceOne,
			tools: {
				update: [{
					where: {
						toolId_basketId: {
							toolId: tool.id,
							basketId: basket.id
						}
					},
					data: {
						count: toolsOnBaskets.count + 1,
						price: toolsOnBaskets.price + tool.priceOne,
						tool: {
							connect: {
								id: toolId
							}
						}
					},
				}]
			}
		},
		include: {
			tools: {
				include: { tool: true }
			}
		}
	})
	return addToolToBasket
}



export async function deleteToolFromBasket(toolId: string, userId: string): Promise<Basket> {

	const basket = await prisma.basket.findUnique({
		where: {
			userId
		}
	})

	const toolsOnBaskets = await prisma.toolsOnBaskets.findUnique({
		where: {
			toolId_basketId: {
				toolId,
				basketId: basket.id
			}
		}, include: {
			tool: true
		}
	})

	if (!toolsOnBaskets) {
		return basket
	}

	const toolInBasketDelete = await prisma.toolsOnBaskets.delete({
		where: {
			toolId_basketId: {
				toolId,
				basketId: basket.id
			}
		},
	})

	const basketUpdate = await prisma.basket.update({
		where: {
			userId
		},
		data: {
			quantity: basket.quantity - toolInBasketDelete.count,
			totalPrice: basket.totalPrice - toolInBasketDelete.price,
		},
		include: {
			tools: {
				include: { tool: true }
			}
		}
	})

	return basketUpdate
}



export async function deleteAllToolsFromBasket(userId: string): Promise<Basket> {

	const basket = await prisma.basket.findUnique({
		where: {
			userId
		}
	})

	await prisma.toolsOnBaskets.deleteMany({
		where: {
			basketId: basket.id
		},
	})

	const basketUpdate = await prisma.basket.update({
		where: {
			userId
		},
		data: {
			quantity: 0,
			totalPrice: 0,
			tools: {
				deleteMany: {}
			}
		},
		include: {
			tools: {
				include: { tool: true }
			}
		}
	})
	return basketUpdate
}




