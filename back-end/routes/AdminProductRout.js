const express = require('express')
const Product = require('../models/Product')
const { protect, admin } = require('../MiddleWares/autMiddleware')
const router = express.Router()

//@route = get: api/admin/products
//@desc = get all products
//@access = Private/admin
router.get("/", protect, admin, async (req, res) => {
    try {
        const products = await Product.find({});
        if (!products) {
            res.status(400).json({ msg: "No product found" })
        }
        res.status(200).json(products)
    } catch (error) {
        console.error(error);
        res.status(500).json({ msg: "Server Error" })
    }
});


module.exports = router;