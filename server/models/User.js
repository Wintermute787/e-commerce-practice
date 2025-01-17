const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema({
  name: {
    type: String
  },
  email: {
    type: String
  },
  username: {
    type: String
  },
  auth0_id: {
    type: String
  }
});

module.exports = mongoose.model("User", userSchema);
