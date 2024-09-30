import mongoose from "mongoose";

const coordinatesSchema = new Schema({
    latitude: {
      type: Number,
      required: true
    },
    longitude: {
      type: Number,
      required: true
    }
  });
const stopsSchema = new mongoose.Schema({
    stopID: {type:String,required:true},
    stopName: {type:String,required:true},
    coordinates: {type: coordinatesSchema,
        required: true
    }
})

const stopsModel = mongoose.models.bus || mongoose.model("stop",stopsSchema)
export default stopsModel;