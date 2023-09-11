import { Tool } from '@prisma/client';
import prisma from '../utils/db.server'

interface IQuery {
	limit: number;
	offset: number;
	sort: string;
	manufacturers: string | undefined;
	typesTools: string | undefined;
	priceFrom: string | undefined;
	priceTo: string | undefined;
}

interface IToolsFilter {
	manufacturer?: { in: string; } | undefined;
	type?: { in: any; } | undefined;
	priceOne?: { gte: number; lte: number; } | undefined;
}


export async function getAllTools(query: Partial<IQuery>): Promise<Tool[]> {
	const { sort, manufacturers, typesTools, priceFrom, priceTo } = query
	const filter = {} as Partial<IToolsFilter>
	if (priceFrom && priceTo) {
		filter.priceOne = {
			gte: Number(priceFrom) || 1000,
			lte: Number(priceTo) || 9000
		}
	}
	if (sort === 'cheap') {
		const tools = await prisma.tool.findMany({
			where: filter,
			orderBy: {
				priceOne: 'asc'
			}
		},
		)
		return tools
	}
	if (sort === 'expensive') {
		const tools = await prisma.tool.findMany({
			where: filter,
			orderBy: {
				priceOne: 'desc'
			}
		},
		)
		return tools
	}
	if (sort === 'popular') {
		const tools = await prisma.tool.findMany({
			where: filter,
			orderBy: {
				popularity: 'desc'
			}
		},
		)
		return tools
	}
	const tools = await prisma.tool.findMany({
		where: filter,
		orderBy: {
			priceOne: 'asc'
		}
	},
	)
	return tools
}

export async function paginateAndFilterTools(query: IQuery): Promise<Tool[]> {
	const { limit, offset, sort, manufacturers, typesTools, priceFrom, priceTo } = query
	const offsetCalc = offset * limit
	const filter = {} as Partial<IToolsFilter>

	if (priceFrom && priceTo) {
		filter.priceOne = {
			gte: Number(priceFrom) || 1000,
			lte: Number(priceTo) || 9000
		}
	}

	if (manufacturers) {
		filter.manufacturer = {
			in: JSON.parse(decodeURIComponent(manufacturers))
		}
	}

	if (typesTools) {
		filter.type = {
			in: JSON.parse(decodeURIComponent(typesTools))
		}
	}

	if (sort === 'cheap') {
		const tools = await prisma.tool.findMany({
			where: filter,
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
			where: filter,
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
			where: filter,
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
		where: filter,
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
