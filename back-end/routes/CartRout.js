const express = require('express');
const Cart = require('../models/Cart');
const Product = require('../models/Product');
const { protect } = require('../MiddleWares/autMiddleware');
const router = express.Router();

//helper function to get User Id or Guest Id
const getCart = async (guestId, userId) => {
    if (guestId) {
        return await Cart.findOne({ guest: guestId });
    } else if (userId) {
        return await Cart.findOne({ user: userId })
    }
    return null;
};

//@route = post: api/cart
//@desc = add product in cart for a guest or user
//@access = Public
router.post("/", async (req, res) => {
    const { productId, quantity, size, color, guestId, userId } = req.body;
    try {
        const product = await Product.findById(productId);
        if (!product) {
            return res.status(404).json({ msg: "No Product Found" })
        }

        //determin the user or guest
        let cart = await getCart(guestId, userId);

        //if cart is exist
        if (cart) {
            const productIndex = cart.products.findIndex(
                (p) =>
                    p.productId.toString() === productId &&
                    p.size === size &&
                    p.color === color
            );

            //if product already in cart, update the quantity
            if (productIndex > -1) {
                cart.products[productIndex].quantity += quantity;
            } else {
                //add new product in cart
                cart.products.push({
                    productId,
                    name: product.name,
                    image: product.images[0].url,
                    price: product.price,
                    size,
                    color,
                    quantity
                })
            }

            //Recalculat total price
            cart.totalPrice = cart.products.reduce(
                (acc, item) => acc + item.price * item.quantity,
                0 //intial value
            );
            await cart.save();
            return res.status(200).json(cart);
        } else {
            //create new cart for guest or user
            const newCart = await Cart.create({
                user: userId ? userId : undefined,
                guestId: guestId ? guestId : "guest_" + new Date().getTime(),
                products: [
                    {
                        productId,
                        name: product.name,
                        image: product.images[0].url,
                        price: product.price,
                        size,
                        color,
                        quantity
                    }
                ],
                totalPrice: product.price * quantity
            });
            res.status(201).json(newCart)
        }
    } catch (error) {
        console.log(error);
        res.status(500).json({ msg: "Server Error" });
    }
});

//@route = put: api/cart
//@desc = add product in cart for a guest or user
//@access = Public
router.put("/", async (req, res) => {
    const { productId, quantity, size, color, guestId, userId } = req.body;
    try {

        //determin the user or guest
        let cart = await getCart(guestId, userId);

        if (!cart)
            return res.status(404).json({ msg: "No product found in Cart" });
        const productIndex = cart.products.findIndex(
            (p) =>
                p.productId.toString() === productId &&
                p.size === size &&
                p.color === color
        );
        if (productIndex > -1) {
            if (quantity > 0) {
                cart.products[productIndex].quantity = quantity;
            } else {
                cart.products.splice(productIndex, 1) //remove item from cart if quantity = 0
            }

            cart.totalPrice = cart.products.reduce(
                (acc, item) => acc + item.price * item.quantity,
                0 //intial value
            );
            await cart.save();
            return res.status(200).json(cart);
        } else {
            res.status(404).json({ msg: "Product not found in cart" })
        }
    } catch (error) {
        console.log(error);
        res.status(500).json({ msg: "Server Error" });
    }
});

//@route = delete: api/cart
//@desc = add product in cart for a guest or user
//@access = Public
router.delete("/", async (req, res) => {
    const { productId, size, color, guestId, userId } = req.body;
    try {
        //determin the user or guest
        let cart = await getCart(guestId, userId);

        if (!cart)
            return res.status(404).json({ msg: "No product found in Cart" });
        const productIndex = cart.products.findIndex(
            (p) =>
                p.productId.toString() === productId &&
                p.size === size &&
                p.color === color
        );
        if (productIndex > -1) {
            cart.products.splice(productIndex, 1);
            cart.totalPrice = cart.products.reduce(
                (acc, item) => acc + item.price * item.quantity,
                0 //intial value
            );
            await cart.save();
            return res.status(200).json(cart);
        } else {
            res.status(404).json({ msg: "Product not found in cart" })
        }

    } catch (error) {
        console.log(error);
        res.status(500).json({ msg: "Server Error" });
    }
});

//@route = get: api/cart
//@desc = show product to user or guest
//@access = Public
router.get("/", async (req, res) => {
    const { guestId, userId } = req.query;
    try {
        let cart = await getCart(guestId, userId);

        if (cart) {
            res.status(200).json(cart);
        } else {
            return res.status(404).json({ msg: "No product found in Cart" });
        }
    } catch (error) {
        console.log(error);
        res.status(500).json({ msg: "Server Error" });
    }
});

//@route = post: api/cart/merge
//@desc = merge guest cart data with user cart on login
//@access = Private
router.post("/merge", protect, async (req, res) => {
    const { guestId } = req.body;
    try {
        const guestCart = await Cart.findOne({ guestId });
        const userCart = await Cart.findOne({ user: req.user._id });

        if (guestCart) {
            if (guestCart.products.length === 0) {
                return res.status(400).json({ msg: "Guest cart is empty" });
            }

            if (userCart) {
                guestCart.products.foreach((guestItem) => {
                    const productIndex = Cart.products.findIndex(
                        (item) =>
                            item.productId.toString() === guestItem.productId &&
                            item.size === guestItem.size &&
                            item.color === guestItem.color
                    );
                    if (productIndex > -1) {
                        //if product in user cart, then update quantity
                        userCart.products[productIndex].quantity += guestCart.quantity
                    } else {
                        //add item into guest cart
                        userCart.products.push(guestCart);
                    }
                });
                userCart.totalPrice = userCart.products.reduce(
                    (acc, item) => acc + item.price * item.quantity,
                    0 //intial value
                );
                await userCart.save();

                //remove guest after merging
                try {
                    await Cart.findOneAndDelete({ guestId });
                } catch (error) {
                    console.error(error);
                }
                res.status(200).json(userCart)
            } else {
                //assign guest to cart
                guestCart.user = req.user._id;
                guestCart.guestId = undefined;
                await guestCart.save();
                res.status(200).json(guestCart);
            }
        } else {
            if (userCart) {
                return res.status(200).json(userCart);
            }
            res.status(400).json({ msg: "Guest cart not found" })
        };
    } catch (error) {
        console.log(error);
        res.status(500).json({ msg: "server error" });
    }
})
module.exports = router;