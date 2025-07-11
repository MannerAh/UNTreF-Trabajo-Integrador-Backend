const mongoose = require("mongoose");
process.loadEnvFile();
const { DB_PROTOCOL, DB_HOST, DB_PASS, DB_USER, DB_OPTIONS, DB_NAME } =
  process.env;
const MONGODB_URI = `${DB_PROTOCOL}://${DB_USER}:${DB_PASS}@${DB_HOST}/${DB_NAME}?${DB_OPTIONS}`;

const connectDB = async () => {
  try {
    await mongoose.connect(MONGODB_URI);
    console.log(`MongoDB conectado con éxito`);
  } catch (error) {
    console.log({ error });
  }
};

module.exports = { connectDB };

