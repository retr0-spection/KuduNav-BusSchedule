import stopModel from "../models/stopsModel.js";

// add bus

const addstop = async (req,res)=> {

    const stop = new stopModel({
        
    })

    try {
        await stop.save();
        res.json({
            success: true,
            message: "stop Added"
        })
    } catch (error) {
        console.log(error)
        res.json({
            success: false,
            message:"Error"
        })
    }
}

// all products list
const liststops = async (req,res)=>{
    try {
        const stops = await stopModel.find({});
        res.json({success:true, data: buses})
    } catch (error) {
        console.log(error)
        res.json({success:false, message:"Error"})
    }
}

// remove routes
const removestops = async (req,res) => {
    try {
        const stop = await stopModel.findById(req.body.id);
        await stopModel.findByIdAndDelete(req.body.id)
        res.json({success:true, message:"bus removed"})
    } catch (error) {
        console.log(error)
        res.json({success:false,message:"Error"})
    }
}

export {addstop,liststops,removestops};