import express from "express"
import { addroute, listroutes,removeroutes } from '../../controller/routeController.js'


const routesRouter = express.Router();


routesRouter.post("/addroute",addroute)
routesRouter.get("/listroutes",listroutes)
routesRouter.post("/removeroute",removeroutes)


export default routesRouter;