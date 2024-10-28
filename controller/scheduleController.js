import scheduleModel from "../models/scheduleModel.js";
import routeModel from "../models/routeModel.js";
import stopsModel from "../models/stopsModel.js";

const listschedule = async (req,res)=>{
    try {
        const schedule = await scheduleModel.find({});
        res.json({success:true, data: schedule})
    } catch (error) {
        console.log(error)
        res.json({success:false, message:"Error"})
    }
}

const liveschedule = async (req, res) => {
    try {
        // Fetch all schedules
        const schedules = await scheduleModel.find({});

        // Fetch all routes and stops to map names
        const routes = await routeModel.find({}, 'RouteID RouteName'); // Fetch RouteID and RouteName
        const stops = await stopsModel.find({}, 'stopId stopName'); // Fetch stopId and stopName

        // Create maps for quick lookup
        const routeMap = routes.reduce((map, route) => {
            map[route.RouteID] = route.RouteName;
            return map;
        }, {});

        const stopMap = stops.reduce((map, stop) => {
            map[stop.stopId] = stop.stopName;
            return map;
        }, {});

        // Get the current time from the server's device
        const now = new Date();
        const deviceTime = now.toTimeString().slice(0, 5);

        // Helper function to convert time strings (HH:MM) to minutes
        const timeToMinutes = (time) => {
            if (!time || !time.includes(':')) return null;
            const [hours, minutes] = time.split(':').map(Number);
            return hours * 60 + minutes;
        };

        // Convert the device's current time to minutes
        const deviceTimeInMinutes = timeToMinutes(deviceTime);

        // Filter schedules where the current time is before the stop's departure time
        const availableSchedules = schedules.flatMap(s => 
            s.stops
                .filter(stop => deviceTimeInMinutes < timeToMinutes(stop.departureTime))
                .map(stop => ({
                    routeName: routeMap[s.RouteID], // Look up route name using the map
                    stopName: stopMap[stop.stopId],  // Look up stop name using the map
                    departureTime: stop.departureTime
                }))
        );

        // Respond with the filtered schedules
        res.json(availableSchedules);
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: "Error fetching live schedules" });
    }
};

const livescheduleByRoute = async (req, res) => {
    try {
        // Extract RouteID from the request parameters (or body, if preferred)
        const { routeID } = req.params; // or use req.body.routeID if it's in the body

        // Fetch all schedules for the specified RouteID
        const schedules = await scheduleModel.find({ RouteID: routeID });

        // Check if schedules exist for the given route
        if (!schedules.length) {
            return res.json({ success: false, message: "No schedules found for the specified RouteID" });
        }

        // Fetch the specific route and stops to map names
        const route = await routeModel.findOne({ RouteID: routeID }, 'RouteID RouteName');
        const stops = await stopsModel.find({}, 'stopId stopName'); // Fetch all stops (or optimize based on need)

        // Create a stop map for quick lookup
        const stopMap = stops.reduce((map, stop) => {
            map[stop.stopId] = stop.stopName;
            return map;
        }, {});

        // Get the current time from the server's device
        const now = new Date();
        const deviceTime = now.toTimeString().slice(0, 5);

        // Helper function to convert time strings (HH:MM) to minutes
        const timeToMinutes = (time) => {
            const [hours, minutes] = time.split(':').map(Number);
            return hours * 60 + minutes;
        };

        // Convert the device's current time to minutes
        const deviceTimeInMinutes = timeToMinutes(deviceTime);

        // Filter schedules where the current time is before the stop's departure time
        const availableSchedules = schedules.flatMap(s => 
            s.stops
                .filter(stop => deviceTimeInMinutes < timeToMinutes(stop.departureTime))
                .map(stop => ({
                    routeName: route?.RouteName || "Unknown Route", // Access the route name or fallback
                    stopName: stopMap[stop.stopId],  // Access the stop name from the stop map
                    departureTime: stop.departureTime
                }))
        );

        // Respond with the filtered schedules
        res.json(availableSchedules );
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: "Error fetching live schedules for the specified RouteID" });
    }
};



export { listschedule, liveschedule, livescheduleByRoute };