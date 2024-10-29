import express from "express";
import { listsubs, subscribeUserToRoute, removeSubscription } from '../../controller/subscribedController.js';

const subRouter = express.Router();

subRouter.post("/addsub", subscribeUserToRoute);
subRouter.delete("/removesub", removeSubscription);
subRouter.get("/listsub", listsubs);

export default subRouter;
