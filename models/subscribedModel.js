import mongoose from "mongoose";

const subscribeSchema = new mongoose.Schema({
    userID:{type:String,required:true},
    RouteID:{type:String,required:true},
})

const subscribeModel = mongoose.model("subscribe",subscribeSchema);

export default subscribeModel;