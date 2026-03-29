import express from "express"
import { protectRoutes } from "../middlewares/auth.js";
import {getMessages, getUsersforSidebar, markMessageAsSeen, sendMessage} from "../controllers/messageControllers.js"

const messageRouter = express.Router();

messageRouter.get("/users", protectRoutes, getUsersforSidebar);
messageRouter.get("/:id", protectRoutes, getMessages);
messageRouter.put("/mark/:id", protectRoutes, markMessageAsSeen);
messageRouter.post("/send/:id", protectRoutes, sendMessage);

export default messageRouter;