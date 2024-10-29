import express from "express"
import { addroute, listroutes,listRouteNames,removeroutes, listdetails,getAllRoutes } from '../../controller/routeController.js'


const routesRouter = express.Router();


routesRouter.post("/addroute",addroute)
routesRouter.get("/listroutes",listroutes)
routesRouter.get("/details",listdetails)
routesRouter.get("/allroutes",getAllRoutes)
routesRouter.get("/routenames",listRouteNames)
routesRouter.post("/removeroute",removeroutes)


export default routesRouter;