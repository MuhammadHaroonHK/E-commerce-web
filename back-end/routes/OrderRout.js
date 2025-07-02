const express = require('express');
const Order = require('../models/Order');
const { protect } = require('../MiddleWares/autMiddleware');

const router = express.Router();

// @route = POST: /api/orders
// @desc  = Create a new order
// @access = Private
router.post("/", protect, async (req, res) => {
    try {
        const {
            orderItems,
            shippingAddress,
            paymentMethod,
            totalPrice,
            isPaid,
            paidAt,
            paymentStatus,
        } = req.body;

        if (!orderItems || orderItems.length === 0) {
            return res.status(400).json({ msg: "No order items" });
        }

        const order = new Order({
            user: req.user._id,
            orderItems,
            shippingAddress,
            paymentMethod,
            totalPrice,
            isPaid,
            paidAt,
            paymentStatus,
            status: "Processing",
        });

        const savedOrder = await order.save();
        res.status(201).json(savedOrder);
    } catch (error) {
        console.error("Order Save Error:", error);
        res.status(500).json({ msg: "Server error while creating order" });
    }
});


// Existing Routes
router.get("/my-orders", protect, async (req, res) => {
    try {
        const order = await Order.find({ user: req.user._id }).sort({ createdAt: -1 });
        if (!order) {
            res.status(400).json({ msg: "No order found" });
        }
        res.status(200).json(order);
    } catch (error) {
        console.error(error);
        res.status(500).json({ msg: "Server Error" });
    }
});

router.get("/:id", protect, async (req, res) => {
    try {
        const product = await Order.findById(req.params.id).populate("user", "user email");
        if (!product) {
            res.status(400).json({ msg: "No product found" });
        }
        res.status(200).json(product);
    } catch (error) {
        console.error(error);
        res.status(500).json({ msg: "Server Error" });
    }
});

module.exports = router;
