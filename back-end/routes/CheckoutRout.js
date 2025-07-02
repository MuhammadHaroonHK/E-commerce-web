const express = require('express');
const Cart = require('../models/Cart');
const Order = require('../models/Order');
const Product = require('../models/Product');
const Checkout = require('../models/Checkout');
const { protect } = require('../MiddleWares/autMiddleware');

const router = express.Router();

// @route   POST /api/checkout
// @desc    Create new checkout session
// @access  Private
router.post("/", protect, async (req, res) => {
    const { checkoutItems, shippingAddress, paymentMethod, totalPrice } = req.body;

    if (!checkoutItems || checkoutItems.length === 0) {
        return res.status(400).json({ msg: "No item for checkout" });
    }

    try {
        const newCheckout = await Checkout.create({
            user: req.user._id,
            checkoutItems,
            shippingAddress,
            paymentMethod,
            totalPrice,
            paymentStatus: "pending",
            isPaid: false,
            isFinalized: false,
        });

        res.status(201).json(newCheckout);
    } catch (error) {
        console.error("Error during creating new session", error);
        res.status(500).json({ msg: "Server Error" });
    }
});

// @route   PUT /api/checkout/:id/pay
// @desc    Update isPaid and set isFinalized after payment
// @access  Private
router.put("/:id/pay", protect, async (req, res) => {
    const { paymentStatus, paymentDetails } = req.body;

    try {
        const checkout = await Checkout.findById(req.params.id);
        if (!checkout) {
            return res.status(404).json({ msg: "No Checkout Found" });
        }

        if (paymentStatus === "paid") {
            checkout.isPaid = true;
            checkout.paymentStatus = paymentStatus;
            checkout.paymentDetails = paymentDetails;
            checkout.paidAt = Date.now();

            await checkout.save();

            return res.status(200).json(checkout);
        }
        else {
            return res.status(400).json({ msg: "Invalid Payment Status" });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ msg: "Server Error" });
    }
});


// @route   POST /api/checkout/:id/finalize
// @desc    Finalize checkout and create order
// @access  Private
router.post("/:id/finalize", protect, async (req, res) => {
    try {
        const checkout = await Checkout.findById(req.params.id);
        if (!checkout) {
            return res.status(404).json({ msg: "No Checkout Found" });
        }

        if (checkout.isPaid && !checkout.isFinalized) {
            const finalOrder = await Order.create({
                user: checkout.user,
                orderItems: checkout.checkoutItems,
                shippingAddress: checkout.shippingAddress,
                paymentMethod: checkout.paymentMethod,
                totalPrice: checkout.totalPrice,
                isPaid: true,
                paidAt: checkout.paidAt,
                isDelivered: false,
                paymentStatus: "paid",
                paymentDetails: checkout.paymentDetails
            });

            checkout.isFinalized = true;
            checkout.finalizedAt = Date.now();
            await checkout.save();

            await Cart.findOneAndDelete({ user: checkout.user });

            return res.status(201).json(finalOrder);
        } else if (checkout.isFinalized) {
            return res.status(400).json({ msg: "Checkout already finalized" });
        } else {
            return res.status(400).json({ msg: "Checkout is not paid" });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ msg: "Server Error" });
    }
});

module.exports = router;
