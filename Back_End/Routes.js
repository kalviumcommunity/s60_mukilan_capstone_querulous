const express = require('express');
const router = express.Router();

const nodeMailer = require("nodemailer");

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
            service:"outlook",
            auth:{
                user:"rmr09570@gmail.com",
                pass:"sodbwqertuvtbpjc"
            }
        });
        var mailOptions = {
            from:"rmr09570@gmail.com",
            to:email,
            subject:"OTP Verification",
            text:`your Otp ${randomOtp}`
        }

        transporter.sendMail(mailOptions, function(error, info){
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
    const { post, img, vid, added_by,title,date } = req.body;
    
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




  
module.exports = router;
