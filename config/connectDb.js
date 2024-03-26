const mongoose = require("mongoose");
const colors = require("colors");

const connectDb = async () => {
  try {
    if (!process.env.DB_URL) {
      throw new Error("DB_URL environment variable not set");
    }

    await mongoose.connect(process.env.DB_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    console.log(`MongoDB connected`);
  } catch (error) {
    console.error(`Error connecting to database: ${error}`);
    process.exit(1); 
  }
};

module.exports = connectDb;