const mongoose = require("mongoose");
const mongooseSlugPlugin = require("mongoose-slug-plugin");
const ProfileSchema = new mongoose.Schema({
  image: String,
  bio: String,
  trips: [{ type: mongoose.Schema.Types.ObjectId, ref: "Trip" }],

  owner: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
});

// ProfileSchema.plugin(mongooseSlugPlugin, { tmpl: "<%=name%>" });
module.exports = mongoose.model("Profile", ProfileSchema);
