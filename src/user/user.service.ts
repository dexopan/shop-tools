import prisma from "src/utils/db.server";
import { hash, compare } from "bcrypt";

type User = {
	id: string;
	username: string;
	email: string;
};

type CreateUserInput = {
	username: string;
	email: string;
	password: string;
	createdAt: Date;
	updatedAt: Date;
};

export class UserService {
	async createUser(data: CreateUserInput): Promise<User | { warningMessage: string }> {
		const userExistsByUserName = await prisma.user.findUnique({
			where: { username: data.username },
		});

		const userExistsByEmail = await prisma.user.findUnique({
			where: { email: data.email },
		});

		if (userExistsByUserName) {
			return { warningMessage: "Username already exists" };
		}

		if (userExistsByEmail) {
			return { warningMessage: "Email already exists" };
		}

		const hashedPassword = await hash(data.password, 5);
		const user = await prisma.user.create({
			data: {
				username: data.username,
				email: data.email,
				password: hashedPassword,
			}
		})
		return user;
	}

	async getUserById(id: string): Promise<User> {
		const user = await prisma.user.findUnique({
			where: {
				id,
			},
			select: {
				id: true,
				username: true,
				email: true,
			},
		});
		return user;
	}

	async getUserByEmail(email: string): Promise<User> {
		const user = await prisma.user.findUnique({
			where: {
				email,
			},
			select: {
				id: true,
				username: true,
				email: true,
			},
		});
		return user;
	}

	async getUserByUsername(username: string): Promise<User> {
		const user = await prisma.user.findUnique({
			where: {
				username,
			},
			select: {
				id: true,
				username: true,
				email: true,
			},
		});
		return user;
	}

}
