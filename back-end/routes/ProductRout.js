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
});

//@route = GET: api/products
//@desc = filter the products
//@access = Public
router.get("/", async (req, res) => {
    try {
        const {
            catagory, brand, color, size, gender,
            collection, sortBy, search, material, limit
        } = req.query;

        let query = {};

        // Filter Logic
        if (collection && collection.toLowerCase() !== "all") {
            query.collection = collection;
        }

        if (catagory && catagory.toLowerCase() !== "all") {
            query.catagory = catagory;
        }

        if (material) {
            query.material = { $in: material.split(",") };
        }

        if (brand) {
            query.brand = { $in: brand.split(",") };
        }

        if (size) {
            query.size = { $in: size.split(",") };
        }

        if (color) {
            query.color = { $in: [color] };
        }

        if (gender) {
            query.gender = gender;
        }

        // Search Logic
        if (search) {
            query.$or = [
                { name: { $regex: search, $options: "i" } },
                { description: { $regex: search, $options: "i" } },
            ];
        }

        // Sort Logic
        let sort = {};
        if (sortBy) {
            switch (sortBy) {
                case "priceAsc":
                    sort = { price: 1 };
                    break;
                case "priceDesc":
                    sort = { price: -1 };
                    break;
                case "popularity":
                    sort = { rating: -1 };
                    break;
                default:
                    break;
            }
        }

        const limitValue = limit ? parseInt(limit) : 0;

        const products = await Product.find(query).sort(sort).limit(limitValue);
        res.json(products);
    } catch (error) {
        console.log(error);
        res.status(500).json({ msg: "Server Error" });
    }
});

//@route = GET: api/products/best-seller
//@desc = Find best seller base on rating
//@access = Public
router.get("/best-seller", async (req, res) => {
    try {
        const bestSeller=await Product.findOne().sort({rating:-1});
        if(bestSeller) {
            res.json(bestSeller);
        } else {
            res.status(404).json({msg: "Best-Seller Not Found"});
        }
    } catch (error) {
        console.log(error);
        res.status(500).json({msg: "Server Error"});
    }
});

//@route = GET: api/products/new-arrival
//@desc = getting new products base on createdAt
//@access = Public
router.get("/new-arrival", async (req, res) => {
    try {
        const newArrivals=await Product.find().sort({createdAt:-1}).limit(8);
        if(newArrivals) {
            res.json(newArrivals);
        } else {
            res.status(404).json({msg: "New Arrivals Not Found"});
        }
    } catch (error) {
        console.log(error);
        res.status(500).json({msg: "Server Error"});
    }
})

//@route = GET: api/products/:id
//@desc = Find single product
//@access = Public
router.get("/:id" , async (req, res) => {
    try {
        const product=await Product.findById(req.params.id);
        if(product) {
            res.status(200).json(product);
        } else {
            res.status(404).json({msg: "Product Not Found"});
        }
    } catch (error) {
        console.log(error);
        res.status(500).json({msg: "Server Error"});
    }

});

//@route = GET: api/products/similar/:id
//@desc = getting similar product base on gender and category
//@access = Public
router.get("/similar/:id", async (req, res) => {
    const {id} = req.params;
    try {
        const product=await Product.findById(req.params.id);
        if(!product) {
            res.status(404).json({msg: "Product Not Found"})
        }
        const similarProducts=await Product.find({
            _id:{$ne:id}, //exclude this product
            gender:product.gender,
            catagory:product.catagory,
        })
        res.json(similarProducts);
    } catch (error) {
        console.log(error);
        res.status(500).json({msg: "Server Error"});
    }
});


module.exports = router;