const express = require('express');
const router = express.Router();
const { User, Post } = require('../UserSchema'); 
const nodeMailer = require("nodemailer");


router.post("/otp", async (req, res) => {
    const { email } = req.body;
    const randomOtp = Math.floor(1000 + Math.random() * 9000);
    try {
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ message: "Invalid Email" });
        }
        var transporter = nodeMailer.createTransport({
            service: "outlook",
            auth: {
                user: "rmr09570@gmail.com",
                pass: "sodbwqertuvtbpjc"
            }
        });
        var mailOptions = {
            from: "rmr09570@gmail.com",
            to: email,
            subject: "OTP Verification",
            text: `your Otp ${randomOtp}`
        }

        transporter.sendMail(mailOptions, function (error, info) {
            if (error) {
                console.log(error);
                res.status(500).json({ message: "Error sending OTP" });
            } else {
                console.log('Email sent: ' + info.response);
                res.status(200).json({ message: "OTP sent successfully", data: randomOtp });
            }
        });

    } catch (er) {
        console.log(er.message);
        res.status(500).json({ message: "Server Error", error: er.message });
    }
});

// choice
router.post("/choice", async (req, res) => {
    const { email, data } = req.body;
    try {
        await User.findOneAndUpdate(
            { email },
            { selectedTopics: data }
        );
        res.status(200).json({ message: "Successfully saved user's choice" });
    } catch (error) {
        console.error("Error in choice endpoint:", error.message);
        res.status(500).json({ message: "Server Error", error: error.message });
    }
});

// Edit
router.post("/edit", async (req, res) => {
    const { email, data } = req.body;
    try {
        await User.findOneAndUpdate(
            { email: email },
            { data: data }
        );
        res.status(200).send("User updated successfully");
    } catch (error) {
        console.log(error);
        res.status(500).send("Error updating user");
    }
});

// Profile 
router.post("/profile", async (req, res) => {
    const { email } = req.body;
    try {
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ message: "Invalid Email" });
        }
        const detail = user;
        res.status(200).send({ message: "Successfully saved user's choice", detail: detail });
    } catch (err) {
        res.status(500).send({ message: "Server Error", error: err.message });
    }
});

// Firebase Email verification
// router.post("/verification", async (req, res) => {
//     const { email } = req.body;
//     try {
//         const user = await User.findOne({ email });
//         if (!user) {
//             return res.status(400).send({ message: "Invalid Email" });
//         }
//         res.status(200).send({ message: "Successfully email is checked" });
//     } catch (err) {
//         res.status(500).send({ message: "Server Error", error: err.message });
//     }
// });

//Post page
router.post("/post", async (req, res) => {
    const { post, mediaFile, added_by, title, date } = req.body;

    try {
        // Find the user by email
        const user = await User.findOne({ _id: req.userID });

        if (!user) {
            return res.status(404).send("User not found");
        }

        // Create a new post
        const newPost = new Post({
            post,
            mediaFile,
            added_by,
            title,
            date,
            added_by: user._id,
        });

        // Save the post to the database
        await newPost.save();

        res.status(201).send("Post created successfully");
    } catch (error) {
        console.error(error);
        res.status(500).send("Server error");
    }
});
//check post

// router.get("/check", async (req, res) => {
//     const { added_by } = req.query;
//     try {
//         const posts = await Post.find({ added_by });
//         if (!posts.length) {
//             return res.status(400).json({ message: "User email not found. Please refresh the page and log in again." });
//         }
//         const postsWithMediaFlags = posts.map(post => ({
//             ...post.toObject(),
//             hasImg: !!post.img,
//             hasVid: !!post.vid
//         }));
//         res.status(200).json({ message: "Successfully email is checked", posts: postsWithMediaFlags });
//     } catch (error) {
//         res.status(500).json({ message: "Internal server error" });
//     }
// });

//Date
router.get("/date", (req, res) => {
    const currentDate = new Date();
    const formattedDate = currentDate.toISOString().split('T')[0];
    res.json({ currentDate: formattedDate });
});

//Delete post

router.delete('/posts/:id', async (req, res) => {
    const postId = req.params.id;

    try {
        const post = await Post.findByIdAndDelete(postId);
        if (!post) {
            return res.status(404).json({ message: 'Post not found' });
        }
        const posts = await Post.find({ added_by: post.added_by });
        res.status(200).json({ message: 'Post deleted successfully', posts });
    } catch (error) {
        console.error('Error deleting post:', error.message);
        res.status(500).json({ message: 'Server Error', error: error.message });
    }
});


// Fetch a specific post by ID
router.get('/posts/:id', async (req, res) => {
    try {
        const post = await Post.findById(req.params.id);
        if (!post) {
            return res.status(404).json({ message: 'Post not found' });
        }
        res.json(post);
    } catch (error) {
        console.error('Error fetching post data:', error.message);
        res.status(500).json({ message: 'Server Error', error: error.message });
    }
});

// Update a specific post by ID
router.put('/posts/:id', async (req, res) => {
    const { title, post, mediaFile } = req.body;
    try {
        const updatedPost = await Post.findByIdAndUpdate(
            req.params.id,
            { title, post, mediaFile},
            { new: true }
        );
        if (!updatedPost) {
            return res.status(404).json({ message: 'Post not found' });
        }
        res.json(updatedPost);
    } catch (error) {
        console.error('Error updating post:', error.message);
        res.status(500).json({ message: 'Server Error', error: error.message });
    }
});
// **Home page request**

//getting data and display in home
// router.get('/data', async (req, res) => {
//     try {
//         const Homedata = await Post.find({}).populate('added_by');
//         if (!Homedata) {
//             return res.status(404).json({ message: 'Post not found' })
//         }
//         res.status(200).json({ message: 'successfull', data: Homedata });
//         console.log(Homedata)
//     }
//     catch (error) {
//         res.status(500).json({ message: 'Server Error', error: error.message });
//     }
// })

//Update password of user

router.put('/reset', async (req, res) => {
    const { email, password, confirmPassword } = req.body;
    try {
        const user = await User.findOneAndUpdate(
            { email },
            { password, confirmPassword }
        );

        if (user) {
            res.status(200).json({ message: 'Password updated successfully.' });
        } else {
            res.status(404).json({ message: 'User not found in DB.' });
        }
    } catch (error) {
        res.status(500).json({ message: 'Server error.', error });
    }
});

router.post("/connected", async (req, res) => {
    const { senderName, senderEmail, recipientEmail, recipientName } = req.body;

    const transporter = nodemailer.createTransport({
        service: 'outlook',
        auth: {
            user: 'rmr09570@gmail.com',
            pass: 'sodbwqertuvtbpjc'
        },
    });

    const mailOptions = {
        from: 'rmr09570@gmail.com',
        to: senderEmail,
        subject: `Connection Request from ${senderName}`,
        text: `Hello ${recipientName},\n\n${senderName} has sent you a connection request.\n\nBest Regards,\nYour App`,
    };

    try {
        await transporter.sendMail(mailOptions);
        res.status(200).send({ message: 'Email sent successfully' });
    } catch (error) {
        console.error('Error sending email:', error);
        res.status(500).send({ message: 'Failed to send email' });
    }
})

router.get("/logedinuserpost", async (req, res) => {
    const userID = req.userID;
    try {
        const user = await User.findById(userID);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        const posts = await Post.find({ added_by: user._id });
        res.status(200).json({ message: 'Posts fetched successfully', posts });
    } catch (error) {
        console.error('Error fetching posts:', error.message);
        res.status(500).json({ message: 'Server Error', error: error.message });
    }
})

module.exports = router;