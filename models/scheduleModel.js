import mongoose from "mongoose";

const scheduleSchema = new mongoose.Schema({
    ScheduleID: {type:String,required:true},
    RouteID: {type:String,required:true},
    BusID: {type:String,required:true},
    Depaturetime: {type: TimeRanges, default: TimeRanges.now()},
    STATUS: {type: String, default: "On time"},
})

const scheduleModel = mongoose.models.schedule || mongoose.model("schedule",scheduleSchema)
export default scheduleModel;