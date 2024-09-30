import express from "express"
import {listsubs} from '../../controller/subscribedController.js'


const subRouter = express.Router();


//subRouter.post("/addsub",subscribeUserToRoute)
subRouter.get("/listsub",listsubs)



export default subRouter;