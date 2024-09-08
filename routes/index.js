import express from "express"
import userRouters from "./userRoutes.js";

const  router = express.Router();

router.use('/user', userRouters);

export default router;