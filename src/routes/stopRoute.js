import express from "express"
import{addstop, liststops,removestops} from '../../controller/stopsController.js'

const stopRouter = express.Router();


stopRouter.post("/addstop",addstop)
stopRouter.get("/liststop",liststops)
stopRouter.post("/removestop",removestops)


export default stopRouter;