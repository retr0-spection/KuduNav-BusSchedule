import mongoose from "mongoose";


const coordinateSchema = new mongoose.Schema({
  latitude: { type: Number, required: true },
  longitude: { type: Number, required: true },
});

const stopSchema = new mongoose.Schema({
  stopId: { type: String, required: true },
  stopName: { type: String, required: true },
  arrivalTime: { type: String, required: true },
  departureTime: { type: String, required: true },
  coordinates: coordinateSchema,
});

const busInfoSchema = new mongoose.Schema({
  busId: { type: String, required: true },
  capacity: { type: Number, required: true },
});

const scheduleSchema = new mongoose.Schema({
  scheduleId: { type: String, required: true },
  routeId: { type: String, required: true },
  routeName: { type: String, required: true },
  stops: [stopSchema],
  busInfo: busInfoSchema,
});

const Schedule = mongoose.model('Schedule', scheduleSchema);

const mongoURI = 'mongodb+srv://2436684:w9oGacQgzzuqDRla@cluster0.fgtxl.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0';

// Connect to MongoDB
mongoose.connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => {
        console.log("Connected to MongoDB Atlas");
        populateAllData();
    })
    .catch((error) => console.error("Connection error:", error));


    const sampleData = [
        {
          scheduleId: "SCH001",
          routeId: "R001",
          routeName: "Full circuit",
          stops: [
            {
              stopId: "S001",
              stopName: "AMIC",
              arrivalTime: "2024-09-12T08:20",
              departureTime: "2024-09-12T08:25",
              coordinates: { latitude: -26.1924, longitude: 28.0306 }
            },
            {
              stopId: "S002",
              stopName: "knockando",
              arrivalTime: "2024-09-12T08:30",
              departureTime: "2024-09-12T08:35",
              coordinates: { latitude: -26.1932, longitude: 28.032 }
            },
            {
                stopId: "S001",
                stopName: "AMIC",
                arrivalTime: "2024-09-12T08:20",
                departureTime: "2024-09-12T08:25",
                coordinates: { latitude: -26.1924, longitude: 28.0306 }
              },

          ],
          busInfo: { busId: "BUS001", capacity: 40 }
        },
        // more data...
      ];
      
      Schedule.insertMany(sampleData)
        .then(() => console.log("Data inserted successfully"))
        .catch(err => console.error("Error inserting data:", err));
      