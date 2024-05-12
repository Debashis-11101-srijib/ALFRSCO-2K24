const express = require('express');
const store = require("./config");
const User = require("./model/user.model");
const Admin = require("./model/admin.model");
const bcrypt = require('bcrypt');
const session = require('express-session');

const app = express();

app.use(express.json())
app.use(express.static('Frontend'))


// Session middleware
app.use(session({
    secret: 'your-secret-key',
    resave: false,
    saveUninitialized: false,
    store: store
}));

// app.use('/login',express.static(path.join(__dirname + '/Frontend/login.html')))

app.get('/', (req, res) => {
    res.sendFile('/Frontend/index.html', { root: __dirname })
})

app.get('/signup', (req, res) => {
    res.sendFile('/Frontend/signup.html', { root: __dirname })
})

app.get('/login', (req, res) => {
    res.sendFile('/Frontend/login.html', { root: __dirname })
})

app.get('/logout', (req, res) => {
    req.session.destroy();
    res.json({ message: 'Logged out successfully' });
});

// Check authentication middleware
const isAuthenticated = (req, res, next) => {
    if (!req.session.userId) {
        return res.status(401).json({ message: 'Unauthorized' });
    }
    next();
};

// Protected route
app.get('/profile', isAuthenticated, (req, res) => {
    res.json({ message: 'Welcome to your profile' });
});

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
    const existingUser = await User.findOne({ email: data.email });

    if (existingUser) {
        res.send('Email already exists. Please choose a different username.');
    } else {
        // Hash the password using bcrypt
        const saltRounds = 10; // Number of salt rounds for bcrypt
        const hashedPassword = await bcrypt.hash(data.password, saltRounds);

        data.password = hashedPassword; // Replace the original password with the hashed one

        const user = await User.create(data);
        const userInfo = {};
            const selectedItems = ['_id', 'name', 'email', 'phone', 'collegeName', 'gender'];

            selectedItems.forEach(key => {
                // if(user.hasOwnProperty(key)) {
                //     console.log(user[key])
                // }
                userInfo[key] = user[key];
            });
            
            req.session.user = userInfo;
            res.json(
                {
                    "message": "Signup successful",
                    "user": req.session.user
                }
            );
    }

});

// Register Admin
app.post("/api/signup/admin", async (req, res) => {

    const data = {
        name: req.body.username,
        password: req.body.password,
        email: req.body.email,
        admin: true
    }

    // Check if the username already exists in the database
    const existingadmin = await Admin.findOne({ email: data.email });

    if (existingadmin) {
        res.send('Email already exists. Please choose a different adminname.');
    } else {
        // Hash the password using bcrypt
        const saltRounds = 10; // Number of salt rounds for bcrypt
        const hashedPassword = await bcrypt.hash(data.password, saltRounds);

        data.password = hashedPassword; // Replace the original password with the hashed one

        const admin = await Admin.create(data);
        const adminInfo = {};
            const selectedItems = ['_id', 'name', 'email', 'admin'];

            selectedItems.forEach(key => {
                // if(admin.hasOwnProperty(key)) {
                //     console.log(admin[key])
                // }
                adminInfo[key] = admin[key];
            });
            
            req.session.admin = adminInfo;
            res.json(
                {
                    "message": "Signup successful",
                    "admin": req.session.admin
                }
            );
    }

});

// Login user 
app.post("/api/login", async (req, res) => {

    const data = {
        password: req.body.password,
        email: req.body.email
    }

    try {
        const user = await User.findOne({ email: data.email });
        console.log(user)
        if (!user) {
            res.send("User cannot found")
        }
        // Compare the hashed password from the database with the plaintext password
        const isPasswordMatch = await bcrypt.compare(data.password, user.password);
        if (!isPasswordMatch) {
            res.send("wrong Password");
        }
        else {
            const userInfo = {};
            const selectedItems = ['_id', 'name', 'email', 'phone', 'collegeName', 'gender'];

            selectedItems.forEach(key => {
                // if(user.hasOwnProperty(key)) {
                //     console.log(user[key])
                // }
                userInfo[key] = user[key];
            });
            
            req.session.user = userInfo;
            res.json(
                {
                    "message": "Login successful",
                    "user": req.session.user
                }
            );

        }
    }
    catch {
        res.send("wrong Details");
    }
});

// Login admin
app.post("/api/login/admin", async (req, res) => {

    const data = {
        password: req.body.password,
        email: req.body.email
    }
    
    try {
        const admin = await Admin.findOne({ email: data.email });
        console.log(admin)
        if (!admin) {
            res.send("User cannot found")
        }
        // Compare the hashed password from the database with the plaintext password
        const isPasswordMatch = await bcrypt.compare(data.password, admin.password);
        if (!isPasswordMatch) {
            res.send("wrong Password");
        }
        else {
            const adminInfo = {};
            const selectedItems = ['_id', 'name', 'email', 'admin'];

            selectedItems.forEach(key => {
                // if(user.hasOwnProperty(key)) {
                //     console.log(user[key])
                // }
                adminInfo[key] = admin[key];
            });
            
            req.session.admin = adminInfo;
            res.json(
                {
                    "message": "Login successful",
                    "admin": req.session.admin
                }
            );

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