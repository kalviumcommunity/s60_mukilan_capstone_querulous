const express = require('express');
const router = express.Router();
const { User, Post } = require('../UserSchema');
const nodemailer = require('nodemailer');


// User choice route
router.post("/choice", async (req, res) => {
    const { email, data } = req.body;
    try {
        await User.findOneAndUpdate({ email }, { selectedTopics: data });
        res.status(200).json({ message: "User's choice saved successfully" });
    } catch (error) {
        console.error("Error in choice endpoint:", error.message);
        res.status(500).json({ message: "Server Error", error: error.message });
    }
});

// Edit user data route
router.post("/edit", async (req, res) => {
    const { email, data } = req.body;
    try {
        await User.findOneAndUpdate({ email }, { data });
        res.status(200).send("User updated successfully");
    } catch (error) {
        console.log(error);
        res.status(500).send("Error updating user");
    }
});

// Get user profile
router.post("/profile", async (req, res) => {
    const { email } = req.body;
    try {
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ message: "Invalid Email" });
        }
        res.status(200).json({ message: "User's profile fetched successfully", user });
    } catch (error) {
        res.status(500).json({ message: "Server Error", error: error.message });
    }
});

// Post creation route
router.post("/post", async (req, res) => {
    const { post, mediaFile, added_by, title, date } = req.body;

    try {
        const user = await User.findById(added_by);
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        const newPost = new Post({
            post,
            mediaFile,
            added_by: user._id,
            title,
            date,
        });

        await newPost.save();
        res.status(201).json({ message: "Post created successfully", newPost });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server error", error: error.message });
    }
});

// Get the current date
router.get("/date", (req, res) => {
    const currentDate = new Date().toISOString().split('T')[0];
    res.json({ currentDate });
});

// Delete post by ID
router.delete("/posts/:id", async (req, res) => {
    const postId = req.params.id;

    try {
        const post = await Post.findByIdAndDelete(postId);
        if (!post) {
            return res.status(404).json({ message: "Post not found" });
        }
        const posts = await Post.find({ added_by: post.added_by });
        res.status(200).json({ message: "Post deleted successfully", posts });
    } catch (error) {
        console.error("Error deleting post:", error.message);
        res.status(500).json({ message: "Server error", error: error.message });
    }
});

// Fetch post by ID
router.get("/posts/:id", async (req, res) => {
    try {
        const post = await Post.findById(req.params.id);
        if (!post) {
            return res.status(404).json({ message: "Post not found" });
        }
        res.json(post);
    } catch (error) {
        console.error("Error fetching post:", error.message);
        res.status(500).json({ message: "Server error", error: error.message });
    }
});

// Update post by ID
router.put("/posts/:id", async (req, res) => {
    const { title, post, mediaFile } = req.body;
    try {
        const updatedPost = await Post.findByIdAndUpdate(
            req.params.id,
            { title, post, mediaFile },
            { new: true }
        );
        if (!updatedPost) {
            return res.status(404).json({ message: "Post not found" });
        }
        res.json(updatedPost);
    } catch (error) {
        console.error("Error updating post:", error.message);
        res.status(500).json({ message: "Server error", error: error.message });
    }
});

// Reset user password
router.put("/reset", async (req, res) => {
    const { email, password, confirmPassword } = req.body;
    try {
        const user = await User.findOneAndUpdate({ email }, { password, confirmPassword });
        if (user) {
            res.status(200).json({ message: "Password updated successfully" });
        } else {
            res.status(404).json({ message: "User not found" });
        }
    } catch (error) {
        res.status(500).json({ message: "Server error", error: error.message });
    }
});

// Connected request via email
router.post("/connected", async (req, res) => {
    const { senderName, senderEmail, recipientEmail, recipientName } = req.body;

    const transporter = nodemailer.createTransport({
        service: "outlook",
        auth: {
            user: "rmr09570@gmail.com",
            pass: "sodbwqertuvtbpjc",
        },
    });

    const mailOptions = {
        from: senderEmail,
        to: recipientEmail,
        subject: `Connection Request from ${senderName}`,
        text: `Hello ${recipientName},\n\n${senderName} has sent you a connection request.\n\nBest Regards,\nYour App`,
    };

    try {
        await transporter.sendMail(mailOptions);
        res.status(200).json({ message: "Email sent successfully" });
    } catch (error) {
        console.error("Error sending email:", error.message);
        res.status(500).json({ message: "Failed to send email" });
    }
});

// Fetch logged-in user's posts
router.get("/logedinuserpost", async (req, res) => {
    const userID = req.userID;
    try {
        const user = await User.findById(userID);
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }
        const posts = await Post.find({ added_by: user._id });
        res.status(200).json({ message: "Posts fetched successfully", posts });
    } catch (error) {
        console.error("Error fetching posts:", error.message);
        res.status(500).json({ message: "Server error", error: error.message });
    }
});

module.exports = router;
