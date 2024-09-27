const express = require('express');
const router = express.Router();
const { User } = require('../UserSchema'); 
const fs = require('fs');
const path = require('path');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');


const emailFile = path.join(__dirname, 'emails.txt');
//read
const readEmails = () => {
    try {
        const data = fs.readFileSync(emailFile, 'utf-8');
        return data.split("\n").filter(email => email.trim() !== '');
    }
    catch (err) {
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

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        user = new User({
            firstname,
            lastname,
            email,
            confirmEmail,
            password: hashedPassword,
            confirmPassword : hashedPassword,
            gender,
            dateOfBirth
        });

        const jwt_token = jwt.sign({ userID: user._id }, process.env.JWT_SECRET, {
            expiresIn: '7d',
        });

        res.cookie("token", jwt_token, {
                httpOnly: true,
                secure: process.env.NODE_ENV === "production", // Use secure cookies in production
                maxAge: 604800000, // 7 days
                sameSite: "Strict", // or 'Lax', depending on your needs
            });
       
        await user.save();
        const emails = readEmails();
        emails.push(email)
        writeFile(emails)
        res.status(201).json({ message: 'User registered successfully', user, token: jwt_token });

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
        const correct_password = await bcrypt.compare(password, user.password);

        if (!correct_password) {
            return res.status(400).json({ message: 'Invalid password' });
        }

        const jwt_token = jwt.sign({ userID: user._id }, process.env.JWT_SECRET, {
            expiresIn: '7d',
        });

        res.cookie("token", jwt_token, {
                httpOnly: true,
                secure: process.env.NODE_ENV === "production", // Use secure cookies in production
                maxAge: 604800000, // 7 days
                sameSite: "Strict", // or 'Lax', depending on your needs
            });
        //send otp to user email

        res.status(200).json({ message: 'Logged in successfully', user, token: jwt_token });
    } catch (error) {
        console.error('Error in login endpoint:', error.message);
        res.status(500).json({ message: 'Server Error', error: error.message });
    }
});

// router.get("/alluser", async (req, res)=>{
//     const user = await User.find();

//     res.send(user)
// })

router.post("/verification", async (req, res) => {
    const { email } = req.body;
    try {
        const user = await User.findOne({ email });
        
        if (!user) {
            return res.status(400).send({ message: "Invalid Email" });
        }
        
        // Convert ObjectId to string using toString() method
        const userIdString = user._id.toString();
        console.log(userIdString, "User ID as string");
        
        const jwt_token = jwt.sign({ userID: userIdString }, process.env.JWT_SECRET, {
            expiresIn: '7d',
        });

        res.cookie("token", jwt_token, {
                httpOnly: true,
                secure: process.env.NODE_ENV === "production", // Use secure cookies in production
                maxAge: 604800000, // 7 days
                sameSite: "Strict", // or 'Lax', depending on your needs
            });
        res.status(200).send({ message: "Successfully email is checked" });
    } catch (err) {
        res.status(500).send({ message: "Server Error", error: err.message });
    }
});


module.exports = router;
