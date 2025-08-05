import express from "express";
import "dotenv/config";
import cors from "cors";
import http from "http";
import { connectDB } from "./lib/db.js";

//Create express app and http

const app = express();
const server = http.createServer(app)

//Middleware setup
app.use(express.json({limit: "4mb"}));
app.use(cors());

//Routes
app.use("/api/status", (req, res) => res.send("Server is live"))

//connect to mongoDB
await connectDB()

const PORT = process.env.PORT || 5000;
server.listen(PORT, () => console.log(`server is listening on port ${PORT}`));