import prisma from "../utils/db.server";
import type { Request, Response } from 'express';
import { hash, compare } from "bcrypt";
import jwt from 'jsonwebtoken'

type User = {
	id: string;
	username: string;
	email: string;
};

const generateJwt = (id: string, username: string) => {
	return jwt.sign({ id, username }, process.env.SECRET_KEY, { expiresIn: '24h' })
}

export class UserController {

	async createUser(req: Request, res: Response): Promise<Response> {
		try {
			const { username, email, password } = req.body;
			const userExistsByUserName = await prisma.user.findUnique({
				where: { username },
			});

			const userExistsByEmail = await prisma.user.findUnique({
				where: { email },
			});

			if (userExistsByEmail) {
				return res.status(401).json({ message: 'Email already exists' })
			}

			if (userExistsByUserName) {
				return res.status(401).json({ message: 'Username already exists' })
			}

			const hashedPassword = await hash(password, 5);
			const user = await prisma.user.create({
				data: {
					username,
					email,
					password: hashedPassword,
					createdAt: new Date(),
					updatedAt: new Date(),
				}
			})

			return res.status(201).json({ message: "User created successfully", user });
		}
		catch (err) {
			return res.status(500).json({ message: err.message });
		}
	}

	async login(req: Request, res: Response): Promise<Response> {
		try {
			const { username, password } = req.body;
			const user = await prisma.user.findUnique({
				where: {
					username,
				},
			});

			if (!user) {
				return res.status(400).json({ message: 'Invalid username or password' })
			}

			const isPasswordValid = await compare(password, user.password);

			if (!isPasswordValid) {
				return res.status(400).json({ message: 'Invalid username or password' })
			}
			else {
				const token = generateJwt(user.id, user.username)

				const result = {
					id: user.id,
					username: user.username,
					email: user.email,
					token
				};

				return res.status(200).json({ message: "User logged in successfully", result });
			}
		} catch (error) {
			res.status(500).json({ message: error.message });
		}
	}

	async checkAuth(req: Request, res: Response): Promise<Response> {
		try {
			const token = req.headers.authorization?.split(' ')[1]
			if (token) {
				const decoded = jwt.verify(token, process.env.SECRET_KEY)
				const user = await prisma.user.findUnique({
					where: {
						username: (decoded as any).username,
					},
				});
				const result = {
					id: user.id,
					username: user.username,
					email: user.email,
				};
				return res.status(200).json({ message: 'Authorized', result })
			}
		} catch (error) {
			return res.status(500).json({ message: error.message })
		}
	}

	async logout(req: Request, res: Response): Promise<Response> {
		try {
			return res.status(200).json({ message: 'Logout successful' })
		} catch (error) {
			return res.status(500).json({ message: error.message })
		}
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