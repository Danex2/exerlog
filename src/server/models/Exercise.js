const mongoose = require("mongoose");

const ExeciseSchema = new mongoose.Schema(
  {
    exercise: {
      type: String,
      required: true,
    },
    duration: {
      type: String,
      required: true,
    },
    postedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "user",
    },
  },
  { timestamps: true },
  { versionKey: false }
);

module.exports = Exercise = mongoose.model("exercise", ExeciseSchema);
