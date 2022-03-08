const mongoose = require("mongoose");
const mongooseSlugPlugin = require("mongoose-slug-plugin");
const ProfileSchema = new mongoose.Schema({
  owner: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
});

ProfileSchema.plugin(mongooseSlugPlugin, { tmpl: "<%=name%>" });
module.exports = mongoose.model("Profile", ProfileSchema);
