import express from "express"
import { listschedule, liveschedule, livescheduleByRoute} from '../../controller/scheduleController.js'


const scheduleRouter = express.Router();

scheduleRouter.get("/l",listschedule)
scheduleRouter.get("/live-schedule",liveschedule)
scheduleRouter.get("/liveschedulebyroute",livescheduleByRoute)

export default scheduleRouter;