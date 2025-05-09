const express=require("express")
const connectDb=require("./config/connectDb")
const userRoute= require('./routes/UserRout')
const productRoute= require('./routes/ProductRout')
const cartRoute= require('./routes/CartRout')
require("dotenv").config();

const app=express()
app.use(express.json());

const PORT=process.env.PORT;

connectDb();
app.get("/", (req, res) => {
    res.send("Wellcome to Rabbit")
})

//API Routes
app.use("/api/users", userRoute)
app.use("/api/products", productRoute)
app.use("/api/cart", cartRoute)

console.log("server running on " + PORT)
app.listen(PORT || 3000)