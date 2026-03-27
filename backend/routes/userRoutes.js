import express from "express";
import { checkAuth,
         Login,
         signup,
         updateProfile } from "../controllers/userControllers.js";
import { protectRoutes } from "../middlewares/auth.js";

const userRouter = express.Router();

userRouter.post("/signup", signup);
userRouter.post("/login", Login);
userRouter.post("/update-profile", protectRoutes , updateProfile);
userRouter.get("/check", protectRoutes , checkAuth);

export default userRouter;