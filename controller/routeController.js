import routeModel from "../models/routeModel.js";



// add route

const addroute = async (req,res)=> {

    const route = new routeModel({
        RouteName: req.body.RouteName,
       
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
// const listRouteNames = async (req, res) => {
//     try {
//         const routes = await routeModel.find({}, 'RouteName');
//         const routeNames = routes.map(route => route.RouteName); // Extract RouteName from each route
//         res.json({routeNames });
//     } catch (error) {
//         console.log(error);
//         res.json({ success: false, message: "Error" });
//     }
// };
const listRouteNames = async (req, res) => {
    try {
        const routes = await routeModel.find({}, 'RouteName'); // Only get RouteName field
        const routeNames = routes.map(route => route.RouteName);
        res.json(routeNames); // Return only the array of route names
    } catch (error) {
        console.log(error);
        res.status(500).json({ success: false, message: "Error" });
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