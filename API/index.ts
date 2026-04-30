import dotenv from "dotenv";
dotenv.config();
import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import config from "./config";
import cookieParser from "cookie-parser";
import userRouter from "./routes/user";
import {cocktailRouter} from "./routes/cocktails";
import adminRouter from "./routes/admin";

const app = express();
const port = 8001;

app.use(cookieParser());
app.use(express.json());
app.use(express.static(config.publicPath));
app.use(cors({
    origin: "http://localhost:5173",
    credentials: true,
}));

app.use("/users", userRouter);
app.use("/cocktails", cocktailRouter);
app.use("/admin", adminRouter);

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