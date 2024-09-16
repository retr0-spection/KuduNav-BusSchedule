import express from "express";

const router = express.Router();


let users = [
    {userId: "user1", deviceToken: null, deviceType: null}
];
let schedules = [
    { scheduleId: "SCH001",routeId: "1A", routename: "AMIC Deck to WEC",stopId:"S001"  ,busId: "Bus_101", departureTime: "2024-09-11T14:35:00", status: "On Time" }
]

let routes = [
    {routeId: "R001", routeName:"Full Curcuit"},
    {routeId: "R002", routeName:"Reverse Curcuit"},
    { routeId: "R003",routeName: "Wits Juction to Education Campus"}
]
let schedule = [
      {
        scheduleId: "SCH001",
        routeId: "R001",
        routeName: "Full circuit",
        stops: [
          {
            stopId: "S001",
            stopName: "AMIC",
            arrivalTime: "08:00",
            departureTime: "08:05",
            coordinates: {
              latitude: -26.1924,
              longitude: 28.0306
            }
          },
          {
            stopId: "S002",
            stopName: "knockando",
            arrivalTime: "08:30",
            departureTime: "08:35",
            coordinates: {
              latitude: -26.1932,
              longitude: 28.0320
            }
          }
        ],
        busInfo: {
          busId: "BUS001",
          capacity: 40,
        }
      },
      {
        scheduleId: "SCH002",
        routeId: "R002",
        routeName: "Reverse circuit",
        stops: [
          {
            stopId: "S001",
            stopName: "knockando",
            arrivalTime: "09:00",
            departureTime: "09:05",
            coordinates: {
              latitude: -26.1924,
              longitude: 28.0306
            }
          },
          {
            stopId: "S002",
            stopName: "AMIC",
            arrivalTime: "09:15",
            departureTime: "09:20",
            coordinates: {
              latitude: -26.1932,
              longitude: 28.0320
            }
          }
        ],
        busInfo: {
          busId: "BUS002",
          capacity: 20,
        }
      },
      {
        scheduleId: "SCH001",
        routeId: "R003",
        routeName: "Wits Juction to Education Campuse",
        stops: [
          {
            stopId: "S001",
            stopName: "wits Junction",
            arrivalTime: "10:00",
            departureTime: "10:05",
            coordinates: {
              latitude: -26.1924,
              longitude: 28.0306
            }
          },
          {
            stopId: "S002",
            stopName: "education campus",
            arrivalTime: "10.:15",
            departureTime: "10:20",
            coordinates: {
              latitude: -26.1932,
              longitude: 28.0320
            }
          }
        ],
        busInfo: {
          busId: "BUS003",
          capacity: 30,
        }
      }
    ]
    
let buses = [
    {busId: "B02", capacity: 20}
]
let stops = [
    {stopId: "S001", stopname: "AMIC Deck", arrivalTime: "11:30", departureTime: "12:30", coordinates: {latitude:-26.1932, longitude: 28.0320 }}
]

let subscribedusers = [
    {userId: "user1", routeId: "R001", routename: "Full Circuit", stopId: "S001", stopname: "AMIC Deck", reminder: ["bus leaving in 5"] }
]

//table for users with sub
let events = [
    {eventId: "a121", starttime: "2024-09-12T10:00", endtime: "2024-09-12T01:00"}
]
// Get the live schedule for all routes
router.get("/schedule", (req, res) => {
    if (schedule.length > 0) {
        res.status(200).json(schedule);
    } else {
        res.status(404).json({ message: "No schedules available" });
    }
});

router.get("/routes", (req, res) => {
    if (routes.length > 0) {
        res.status(200).json(routes);
    } else {
        res.status(404).json({ message: "No schedules available" });
    }
});

router.get("/routesnames", (req, res) => {
    // Assuming 'routes' is an array of route objects with a property 'routeName'
    const routesnames = routes.map(route => route.routeName);

    if (routesnames.length > 0) {
        res.status(200).json(routesnames);
    } else {
        res.status(404).json({ message: "No route names available" });
    }
});
router.get('/liveschedule', (req, res) => {
    // Get the time from query parameters (e.g., ?time=08:10)
    const userTime = req.query.time;

    // Helper function to convert time strings (HH:MM) to minutes
    const timeToMinutes = (time) => {
        const [hours, minutes] = time.split(':').map(Number);
        return hours * 60 + minutes;
    };

    // Convert user's time to minutes
    const userTimeInMinutes = timeToMinutes(userTime);

    // Find schedules where user's time is before the stop's departure time
    const availableSchedules = schedule.flatMap(s => 
        s.stops
            .filter(stop => userTimeInMinutes < timeToMinutes(stop.departureTime))
            .map(stop => ({
                routeName: s.routeName,
                stopName: stop.stopName,
                departureTime: stop.departureTime
            }))
    );

    // If we found matching schedules, return them; otherwise, return a 404
    if (availableSchedules.length > 0) {
        res.status(200).json(availableSchedules);
    } else {
        res.status(404).json({ message: "No available schedules for the given time" });
    }
});

// Get the live schedule for a specific route
router.get('/live-scheduleroute', (req, res) => {
    // Get the routeId or routeName from query parameters (e.g., ?routeId=R001 or ?routeName=Full%20circuit)
    const routeId = req.query.routeId;
    const routeName = req.query.routeName;

    // Find the schedule for the specific route by routeId or routeName
    const routeSchedule = schedule.find(s => 
        (routeId && s.routeId === routeId) || 
        (routeName && s.routeName.toLowerCase() === routeName.toLowerCase())
    );

    if (routeSchedule) {
        // Return the full schedule for the found route
        res.status(200).json(routeSchedule);
    } else {
        // Return 404 if the route is not found
        res.status(404).json({ message: "Route not found" });
    }
});
// router.get("/schedule/:routeId", (req, res) => {
//     const { routeId } = req.params;
//     const routeSchedule = schedules.filter(schedule => schedules.routeId == routeId);

//     if (routeSchedule.length > 0) {
//         res.status(200).json(routeSchedule);
//     } else {
//         res.status(404).json({ message: "No schedules found for this route" });
//     }
// });


// Subscribe to a bus route for live schedule updates
router.post("/users/:userId/subscribe", (req, res) => {
    const { userId } = req.params;
    const { routeId } = req.body;

    const user = users.find(user => user.userId == userId);

    if (user) {
        user.subscribedRoutes.push(routeId);
        res.status(200).json({ message: `Subscribed to route ${routeId} successfully` });
    } else {
        res.status(404).json({ message: "User not found" });
    }
});

// Notify users of schedule changes due to events
router.post("/notifications/event", (req, res) => {
    const { eventId, message, affectedRoutes } = req.body;

    // Find all users subscribed to affected routes
    const affectedUsers = users.filter(user => user.subscribedRoutes.some(route => affectedRoutes.includes(route)));

    affectedUsers.forEach(user => {
        const newNotification = {
            id: notifications.length + 1,
            userId: user.userId,
            message: `${message} affecting routes: ${affectedRoutes.join(", ")}`,
            type: "event",
            status: 'scheduled',
            scheduleTime: null,
            createdAt: new Date().toISOString()
        };

        notifications.push(newNotification);
    });

    res.status(200).json({ message: "Event notifications sent to affected users", affectedUsers });
});

export default router;