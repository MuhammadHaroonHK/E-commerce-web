const express = require('express');
const { protect, admin } = require('../MiddleWares/autMiddleware');
const Product = require('../models/Product');
const router = express.Router();

//@rout = Post: api/products
//@desc = create a new product
//@Access = private, only Admin
router.post("/", protect, admin, async (req, res) => {
    try {
        const { name,
            description,
            price,
            descPrice,
            countInStock,
            sku,
            catagory,
            brand,
            sizes,
            colors,
            collections,
            material,
            gender,
            images,
            isFeatured,
            isPublished,
            tage,
            diamentions,
            weight, } = req.body;

        const product = new Product({
            name,
            description,
            price,
            descPrice,
            countInStock,
            sku,
            catagory,
            brand,
            sizes,
            colors,
            collections,
            material,
            gender,
            images,
            isFeatured,
            isPublished,
            tage,
            diamentions,
            weight,
            user: req.user._id, //who create this product
        });

        const createProduct = await product.save();
        res.status(201).json(createProduct);
    } catch (error) {
        console.log(error);
        res.status(500).json({ msg: "Server Error" })
    }
});

//@rout = Put: api/products/:id
//@desc = update exist product
//@Access = private, only Admin
router.put("/:id", protect, admin,  async (req, res) => {
    try{
    const { name,
        description,
        price,
        descPrice,
        countInStock,
        sku,
        catagory,
        brand,
        sizes,
        colors,
        collections,
        material,
        gender,
        images,
        isFeatured,
        isPublished,
        tage,
        diamentions,
        weight, } = req.body;

        const product=await Product.findById(req.params.id);
        if(product) {
            product.name = name || product.name;
            product.description = description || product.description;
            product.price = price || product.price;
            product.descPrice = descPrice || product.descPrice;
            product.countInStock =countInStock || product.countInStock;
            product.sku = sku || product.sku;
            product.catagory = catagory || product.catagory;
            product.brand = brand || product.brand;
            product.sizes = sizes || product.sizes;
            product.colors = colors || product.colors;
            product.collections = collections || product.collections;
            product.material = material || product.material;
            product.gender = gender || product.gender;
            product.images = images || product.images;
            product.isFeatured = isFeatured !==undefined ? isFeatured : product.isFeatured;
            product.isPublished = isPublished !==undefined ? isPublished : product.isPublished;
            product.tage = tage || product.tage;
            product.diamentions = diamentions || product.diamentions;
            product.weight = weight || product.weight;

            const updateProduct=await product.save();
            res.json(updateProduct);
        } else {
            res.status(404).json({msg: "Product Not found"});
        }
    } catch(error) {
        console.log(error);
        res.status(500).json("Server error")
    }
});

//@rout = Delete: api/products/:id
//@desc = Delete exist product
//@Access = private, only Admin
router.delete("/:id", protect, admin, async (req, res) => {
    try {
        const product=await Product.findById(req.params.id);
        if(product) {
            await Product.deleteOne();
            res.status(201).json({msg: "Product deleted"})
        } else {
            res.status(400).json({msg: "Product not found"})
        }
    } catch (error) {
        console.log(error);
        res.status(500).json({msg: "Server Error"})
    }
})

module.exports = router;