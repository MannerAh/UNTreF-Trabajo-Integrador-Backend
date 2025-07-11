const mongoose = require('mongoose');
process.loadEnvFile()
const { DB_PROTOCOL, DB_USER, DB_PASS, DB_HOST, DB_NAME, DB_OPTIONS } = process.env;

const MONGODB_URI = `${DB_PROTOCOL}://${DB_USER}:${DB_PASS}@${DB_HOST}/${DB_NAME}?${DB_OPTIONS}`;

const connectDB = async () => {
    try {
        await mongoose.connect(MONGODB_URI);
        console.log('MongoDB conectado con éxito');
} catch (error) {
        console.error({ error });
  }
};

module.exports = connectDB;