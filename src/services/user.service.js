import User from "../models/user.model.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

const generateToken = (user) => {
    return jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
        expiresIn: 86400,
    });
};

const register = async (user) => {
    const { email, password } = user;
    const findOne = await User.findOne({ email: email });
    if (findOne) throw new Error("User already exists!");
    const userPass = await bcrypt.hash(password, 8);
    const newUser = await User.create({ email, password: userPass });
    return newUser.email
};

const login = async ({ email, password }) => {
    const findUser = await User.findOne({ email: email });
    if (!findUser) {
        throw new Error("Credentials Invalid");
    }

    const passMatch = await bcrypt.compare(password, findUser.password);

    if (passMatch) {
        const token = generateToken(findUser);
        return {
            id: findUser._id,
            accessToken: token,
            email: findUser.email
        };
    } else {
        throw new Error("Credentials Invalid");
    }
};

const createExercise = async ({userId, exercise}) => {
    const findUser = await User.findById(userId);
    if (!findUser) throw new Error("User not found");
    if (findUser.exercises.some(e => e.name === exercise.name)) {
        throw new Error("Exercise already saved");
    }
    findUser.exercises.push(exercise);
    await findUser.save();
    return findUser.exercises;
};

const getExercises = async (id) => {
   const findUser = await User.findById(id);
    if (!findUser) throw new Error("User not found");
    return findUser.exercises;
}

const deleteExercise = async ({ userId, exercise }) => {
    const findUser = await User.findById(userId);
    if (!findUser) throw new Error("User not found");
    findUser.exercises = findUser.exercises.filter((e) => e.name !== exercise.name);
    await findUser.save();
    return findUser.exercises;
}

const createWorkout = async ({ userId, workout }) => {
    const findUser = await User.findById(userId);
    if (!findUser) throw new Error("User not found");
    if (findUser.workouts.some(e => e.name === workout.name)) {
        throw new Error("Workout name already in use");
    }
    findUser.workouts.push(workout);
    await findUser.save();
    return findUser.workouts;
}

const getWorkouts = async (id) => {
    const findUser = await User.findById(id);
    if (!findUser) throw new Error("User not found");
    return findUser.workouts;
}

const deleteWorkout = async ({ userId, workout }) => {
    const findUser = await User.findById(userId);
    if (!findUser) throw new Error("User not found");
    findUser.workouts = findUser.workouts.filter((e) => e.name !== workout.name);
    await findUser.save();
    return findUser.workouts;
}

const editWorkout = async ({ userId, workout, oldWorkoutName }) => {
    const findUser = await User.findById(userId);
    if (!findUser) throw new Error("User not found");
    User.findOneAndUpdate({ _id: userId, "workouts.name" : oldWorkoutName }, {workout});
    // let oldWorkout = await findUser.workouts.find((workout) => workout.name === oldWorkoutName);
    // oldWorkout = workout;
    // findUser.save();
    return findUser.workouts;
}


export const userService = {
    register,
    login,
    generateToken,
    createExercise,
    getExercises,
    deleteExercise,
    createWorkout,
    getWorkouts,
    deleteWorkout,
    editWorkout
};