import express from "express";
import auth from "../../middleware/auth";
import permit from "../../middleware/permit";
import { cocktailAdminRouter } from "./coctails";

const adminRouter = express.Router();

adminRouter.use(auth, permit('admin'));

adminRouter.use('/coctails', cocktailAdminRouter);

export default adminRouter;