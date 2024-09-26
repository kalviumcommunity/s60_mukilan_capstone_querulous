const express = require('express');
const router = express.Router();
const { User, Post } = require('./UserSchema'); // Import the Mongoose models
const nodeMailer = require("nodemailer");
const fs = require('fs');
const path = require('path');


const emailFile = path.join(__dirname, 'emails.txt');
//read
const readEmails = () => {
    try {
        const data = fs.readFileSync(emailFile, 'utf-8');
        return data.split("\n").filter(email => email.trim() !== '');
    }
    catch (er) {
        console.log("error email read", err)
        return [];
    }
}
//write
const writeFile = (emails) => {
    try {
        fs.writeFileSync(emailFile, emails.join('\n'), 'utf8');
    }
    catch (err) {
        console.log("error write", err)
    }
}

// Register a new user
router.post('/register', async (req, res) => {
    const {
        firstname,
        lastname,
        email,
        confirmEmail,
        password,
        confirmPassword,
        gender,
        dateOfBirth
    } = req.body;

    if (password !== confirmPassword) {
        return res.status(400).json({ message: 'Passwords do not match' });
    }

    if (email !== confirmEmail) {
        return res.status(400).json({ message: 'Emails do not match' });
    }

    try {
        let user = await User.findOne({ email });
        if (user) {
            return res.status(400).json({ message: 'Email already exists' });
        }

        user = new User({
            firstname,
            lastname,
            email,
            confirmEmail,
            password,
            confirmPassword,
            gender,
            dateOfBirth
        });

        await user.save();
        const emails = readEmails();
        emails.push(email)
        writeFile(emails)
        res.status(201).json({ message: 'User registered successfully', user });

    } catch (error) {
        console.error('Error in register endpoint:', error.message);
        res.status(500).json({ message: 'Server Error', error: error.message });
    }
});

// Login route
router.post('/login', async (req, res) => {
    const { email, password } = req.body;

    try {
        // Check if user exists
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ message: 'Invalid Email' });
        }

        // Check if password is correct
        if (password !== user.password) {
            return res.status(400).json({ message: 'Invalid password' });
        }
        //send otp to user email

        res.status(200).json({ message: 'Logged in successfully', user });
    } catch (error) {
        console.error('Error in login endpoint:', error.message);
        res.status(500).json({ message: 'Server Error', error: error.message });
    }
});

//OTP 
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
router.post("/verification", async (req, res) => {
    const { email } = req.body;
    try {
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).send({ message: "Invalid Email" });
        }
        res.status(200).send({ message: "Successfully email is checked" });
    } catch (err) {
        res.status(500).send({ message: "Server Error", error: err.message });
    }
});

//Post page
router.post("/post", async (req, res) => {
    const { post, img, vid, added_by, title, date } = req.body;

    try {
        // Find the user by email
        const user = await User.findOne({ email: added_by });

        if (!user) {
            return res.status(404).send("User not found");
        }

        // Create a new post
        const newPost = new Post({
            post,
            img,
            vid,
            added_by,
            title,
            date
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

router.get("/check", async (req, res) => {
    const { added_by } = req.query;
    try {
        const posts = await Post.find({ added_by });
        if (!posts.length) {
            return res.status(400).json({ message: "User email not found. Please refresh the page and log in again." });
        }
        const postsWithMediaFlags = posts.map(post => ({
            ...post.toObject(),
            hasImg: !!post.img,
            hasVid: !!post.vid
        }));
        res.status(200).json({ message: "Successfully email is checked", posts: postsWithMediaFlags });
    } catch (error) {
        res.status(500).json({ message: "Internal server error" });
    }
});

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
    const { title, post, img, vid } = req.body;
    try {
        const updatedPost = await Post.findByIdAndUpdate(
            req.params.id,
            { title, post, img, vid, hasImg: !!img, hasVid: !!vid },
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
router.get('/data', async (req, res) => {
    try {
        const Homedata = await Post.find({})
        if (!Homedata) {
            return res.status(404).json({ message: 'Post not found' })
        }
        res.status(200).json({ message: 'successfull', data: Homedata });
        console.log(Homedata)
    }
    catch (er) {
        res.status(500).json({ message: 'Server Error', error: error.message });
    }
})

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

module.exports = router;