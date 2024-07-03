import express from "express";
import { config } from "dotenv";
import cors from "cors";

import { connectToDb } from "./src/db/connection.js";
import { registerRouter } from "./src/routes/register.route.js";
import { loginRouter } from "./src/routes/login.route.js";
import { findExercisesRouter } from "./src/routes/findExercises.route.js";
import { createExerciseRouter } from "./src/routes/createExercise.route.js";
import { getExercisesRouter } from "./src/routes/getExercises.route.js";
import { deleteExerciseRouter } from "./src/routes/deleteExercise.route.js";
import { createWorkoutRouter } from "./src/routes/createWorkout.route.js";
import { getWorkoutsRouter } from "./src/routes/getWorkouts.route.js";
import { deleteWorkoutRouter } from "./src/routes/deleteWorkout.route.js";
import { editWorkoutRouter } from "./src/routes/editWorkout.route.js";

config({ path: `.env.${process.env.NODE_ENV}` });

const app = express();

app.use(cors());
app.use(express.json());

try {
    console.log(`Connecting to Database @ ${process.env.DB_URI}`);
    await connectToDb(process.env.DB_URI);
    console.log(`Connected to Database @ ${process.env.DB_URI}`);
} catch (e) {
    console.log(e);
}

app.use("/register", registerRouter);
app.use("/login", loginRouter);
app.use("/exerciseSearch", findExercisesRouter);
app.use("/createExercise", createExerciseRouter);
app.use("/getExercises", getExercisesRouter);
app.use("/deleteExercise", deleteExerciseRouter);
app.use("/createWorkout", createWorkoutRouter);
app.use("/getWorkouts", getWorkoutsRouter);
app.use("/deleteWorkout", deleteWorkoutRouter);
app.use("/editWorkout", editWorkoutRouter);

const server = app.listen(process.env.PORT, () => {
    console.log(`Server is running on : ${server.address().address}:${server.address().port}`);
});

export default server;