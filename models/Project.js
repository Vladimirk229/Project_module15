const mongoose = require("mongoose");
const { Schema } = mongoose;

const projectSchema = new Schema({
    name: { type: String, required: true },
    description: { type: String },
    user: { type: Schema.Types.ObjectId, ref: "User", required: true }
}, { timestamps: true });

module.exports = mongoose.model("Project", projectSchema);
