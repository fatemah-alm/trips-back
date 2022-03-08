const mongoose = require("mongoose");
const mongooseSlugPlugin = require("mongoose-slug-plugin");

const UserSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },

  password: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    validate: {
      validator: function validateEmail(v) {
        return /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(v);
      },
      message: "You have entered an invalid email address!",
    },
  },
  firstName: String,
  lastName: String,
  profile: { type: mongoose.Schema.Types.ObjectId, ref: "Profile" },
});

// UserSchema.plugin(mongooseSlugPlugin, { tmpl: "<%=username%>" });
module.exports = mongoose.model("User", UserSchema);
