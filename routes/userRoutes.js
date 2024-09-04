import express from "express"
import { middleware } from "../middleware/middleware.js";
import userController from "../controllers/userController.js";
import { JoiValidationFun } from "../validations/validationFun.js";
import userValidations from "../validations/userValidations.js";
let userRouter = express.Router();
userRouter.get('/login',middleware,userController.login);
userRouter.get('/getUsers-details',middleware,userController.getUsers);
userRouter.post('/registration',JoiValidationFun(userValidations.userValidationSchema),middleware,userController.registartion);


export default userRouter
