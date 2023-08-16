import jwt from 'jsonwebtoken'
import type { Request, Response, NextFunction } from 'express';

export default function (req: Request, res: Response, next: NextFunction) {
	if (req.method === 'OPTIONS') {
		next()
	}
	try {
		const token = req.headers.authorization.split(' ')[1]
		if (token) {
			const decoded = jwt.verify(token, process.env.SECRET_KEY)
			req.body = decoded
			next()
		}
	}
	catch (error) {
		res.status(401).json({ message: 'Not authorized' })
	}
}