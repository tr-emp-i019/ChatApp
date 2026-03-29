import express from "express";
import "dotenv/config";
import cors from "cors";
import http from "http";
import { connectDB } from "./lib/db.js";
import userRouter from "./routes/userRoutes.js";
import messageRouter from "./routes/messageRoutes.js";
import { Server } from "socket.io";

//Create express app and http

const app = express();
const server = http.createServer(app)


//Initialize Socket.io Server
export const io = new Server(server, {
    cors: {origin: "*"}
})

//Store online users
export const userSocketMap = {};  // { userId: socketId }


//Socket.io connection handler
io.on("connection", (socket) =>{
    const userId = socket.handshake.query.userId;
    console.log("User Connected", userId);
    
    if (userId) userSocketMap[userId] = socket.id;

    //Emit online users to all connected clients
    io.emit("getOnlineUsers", Object.keys(userSocketMap));

    socket.on("disconnect", () => {
        console.log("User Disconnected", userId);
        delete userSocketMap[userId];
        io.emit("getOnlineUsers", Object.keys(userSocketMap))
    })

})




//Middleware setup
app.use(express.json({limit: "10mb"}));
app.use(cors());

//Routes setup
app.use("/api/status", (req, res) => res.send("Server is live"))
app.use("/api/auth", userRouter);
app.use("/api/messages", messageRouter)

//connect to mongoDB
await connectDB()

if (process.env.NODE_ENV !== "production") {
    const PORT = process.env.PORT || 5001;
    server.listen(PORT, () => console.log(`server is listening on port ${PORT}`));
}

// export server for vercel
export default server;