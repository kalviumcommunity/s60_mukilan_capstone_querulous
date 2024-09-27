const express = require('express');
const router = express.Router();
const { User } = require('../UserSchema'); 
const fs = require('fs');
const path = require('path');
const bcrypt = require('bcryptjs');



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

       

        await user.save();
        const emails = readEmails();
        emails.push(email)
        writeFile(emails)
        res.status(201).json({ message: 'User registered successfully'});

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

     
        //send otp to user email

        res.status(200).json({ message: 'Logged in successfully'});
    } catch (error) {
        console.error('Error in login endpoint:', error.message);
        res.status(500).json({ message: 'Server Error', error: error.message });
    }
});

router.get("/alluser", async (req, res)=>{
    const user = await User.find();

    res.send(user)
})

module.exports = router;
