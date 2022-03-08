const mongoose = require("mongoose");
const mongooseSlugPlugin = require("mongoose-slug-plugin");

const TripSchema = new mongoose.Schema({
  title: String,
  description: String,
  image: String,
  owner: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
});

// TripSchema.plugin(mongooseSlugPlugin, { tmpl: "<%=title%>" });
module.exports = mongoose.model("Trip", TripSchema);
