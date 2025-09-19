const mongoose = require("mongoose");
const { Schema } = mongoose;

const taskSchema = new Schema({
    title: { type: String, required: true },
    description: { type: String },
    status: {
        type: String,
        enum: ["To Do", "In Progress", "Done"],
        default: "To Do"
    },
    project: { type: Schema.Types.ObjectId, ref: "Project", required: true }
}, { timestamps: true });

module.exports = mongoose.model("Task", taskSchema);
