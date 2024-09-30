import express from "express"
import { addbus, listbuses,removebuses } from '../../controller/busController.js'


const busRouter = express.Router();


busRouter.post("/addbus",addbus)
busRouter.get("/listbuses",listbuses)
busRouter.post("/removebus",removebuses)


export default busRouter;