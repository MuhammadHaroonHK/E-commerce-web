const express = require('express')
const Order = require('../models/Order')
const { protect, admin } = require('../MiddleWares/autMiddleware')
const router = express.Router()

//@route = get: api/admin/orders
//@desc = get all orders
//@access = Private/admin
router.get("/", protect, admin, async (req, res) => {
    try {
        const orders = await Order.find({}).populate("user", "name email");
        if (!orders) {
            res.status(400).json({ msg: "No order found" })
        }
        res.status(200).json(orders)
    } catch (error) {
        console.error(error);
        res.status(500).json({ msg: "Server Error" })
    }
});

//@route = put: api/admin/orders/:id
//@desc = update product status
//@access = Private/admin
router.put("/:id", protect, admin, async (req, res) => {
    try {
        let order = await Order.findById(req.params.id).populate("user", "name");
        if (order) {
            order.status = req.body.status || order.status;
            order.isDelivered = req.body.status === "Delevired" ? true : order.isDelivered;
            order.deliveredAt = req.body.status === "Delevired" ? Date.now() : order.deliveredAt;
        }

        const updatedStatus = await order.save();
        res.status(200).json({ msg: "user updated successfully", order: updatedStatus })
    } catch (error) {
        console.error(error);
        res.status(500).json({ msg: "Server Error" })
    }
});

//@route = delete: api/admin/order/:id
//@desc = delete order
//@access = Private/admin
router.delete("/:id", protect, admin, async (req, res) => {
    try {
        const order = await Order.findById(req.params.id);
        if (order) {
            await Order.deleteOne();
            res.status(200).json({ msg: "order deleted successfully", user: order })
        } else {
            res.status(400).json({ msg: "order not found" });
        }

    } catch (error) {
        console.error(error);
        res.status(500).json({ msg: "Server Error" })
    }
});

module.exports = router;