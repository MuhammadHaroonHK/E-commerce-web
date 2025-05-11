const express = require('express')
const Checkout = require('../models/Checkout')
const Order = require('../models/Order')
const {protect} = require('../MiddleWares/autMiddleware')
const router=express.Router();

//@route = get: api/orders/my-orders
//@desc = get all orders for loged in user
//@access = Private
router.get("/my-order", protect, async (req, res) => {
    try {
        const order=await Order.find({user: req.user._id}).sort({createdAt: -1});
        if(!order) {
            res.status(400).json({msg : "No order found"})
        }

        res.status(200).json(order);
    } catch (error) {
        console.error(error);
        res.status(500).json({ msg: "Server Error" })
    }
});

//@route = get: api/orders/:id
//@desc = get single order details
//@access = Private
router.get("/:id", protect, async (req, res) => {
    try {
        const product=await Order.findById(req.params.id);
        if(!product) {
            res.status(400).json({msg : "No product found"})
        }
        res.status(200).json(product);
    } catch (error) {
        console.error(error);
        res.status(500).json({ msg: "Server Error" })
    }
})
module.exports=router;