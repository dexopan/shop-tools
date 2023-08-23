import { Tool } from '@prisma/client';
import prisma from '../utils/db.server'

interface IQuery {
	limit: number;
	offset: number;
	sort: string;
}

export async function getAllTools(): Promise<Tool[]> {
	const tools = await prisma.tool.findMany();
	return tools;
}

export async function paginateAndFilterTools(query: IQuery): Promise<Tool[]> {
	const { limit, offset, sort } = query
	const offsetCalc = offset * limit
	if (sort === 'cheap') {
		const tools = await prisma.tool.findMany({
			take: limit,
			skip: offsetCalc,
			orderBy: {
				priceOne: 'asc'
			}
		},
		)
		return tools
	}
	if (sort === 'expensive') {
		const tools = await prisma.tool.findMany({
			take: limit,
			skip: offsetCalc,
			orderBy: {
				priceOne: 'desc'
			}
		},
		)
		return tools
	}
	if (sort === 'popular') {
		const tools = await prisma.tool.findMany({
			take: limit,
			skip: offsetCalc,
			orderBy: {
				popularity: 'desc'
			}
		},
		)
		return tools
	}
	const tools = await prisma.tool.findMany({
		take: limit,
		skip: offsetCalc,
		orderBy: {
			priceOne: 'asc'
		}
	},
	)
	return tools
}

export async function bestsellersTools(): Promise<Tool[]> {
	const tools = await prisma.tool.findMany({
		where: {
			bestseller: true
		}
	})
	return tools
}

export async function newTools(): Promise<Tool[]> {
	const tools = await prisma.tool.findMany({
		where: {
			new: true
		}
	})
	return tools
}

export async function findToolById(id: string): Promise<Tool | null> {
	const tool = await prisma.tool.findUnique({
		where: {
			id,
		},
	});
	return tool;
}

export async function findToolByName(str: string): Promise<Tool[] | null> {
	const tool = await prisma.tool.findMany({
		where: {
			name: str
		},
	});
	if (!tool) {
		return null
	}
	return tool;
}

export async function searchByString(str: string): Promise<Tool[] | null> {
	const tool = await prisma.tool.findMany({
		where: {
			name: {
				contains: str,
				mode: 'insensitive',
			},
		},
		take: 20,
	});
	return tool;
}
