import express from 'express';
import type { Request, Response } from 'express';

import { UserService } from './user.service';


const router = express.Router();

const userService = new UserService();

router.post('/register', async (req: Request, res: Response) => {

	try {
		const { username, email, password } = req.body;
		const user = await userService.createUser({
			username,
			email,
			password,
			createdAt: new Date(),
			updatedAt: new Date(),
		});
		return res.status(201).json({ message: "User created successfully" });
	}
	catch (err) {
		return res.status(500).json({ message: "Internal server error" });
	}
});

export default router;