import { Router } from "express"
import userRouter from "./users/user.router";
import toolRouter from "./tools/tool.router";
import basketRouter from "./basket/basket.router";



const mainRouter = Router();

mainRouter.use('/user', userRouter);
mainRouter.use('/tool', toolRouter);
mainRouter.use('/basket', basketRouter);


export default mainRouter;