import { PrismaClient } from "@prisma/client";

let prisma: PrismaClient

declare global {
	var __prisma: PrismaClient | undefined;
}

global.__prisma = global.__prisma || new PrismaClient();

prisma = global.__prisma || new PrismaClient();

export default prisma;
