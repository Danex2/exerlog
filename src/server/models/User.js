const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      unique: true,
      required: [true, "Missing username"],
      minlength: [5, "Please enter a username with at least 5 characters"],
      maxlength: [20, "Username cannot be more than 20 characters"],
    },
    password: {
      type: String,
      required: [true, "Missing password"],
    },
    workouts: [
      {
        exercises: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "exercise",
        },
      },
    ],
  },
  { timestamps: true },
  { versionKey: false }
);

module.exports = User = mongoose.model("user", UserSchema);
