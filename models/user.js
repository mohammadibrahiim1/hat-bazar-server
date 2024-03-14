const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema({
  displayName: {
    type: String,
    // required: true,
  },
  email: {
    type: String,
    // required: true,
    unique: true,
  },
});

const User = mongoose.model("user", userSchema);

module.exports = User; 
