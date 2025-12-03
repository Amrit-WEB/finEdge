import mongoose from "mongoose";

const vehicleSchema = new mongoose.Schema({}, { strict: false });

export default mongoose.model("Vehicle", vehicleSchema);
