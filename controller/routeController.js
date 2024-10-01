import routeModel from "../models/routeModel.js";



// add route

const addroute = async (req,res)=> {

    const route = new routeModel({
        RouteName: req.body.RouteName,
        Details: req.body.Details
    })

    try {
        await route.save();
        res.json({
            success: true,
            message: "route Added"
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
const listroutes = async (req,res)=>{
    try {
        const routes = await routeModel.find({});
        res.json({success:true, data: routes})
    } catch (error) {
        console.log(error)
        res.json({success:false, message:"Error"})
    }
}

// List all RouteNames
const listRouteNames = async (req, res) => {
    try {
        const routes = await routeModel.find({});
        const routeNames = routes.map(route => route.RouteName); // Extract RouteName from each route
        res.json({ success: true, data: routeNames });
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: "Error" });
    }
};
// remove routes
const removeroutes = async (req,res) => {
    try {
        const route = await routeModel.findById(req.body.id);
        await routeModel.findByIdAndDelete(req.body.id)
        res.json({success:true, message:"Route removed"})
    } catch (error) {
        console.log(error)
        res.json({success:false,message:"Error"})
    }
}


export {addroute,listroutes,listRouteNames,removeroutes};