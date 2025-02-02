import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    email: { type: String, require: true },
    password: { type: String, require: true },
    workouts: [{ }],
    exercises: [{ }]
});

const User = new mongoose.model("User", userSchema);

export default User;