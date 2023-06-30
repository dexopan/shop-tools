import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import router from './router';


dotenv.config();


const PORT = parseInt(process.env.PORT, 10) || 5000;

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/api', router)


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










