const express=require("express")
const connectDb=require("./config/connectDb")
const userRoute= require('./routes/UserRout')
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

console.log("server running on " + PORT)
app.listen(PORT || 3000)