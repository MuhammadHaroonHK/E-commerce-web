const mongoose = require("mongoose")
require("dotenv").config();
const URI = process.env.DB_URI;

const connectDb = async () => {
    try {
        await mongoose.connect(URI);
        console.log("Database connected...")
    } catch (error) {
        console.log("connection Failed...", error)
    }
}

module.exports = connectDb