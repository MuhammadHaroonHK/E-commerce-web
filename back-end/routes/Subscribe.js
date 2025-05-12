const express = require('express')
const Subscriber = require('../models/Subscribe')

const router = express.Router();

//@route = post: api/subscribe
//@desc = save subscribers
//@access = Public
router.post("/", async (req, res) => {
    const { email } = req.body;
    if (!email) {
        res.status(400).json({ msg: "Enter your email" });
    }

    try {
        let subscriber = await Subscriber.findOne({ email });
        if (subscriber) {
            res.status(400).json({ msg: "Email is already use" });
        }

        //create new subscriber
        subscriber = new Subscriber({ email });
        await subscriber.save();
        res.status(200).json({ msg: "Newsletter Successfully Subscribed" })
    } catch (error) {
        console.error(error);
        res.status(500).json({ msg: "Server Error" })
    }
});

module.exports = router;