const mongoose = require("mongoose");

const TaskSchema = new mongoose.Schema({
  title: String,
  completed: { type: Boolean, default: false },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User"
  }
});

module.exports = mongoose.model("Task", TaskSchema);
