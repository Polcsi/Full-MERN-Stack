const express = require("express");
require("dotenv").config();
require("express-async-errors");
const path = require("path");

const app = express();

//connectDB
const connectDB = require("./db/connect");

//routers
const register = require("./routes/register");
const login = require("./routes/login");
const dashboard = require("./routes/dashboard");

//error handler
const notFoundMiddleware = require("./middleware/not-found");
const errorHandlerMiddleware = require("./middleware/error-handler");

//middleware
app.use(express.json());
const authenticateUser = require("./middleware/authentication");

app.use(express.static(path.join(__dirname, "client", "build")));
app.get("/*", function (req, res) {
  res.sendFile(path.join(__dirname, "client", "build", "index.html"));
});

//routes
app.use("/api/register", register);
app.use("/api/login", login);
app.use("/api/dashboard", authenticateUser, dashboard);

app.use(notFoundMiddleware);
app.use(errorHandlerMiddleware);

const port = process.env.PORT || 5000;

const start = async () => {
  try {
    await connectDB(process.env.MONGO_URI);
    app.listen(port, () =>
      console.log(`Server is listening on port ${port}...`)
    );
  } catch (error) {
    console.log(error);
  }
};

start();
