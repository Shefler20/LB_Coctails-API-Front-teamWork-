import dotenv from "dotenv";
dotenv.config();
import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import config from "./config";

const app = express();
const port = 8000;

app.use(express.json());
app.use(cors({
    origin: "http://localhost:5173",
    credentials: true,
}));

const run = async () => {
    await mongoose.connect(config.db);
    app.listen(port, () => {
        console.log(`Server started on port ${port}`);
    });
    process.on("exit", () => {
        mongoose.disconnect();
    })
};

run().catch((err) => {console.log(err)});