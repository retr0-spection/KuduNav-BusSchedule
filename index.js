import express from "express";
import router from "./routes/busschedule.js";
import { __dirname } from "./config.js";

const app = express();
app.use(express.json());

app.use(router);

const PORT = process.env.PORT || 3000;

app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header(
      "Access-Control-Allow-Headers",
      "Origin, X-Requested-With, Content-Type, Accept, Authorization"
    );
    res.header(
      "Access-Control-Allow-Methods",
      "POST, GET, PUT, DELETE, PATCH, OPTIONS"
    );
    res.header("Access-Control-Allow-Credentials", true);
    if ("OPTIONS" == req.method) {
      res.sendStatus(200);
    } else {
      next();
    }
  });

  // Define a simple route
// app.get('/', (req, res) => {
//   res.send({'status':'hello'})
// });

app.get("/", (req, res) => {
      res.sendFile(__dirname + "/pages/index.html");
     });

// Define a simple route
// app.get('/', (req, res) => {
//     res.send('Hello, World!');
// });

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
export default app;