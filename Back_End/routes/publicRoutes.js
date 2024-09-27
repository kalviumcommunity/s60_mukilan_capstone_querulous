const express = require('express');
const router = express.Router();
const { Post } = require('../UserSchema'); 


router.get('/data', async (req, res) => {
    try {
        const Homedata = await Post.find({}).populate('added_by');
        if (!Homedata) {
            return res.status(404).json({ message: 'Post not found' })
        }
        res.status(200).json({ message: 'successfull', data: Homedata });
        // console.log(Homedata)
    }
    catch (error) {
        res.status(500).json({ message: 'Server Error', error: error.message });
    }
})

module.exports = router;