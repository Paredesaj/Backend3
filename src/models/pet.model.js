import mongoose from "mongoose";

const petSchema = new mongoose.Schema({
    name: String,
    age: Number,
    type: String,
    owner: { type: mongoose.Schema.Types.ObjectId, ref: "User" }
});

export const Pet = mongoose.model("Pet", petSchema);
