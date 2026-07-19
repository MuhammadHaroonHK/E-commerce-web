const express = require("express")
const cors = require("cors")
const connectDb = require("./config/connectDb")
const userRoute = require('./routes/UserRout')
const productRoute = require('./routes/ProductRout')
const cartRoute = require('./routes/CartRout')
const checkoutRoute = require('./routes/CheckoutRout')
const orderRoute = require('./routes/OrderRout')
const uploadRoute = require('./routes/UploadRout')
const subscribeRoute = require('./routes/Subscribe')
const adminUserRoute = require('./routes/AdminUserRout')
const adminProductRoute = require('./routes/AdminProductRout')
const adminOrderRoute = require('./routes/AdminOrderRout')
require("dotenv").config();

const app = express()
app.use(express.json());
app.use(cors({
    origin: true,
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
}));
const PORT = process.env.PORT;

// Reuse the database connection between Vercel function invocations.
// Starting the connection here makes the app work both locally and on Vercel.
connectDb().catch((error) => {
    console.error("The API could not connect to MongoDB:", error.message);
});
app.get("/", (req, res) => {
    res.send("Wellcome to Rabbit")
})

//API Routes
app.use("/api/users", userRoute)
app.use("/api/products", productRoute)
app.use("/api/cart", cartRoute)
app.use("/api/checkout", checkoutRoute)
app.use("/api/orders", orderRoute)
app.use("/api/upload", uploadRoute)
app.use("/api/subscribe", subscribeRoute)

//admin API's
app.use("/api/admin/users", adminUserRoute)
app.use("/api/admin/products", adminProductRoute)
app.use("/api/admin/orders", adminOrderRoute)


// Vercel imports this Express app as a serverless function. Only listen when
// this file is started directly for local development.
if (require.main === module) {
    const localPort = PORT || 3000;
    app.listen(localPort, () => {
        console.log("Server running on " + localPort);
    });
}

module.exports = app;
