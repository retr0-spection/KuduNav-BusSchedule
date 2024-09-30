import mongoose from "mongoose";

// Define stop schema
const stopSchema = new mongoose.Schema({
    stopId: {type: String, required: true},
    arrivalTime: {type: String, required: true},
    departureTime: {type: String, required: true},
});

// Define schedule schema
const scheduleSchema = new mongoose.Schema({
    ScheduleID: {type: String, required: true},
    RouteID: {type: String, required: true},
    BusID: {type: String, required: true},
    stops: [stopSchema],
    STATUS: {type: String, default: "On time"},
});

// Define subscription schema
const subscribeSchema = new mongoose.Schema({
    userID: {type: String, required: true},
    RouteID: {type: String, required: true},
});

// Create models
const scheduleModel = mongoose.models.schedule || mongoose.model("schedule", scheduleSchema);
const subscribeModel = mongoose.models.subscribe || mongoose.model("subscribe", subscribeSchema);

// MongoDB Atlas connection string
const mongoURI = 'mongodb+srv://2436684:w9oGacQgzzuqDRla@cluster0.fgtxl.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0';

// Connect to MongoDB
mongoose.connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => {
        console.log("Connected to MongoDB Atlas");
        populateAllData();
    })
    .catch((error) => console.error("Connection error:", error));

// Populate schedule data
const populateSchedules = async () => {
    const schedules = [
        {
            ScheduleID: "1",
            RouteID: "1", // Full Circuit
            BusID: "B001",
            stops: [
                { stopId: "AMIC", arrivalTime: "06:30", departureTime: "06:35" },
                { stopId: "NSW", arrivalTime: "06:40", departureTime: "06:45" },
                { stopId: "WJ", arrivalTime: "06:50", departureTime: "06:55" },
                { stopId: "WEC", arrivalTime: "07:00", departureTime: "07:05" },
                { stopId: "EOH", arrivalTime: "07:10", departureTime: "07:15" },
                { stopId: "KNK", arrivalTime: "07:20", departureTime: "07:25" },
                { stopId: "AMIC", arrivalTime: "07:30", departureTime: "07:35" }
            ],
            STATUS: "On time"
        },
        {
            ScheduleID: "2",
            RouteID: "6A", // AMIC | KNK | Rosebank
            BusID: "B002",
            stops: [
                { stopId: "AMIC", arrivalTime: "09:00", departureTime: "09:05" },
                { stopId: "KNK", arrivalTime: "09:10", departureTime: "09:15" },
                { stopId: "ROSEBANK", arrivalTime: "09:25", departureTime: "09:30" }
            ],
            STATUS: "On time"
        },
        {
            ScheduleID: "3",
            RouteID: "6B", // AMIC | NSW | Rosebank
            BusID: "B003",
            stops: [
                { stopId: "AMIC", arrivalTime: "09:00", departureTime: "09:05" },
                { stopId: "NSW", arrivalTime: "09:10", departureTime: "09:15" },
                { stopId: "ROSEBANK", arrivalTime: "09:25", departureTime: "09:30" }
            ],
            STATUS: "On time"
        },
        // Additional routes and schedules based on the data from the bus schedule document [7]
    ];

    try {
        await scheduleModel.insertMany(schedules);
        console.log("Bus schedules successfully populated");
    } catch (error) {
        console.error("Error populating schedules:", error);
    }
};

// Populate subscription data
const populateSubscriptions = async () => {
    const subscriptions = [
        { userID: "U001", RouteID: "1" },  // User subscribed to Route 1
        { userID: "U002", RouteID: "6A" }, // User subscribed to Route 6A
        { userID: "U003", RouteID: "6B" }, // User subscribed to Route 6B
        { userID: "U004", RouteID: "1" },  // User subscribed to Route 1 again
        // Add more users and routes if required
    ];

    try {
        await subscribeModel.insertMany(subscriptions);
        console.log("User subscriptions successfully populated");
    } catch (error) {
        console.error("Error populating subscriptions:", error);
    }
};

// Function to populate all data
const populateAllData = async () => {
    try {
        await populateSchedules();
        await populateSubscriptions();
        console.log("All data populated successfully");
        mongoose.disconnect();
    } catch (error) {
        console.error("Error populating data:", error);
    }
};
