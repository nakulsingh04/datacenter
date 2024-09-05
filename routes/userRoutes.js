import express from "express"
import { middleware } from "../middleware/middleware.js";
import userController from "../controllers/userController.js";
import { JoiValidationFun } from "../validations/validationFun.js";
import userValidations from "../validations/userValidations.js";
let userRouter = express.Router();
userRouter.get('/getUsers-details',middleware,userController.getUsers);
userRouter.get('/details',middleware,userController.getUserDetail);
userRouter.post('/login',JoiValidationFun(userValidations.userLoginValiSchema),userController.login);
userRouter.post('/registration',JoiValidationFun(userValidations.userRegistrationValiSchema),userController.registartion);


export default userRouter
