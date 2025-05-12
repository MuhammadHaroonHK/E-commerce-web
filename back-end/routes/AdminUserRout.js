const express = require('express')
const User = require('../models/User')
const { protect, admin } = require('../MiddleWares/autMiddleware')
const router = express.Router()

//@route = get: api/admin/users
//@desc = get all users
//@access = Private/admin
router.get("/", protect, admin, async (req, res) => {
    try {
        const users = await User.find({});
        if (!users) {
            res.status(400).json({ msg: "No user found" })
        }
        res.status(200).json(users)
    } catch (error) {
        console.error(error);
        res.status(500).json({ msg: "Server Error" })
    }
});

//@route = post: api/admin/users/add
//@desc = add users
//@access = Private/admin
router.post("/add", protect, admin, async (req, res) => {
    const { name, email, role, password } = req.body;
    try {
        let user = await User.findOne({ email });
        if (user) {
            res.status(400).json({ msg: "User already exist" });
        }

        //add new user
        user = new User({
            name,
            email,
            password,
            role: role || "customer",
        });
        await user.save();
        res.status(200).json({ user });
    } catch (error) {
        console.error(error);
        res.status(500).json({ msg: "Server Error" })
    }
});

//@route = put: api/admin/users/:id
//@desc = add users
//@access = Private/admin
router.put("/:id", protect, admin, async (req, res) => {
    try {
        let user = await User.findById(req.params.id);
        if (user) {
            user.name = req.body.name || user.name;
            user.email = req.body.email || user.email;
            user.role = req.body.role || user.role;
        }

        const updatedUser = await user.save();
        res.status(200).json({ msg: "user updated successfully", user: updatedUser })
    } catch (error) {
        console.error(error);
        res.status(500).json({ msg: "Server Error" })
    }
});

//@route = delete: api/admin/users/:id
//@desc = delete user
//@access = Private/admin
router.delete("/:id", protect, admin, async (req, res) => {
    try {
        const user = await User.findById(req.params.id);
        if (user) {
            await User.deleteOne();
            res.status(200).json({ msg: "user deleted successfully", user: user })
        } else {
            res.status(400).json({ msg: "User not found" });
        }

    } catch (error) {
        console.error(error);
        res.status(500).json({ msg: "Server Error" })
    }
})
module.exports = router;