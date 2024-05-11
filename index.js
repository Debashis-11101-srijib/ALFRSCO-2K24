const express = require('express');
const path = require('path');
const config = require("./config");
const User = require("./model/user.model");
const bcrypt = require('bcrypt');

const app = express();

app.use(express.json())
app.use(express.static('Frontend'))

// app.use('/login',express.static(path.join(__dirname + '/Frontend/login.html')))

app.get('/', (req, res) => {
    res.sendFile('/Frontend/index.html', {root: __dirname})
})

app.get('/signup', (req, res) => {
    res.sendFile('/Frontend/signup.html', {root: __dirname})
})

app.get('/login', (req, res) => {
    res.sendFile('/Frontend/login.html', {root: __dirname})
})

// Register User
app.post("/api/signup", async (req, res) => {

    const data = {
        name: req.body.username,
        password: req.body.password,
        email: req.body.email,
        phone: req.body.phone,
        collegeName: req.body.collegeName,
        gender: req.body.gender
    }

    // Check if the username already exists in the database
    const existingUser = await User.findOne({ name: data.name });

    if (existingUser) {
        res.send('User already exists. Please choose a different username.');
    } else {
        // Hash the password using bcrypt
        const saltRounds = 10; // Number of salt rounds for bcrypt
        const hashedPassword = await bcrypt.hash(data.password, saltRounds);

        data.password = hashedPassword; // Replace the original password with the hashed one

        const userdata = await User.create(data);
        res.send(userdata)
    }

});

// Login user 
app.post("/api/login", async (req, res) => {
    try {
        const check = await User.findOne({ name: req.body.username });
        if (!check) {
            res.send("User name cannot found")
        }
        // Compare the hashed password from the database with the plaintext password
        const isPasswordMatch = await bcrypt.compare(req.body.password, check.password);
        if (!isPasswordMatch) {
            res.send("wrong Password");
        }
        else {
            res.render("home");
        }
    }
    catch {
        res.send("wrong Details");
    }
});

const port = process.env.PORT || 3000;

app.listen(port, () => {
    console.log(`Server at http://localhost:${port}`);
})