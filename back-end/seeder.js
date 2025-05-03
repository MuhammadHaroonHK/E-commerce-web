const mongoose = require('mongoose');
const User = require('./models/User');
const Product = require('./models/Product');
const products = require('./data/products')
const env = require("dotenv");
env.config()

mongoose.connect(process.env.DB_URI);
const seeder = async () => {
    try {
        await User.deleteMany();
        await Product.deleteMany();

        //create default admin user
        const adminUser= await User.create({
            name:"Admin User",
            email:"admin@example.com",
            password:"admin123",
            role:"admin",
        })

        //assign user id to each product
        const userId=adminUser._id;

        const sampleData=products.map((product) => {
            return {...product, user:userId};
        });

        //insert data into database
        await Product.insertMany(sampleData);
        console.log("data inserted successfuly");
        process.exit();

    } catch (error) {
        console.log(error);
        process.exit(1)
    }
};

seeder();

//in terminal, write this command: npm run seed