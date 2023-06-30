import { Router } from "express"
import userRouter from "./user/user.router";


const mainRouter = Router();

mainRouter.use('/user', userRouter);


export default mainRouter;