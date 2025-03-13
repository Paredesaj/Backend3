import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    firstName: String,
    lastName: String,
    email: String,
    password: String,
    role: { type: String, enum: ["user", "admin"], default: "user" },
    pets: { type: Array, default: [] }
});

export const User = mongoose.model("User", userSchema);
