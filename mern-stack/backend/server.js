require("dotenv").config();
const express = require("express");
const cors = require("cors");

const workoutsRoutes = require("./routes/workoutsRouter");

const userRoutes = require("./routes/userRouter");

const mongoose = require("mongoose");
const { connectDb } = require("./databases/mongooseDb");


const app = express();
app.use(cors());

// To handle a data coming in the request
app.use(express.json());

app.use((req, res, next) => {
  next();
});

app.use("/api/workouts", workoutsRoutes);

app.use("/api/user", userRoutes);

connectDb(app)



