const express = require('express');
const jwt = require('jsonwebtoken');
const User = require('../models/User.js');
const { protect } = require('../MiddleWares/autMiddleware.js')
const router = express.Router();


//@Route = POST/api/users/register
//@desc = Register a new user
//@Access = Public
router.post("/register", async (req, res) => {
    const { name, email, password } = req.body;

    try {
        let user = await User.findOne({ email });

        if (user) return res.status(400).json({ msg: "User already exist" });
        user = new User({ name, email, password });
        await user.save();

        //create payload
        const payload = { user: { id: user.id, role: user.role, } };

        //Sign and return token
        jwt.sign(payload, process.env.SECRET_KEY, { expiresIn: "40h" }, (err, token) => {
            if (err) throw err;

            //send user and token
            res.status(201).json({
                user: {
                    _id: user._id,
                    name: user.name,
                    email: user.email,
                    password: user.password,
                    role: user.role,
                },
                token,
            }
            )
        })
    } catch (error) {
        console.log(error);
        res.status(500).send("Server Error")
    }
})


//@Rout = api/users/login
//@Desc = user Login
//@Access = Public

router.post("/login", async (req, res) => {
    const { email, password } = req.body;
    try {
        let user = await User.findOne({ email });
        if (!user) return res.status(400).json({ msg: "Invalid Credential" });

        const isMatch = await user.matchPassword(password);
        if (!isMatch) return res.status(400).json({ msg: "Invalid Credential" });

        //create payload
        const payload = { user: { id: user.id, role: user.role, } };

        //Sign and return token
        jwt.sign(payload, process.env.SECRET_KEY, { expiresIn: "40h" }, (err, token) => {
            if (err) throw err;

            //send user and token
            res.json({
                user: {
                    _id: user._id,
                    name: user.name,
                    email: user.email,
                    password: user.password,
                    role: user.role,
                },
                token,
            }
            )
        })

    } catch (error) {
        console.log(error);
        res.status(500).send("server error")
    }
});

//@Rout = api/users/profile
//@desc = After login, user profile will display
//@Access = Private
router.get("/profile", protect, async (req, res) => {
    res.json(req.user);
});

module.exports = router;
