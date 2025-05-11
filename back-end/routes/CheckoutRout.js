const express = require('express');
const Cart = require('../models/Cart')
const Order = require('../models/Order')
const Product = require('../models/Product')
const Checkout = require('../models/Checkout')
const { protect } = require('../MiddleWares/autMiddleware')

const router = express.Router();

//@route = post: api/checkout
//@desc = create new checkout session
//@access = Private
router.post("/", protect, async (req, res) => {
    const { checkoutItems, shippingAddress, paymentMethod, totalPrice } = req.body;

    if (!checkoutItems || checkoutItems.length === 0) {
        res.status(400).json({ msg: "No item for checkout" });
    }
    try {
        //create new session for checkout
        const newCheckout = await Checkout.create({
            user: req.user._id,
            checkoutItems: checkoutItems,
            shippingAddress,
            paymentMethod,
            totalPrice,
            paymentStatus: "pending",
            isPaid: false,
        });

        res.status(201).json(newCheckout)
    } catch (error) {
        console.error("Error during creating new session", error);
        res.status(500).json({ msg: "Server Error" })
    }
});

//@route = put: api/checkout/:id/pay
//@desc = update isPaid after payment
//@access = Private
router.put("/:id/pay", protect, async (req, res) => {
    const { paymentStatus, paymentDetails } = req.body;

    try {
        const checkout = await Checkout.findById(req.params.id);
        if (!checkout) {
            res.status(400).json({ msg: "No Checkout Found" });
        }

        if (paymentStatus === "paid") {
            checkout.isPaid = true,
                checkout.paymentStatus = paymentStatus,
                checkout.paymentDetails = paymentDetails,
                checkout.paidAt = Date.now();

            await checkout.save();
            res.status(200).json(checkout);
        } else {
            res.status(400).json({ msg: "Invalid Payment Status" });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ msg: "Server Error" })
    }
});

//@route = post: api/checkout/:id/finalize
//@desc = finalize checkout and convert to payment cofirmation
//@access = Private
router.post("/:id/finalize", protect, async (req, res) => {
    try {
        const checkout = await Checkout.findById(req.params.id);
        if (!checkout) {
            res.status(400).json({ msg: "No Checkout Found" });
        }

        if (checkout.isPaid && !checkout.isFinalized) {
            //create final order base on chechout details
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

            //finalize the checkout
            checkout.isFinalized = true;
            checkout.finalizedAt = Date.now();
            checkout.save();

            //after checkout, remove the cart from user
            await Cart.findOneAndDelete({ user: checkout.user });
            res.status(201).json(finalOrder);
        } else if (checkout.isFinalized) {
            res.status(400).json({ msg: "Checkout already finalized" });
        } else {
            res.status(400).json({ msg: "Checkout is not paid" });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ msg: "Server Error" })
    }
})
module.exports = router;