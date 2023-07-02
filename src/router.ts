import { Router } from "express"
import userRouter from "./users/user.router";
import toolRouter from "./tools/tool.router";


const mainRouter = Router();

mainRouter.use('/user', userRouter);
mainRouter.use('/tool', toolRouter);


export default mainRouter;