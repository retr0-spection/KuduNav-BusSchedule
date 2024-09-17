import request from "supertest";
import app from "./index.js"; // Import your Express app

describe("GET /", () => {
  it("should return the index.html file", async () => {
    const res = await request(app).get("/");
    expect(res.statusCode).toBe(200);
    expect(res.headers["content-type"]).toMatch(/html/);
  });
});

describe("GET /schedule", () => {
  it("should return the bus schedules", async () => {
    const res = await request(app).get("/schedule");
    expect(res.statusCode).toBe(200);
    expect(res.body.length).toBeGreaterThan(0);
  });
});

describe("GET /routes", () => {
  it("should return the list of routes", async () => {
    const res = await request(app).get("/routes");
    expect(res.statusCode).toBe(200);
    expect(res.body.length).toBeGreaterThan(0);
  });
});

describe("GET /liveschedule", () => {
  it("should return the live schedule based on the query parameter", async () => {
    const res = await request(app).get("/liveschedule?time=08:10");
    expect(res.statusCode).toBe(200);
    expect(res.body.length).toBeGreaterThan(0);
  });

  it("should return 404 if no schedules are available at the given time", async () => {
    const res = await request(app).get("/liveschedule?time=23:59");
    expect(res.statusCode).toBe(404);
  });
});
