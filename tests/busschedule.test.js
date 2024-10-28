//import request from "supertest";
import request from 'supertest';
import app from "../src/app.js"; // Import your Express app
import routeModel from "../models/routeModel.js"
import mongoose from 'mongoose';
import {listRouteNames,listdetails} from "../controller/routeController.js"

//import scheduleModel from "../models/scheduleModel.js"
//import {liveschedule, livescheduleByRoute} from '../../controller/scheduleController.js'
// Mock the routeModel.find() method
jest.mock("../models/routeModel.js"); // Update with actual path


// Create an express route for testing purposes
app.get('/routeNames', listRouteNames);
app.get('/details', listdetails);

beforeAll(async () => {
  // Ensure MongoDB is connected before running tests
  await mongoose.connect(process.env.MONGO_URI, {
    // useNewUrlParser: true, // Remove if using MongoDB driver 4.0+
    // useUnifiedTopology: true, // Remove if using MongoDB driver 4.0+
  });
});
// describe("GET /", () => {
//   it("should return the index.html file", async () => {
//     const res = await request(app).get("/");
//     expect(res.statusCode).toBe(200);
//     expect(res.headers["content-type"]).toMatch(/html/);
//   });
// });

// describe("GET /schedule", () => {
//   it("should return the bus schedules", async () => {
//     const res = await request(app).get("/schedule");
//     expect(res.statusCode).toBe(200);
//     expect(res.body.length).toBeGreaterThan(0);
//   });
// });

// describe("GET /routes", () => {
//   it("should return the list of routes", async () => {
//     const res = await request(app).get("/routes");
//     expect(res.statusCode).toBe(200);
//     expect(res.body.length).toBeGreaterThan(0);
//   });
// });

// describe("GET /liveschedule", () => {
//   it("should return the live schedule based on the query parameter", async () => {
//     const res = await request(app).get("/liveschedule?time=08:10");
//     expect(res.statusCode).toBe(200);
//     expect(res.body.length).toBeGreaterThan(0);
//   });

//   it("should return 404 if no schedules are available at the given time", async () => {
//     const res = await request(app).get("/liveschedule?time=23:59");
//     expect(res.statusCode).toBe(404);
//   });
// });


describe('Route Handler Tests', () => {
    afterEach(() => {
        jest.clearAllMocks(); // Clear mock data between tests
    });

    describe('GET /routeNames', () => {
        it('should return a list of route names', async () => {
            // Mock the response from routeModel.find()
            routeModel.find.mockResolvedValue([{ RouteName: 'Route 1' }, { RouteName: 'Route 2' }]);

            const response = await request(app).get('/routeNames');
            expect(response.status).toBe(200);
            expect(response.body).toEqual(['Route 1', 'Route 2']);
        });

        it('should return a 500 error when something goes wrong', async () => {
            // Mock an error
            routeModel.find.mockRejectedValue(new Error('Something went wrong'));

            const response = await request(app).get('/routeNames');
            expect(response.status).toBe(500);
            expect(response.body).toEqual({ success: false, message: "Error" });
        });
    });

    describe('GET /details', () => {
        it('should return a list of details', async () => {
            // Mock the response from routeModel.find()
            routeModel.find.mockResolvedValue([{ Details: 'Detail 1' }, { Details: 'Detail 2' }]);

            const response = await request(app).get('/details');
            expect(response.status).toBe(200);
            expect(response.body).toEqual(['Detail 1', 'Detail 2']);
        });

        it('should return a 500 error when something goes wrong', async () => {
            // Mock an error
            routeModel.find.mockRejectedValue(new Error('Something went wrong'));

            const response = await request(app).get('/details');
            expect(response.status).toBe(500);
            expect(response.body).toEqual({ success: false, message: "Error" });
        });
    });
});

afterAll(async () => {
  await mongoose.disconnect(); // Close the connection after tests
});

