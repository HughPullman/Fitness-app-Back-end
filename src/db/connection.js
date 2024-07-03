import mongoose from "mongoose";

export const connectToDb = async (uri) => {
    await mongoose.connect(uri);
};