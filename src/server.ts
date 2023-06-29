import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';

dotenv.config();


const PORT = parseInt(process.env.PORT, 10) || 5000;

const app = express();

app.use(cors());
app.use(express.json());

const start = async () => {
	try {
		app.listen(PORT, () => {
			console.log(`Server listening on port ${PORT}`);
		});
	}
	catch (err) {
		console.log(err);
	}
};

start();










