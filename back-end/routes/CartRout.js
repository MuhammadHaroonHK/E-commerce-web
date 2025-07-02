const express = require('express');
const Cart = require('../models/Cart');
const Product = require('../models/Product');
const { protect } = require('../MiddleWares/autMiddleware');

const router = express.Router();

// Helper: Get cart by guestId or userId
const getCart = async (guestId, userId) => {
    if (guestId) {
        return await Cart.findOne({ guestId });
    } else if (userId) {
        return await Cart.findOne({ user: userId });
    }
    return null;
};

// @route   POST api/cart
// @desc    Add product to cart for guest or user
// @access  Public
router.post("/", async (req, res) => {
    const { productId, quantity, size, color, guestId, userId } = req.body;
    if (!productId || !quantity || !size || !color) {
        return res.status(400).json({ msg: "Missing required fields" });
    }

    try {
        const product = await Product.findById(productId);
        if (!product) return res.status(404).json({ msg: "Product not found" });

        let cart = await getCart(guestId, userId);

        const newProduct = {
            productId,
            name: product.name,
            image: product.images?.[0]?.url || '',
            price: product.price,
            size,
            color,
            quantity
        };

        if (cart) {
            const index = cart.products.findIndex(
                p => p.productId.toString() === productId && p.size === size && p.color === color
            );

            if (index > -1) {
                cart.products[index].quantity += quantity;
            } else {
                cart.products.push(newProduct);
            }

            cart.totalPrice = cart.products.reduce((sum, item) => sum + item.price * item.quantity, 0);
            await cart.save();
            return res.status(200).json(cart);
        } else {
            const newCart = await Cart.create({
                user: userId || undefined,
                guestId: guestId || `guest_${Date.now()}`,
                products: [newProduct],
                totalPrice: product.price * quantity
            });
            return res.status(201).json(newCart);
        }
    } catch (error) {
        console.error(error);
        return res.status(500).json({ msg: "Server error" });
    }
});

// @route   PUT api/cart
// @desc    Update product quantity or remove if quantity = 0
// @access  Public
router.put("/", async (req, res) => {
    const { productId, quantity, size, color, guestId, userId } = req.body;

    if (!productId || !size || !color) {
        return res.status(400).json({ msg: "Missing required fields" });
    }

    try {
        const cart = await getCart(guestId, userId);
        if (!cart) return res.status(404).json({ msg: "Cart not found" });

        const index = cart.products.findIndex(
            p => p.productId.toString() === productId && p.size === size && p.color === color
        );

        if (index === -1) return res.status(404).json({ msg: "Product not found in cart" });

        if (quantity > 0) {
            cart.products[index].quantity = quantity;
        } else {
            cart.products.splice(index, 1);
        }

        cart.totalPrice = cart.products.reduce((sum, item) => sum + item.price * item.quantity, 0);
        await cart.save();
        return res.status(200).json(cart);
    } catch (error) {
        console.error(error);
        return res.status(500).json({ msg: "Server error" });
    }
});

// @route   DELETE api/cart
// @desc    Remove a product from cart
// @access  Public
router.delete("/", async (req, res) => {
    const { productId, size, color, guestId, userId } = req.query;

    try {
        const cart = await getCart(guestId, userId);
        if (!cart) return res.status(404).json({ msg: "Cart not found" });

        const index = cart.products.findIndex(
            p => p.productId.toString() === productId && p.size === size && p.color === color
        );

        if (index === -1) return res.status(404).json({ msg: "Product not found in cart" });

        cart.products.splice(index, 1);

        if (cart.products.length === 0) {
            await Cart.findByIdAndDelete(cart._id);
            return res.status(200).json({ msg: "Cart deleted because it became empty" });
        }

        cart.totalPrice = cart.products.reduce((sum, item) => sum + item.price * item.quantity, 0);
        await cart.save();
        return res.status(200).json(cart);
    } catch (error) {
        console.error(error);
        return res.status(500).json({ msg: "Server error" });
    }
});

// @route   GET api/cart
// @desc    Get cart for user or guest
// @access  Public
router.get("/", async (req, res) => {
    const { guestId, userId } = req.query;

    try {
        const cart = await getCart(guestId, userId);
        if (!cart) return res.status(404).json({ msg: "Cart is empty" });

        return res.status(200).json(cart);
    } catch (error) {
        console.error(error);
        return res.status(500).json({ msg: "Server error" });
    }
});

// @route   POST api/cart/merge
// @desc    Merge guest cart with user cart on login
// @access  Private
router.post("/merge", protect, async (req, res) => {
    const { guestId } = req.body;

    try {
        const guestCart = await Cart.findOne({ guestId });
        const userCart = await Cart.findOne({ user: req.user._id });

        if (!guestCart) return res.status(400).json({ msg: "Guest cart not found" });

        if (guestCart.products.length === 0) return res.status(400).json({ msg: "Guest cart is empty" });

        if (userCart) {
            guestCart.products.forEach((gItem) => {
                const index = userCart.products.findIndex(
                    (item) =>
                        item.productId.toString() === gItem.productId.toString() &&
                        item.size === gItem.size &&
                        item.color === gItem.color
                );

                if (index > -1) {
                    userCart.products[index].quantity += gItem.quantity;
                } else {
                    userCart.products.push(gItem);
                }
            });

            userCart.totalPrice = userCart.products.reduce((sum, item) => sum + item.price * item.quantity, 0);
            await userCart.save();
            await Cart.findOneAndDelete({ guestId });

            return res.status(200).json(userCart);
        } else {
            guestCart.user = req.user._id;
            guestCart.guestId = undefined;
            await guestCart.save();
            return res.status(200).json(guestCart);
        }
    } catch (error) {
        console.error(error);
        return res.status(500).json({ msg: "Server error" });
    }
});

module.exports = router;
