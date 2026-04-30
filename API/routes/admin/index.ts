import express from "express";
import auth from "../../middleware/auth";
import permit from "../../middleware/permit";
import { cocktailAdminRouter } from "./cocktails";

const adminRouter = express.Router();

adminRouter.use(auth, permit('admin'));

adminRouter.use('/cocktails', cocktailAdminRouter);

export default adminRouter;