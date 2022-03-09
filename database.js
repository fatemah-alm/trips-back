const mongoose = require("mongoose");

const connectDB = async () => {
  const PASSWORD = "HE85a5TpMjAFrkln";
  const DATABASE_NAME = "TripDB2";
  const CONNECTION_URL = `mongodb+srv://admin:${PASSWORD}@coded.h725z.mongodb.net/${DATABASE_NAME}?retryWrites=true&w=majority`;
  const conn = await mongoose.connect(CONNECTION_URL, {
    useUnifiedTopology: true,
    useNewUrlParser: true,
  });
  console.log(CONNECTION_URL);
  console.log(`mongo connected: ${conn.connection.host}`);
};
module.exports = connectDB;
