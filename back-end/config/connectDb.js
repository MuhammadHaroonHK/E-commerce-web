const mongoose = require("mongoose")
require("dotenv").config();

const connectDb = async () => {
    const URI = process.env.DB_URI;

    if (!URI) {
        throw new Error("DB_URI is not configured");
    }

    if (mongoose.connection.readyState === 1) {
        return mongoose.connection;
    }

    try {
        await mongoose.connect(URI, {
            serverSelectionTimeoutMS: 10000,
        });
        console.log("Database connected...")
        return mongoose.connection;
    } catch (error) {
        console.error("Database connection failed:", error.message);
        throw error;
    }
}

module.exports = connectDb
