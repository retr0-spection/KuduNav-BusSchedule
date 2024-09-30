import busModel from "../models/busModel.js";

// add route

const addbus = async (req,res)=> {

    const bus = new busModel({
        
    })

    try {
        await bus.save();
        res.json({
            success: true,
            message: "bus Added"
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
const listbuses = async (req,res)=>{
    try {
        const buses = await busModel.find({});
        res.json({success:true, data: buses})
    } catch (error) {
        console.log(error)
        res.json({success:false, message:"Error"})
    }
}

// remove routes
const removebuses = async (req,res) => {
    try {
        const bus = await busModel.findById(req.body.id);
        await busModel.findByIdAndDelete(req.body.id)
        res.json({success:true, message:"bus removed"})
    } catch (error) {
        console.log(error)
        res.json({success:false,message:"Error"})
    }
}

export {addbus,listbuses,removebuses};