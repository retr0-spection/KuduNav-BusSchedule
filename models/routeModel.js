import mongoose from "mongoose";

const routesSchema = new mongoose.Schema({
    RouteID:{type:String,required:true},
    RouteName:{type:String,required:true},
    Details:{type:String, require:true}
})

const routeModel = mongoose.models.route || mongoose.model("routes",routesSchema);

export default routeModel;