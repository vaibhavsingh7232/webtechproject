const express = require('express');
const path = require('path');
const bodyParser = require("body-parser");
const mongoose = require("mongoose");

const app = express();
const PORT = process.env.PORT || 3000;

// Serve static files from the 'public' directory
app.use(express.static(path.join(__dirname, 'public')));

// Define routes for each HTML file
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'homepage.html'));
});

app.get('/aboutus', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'aboutus.html'));
});

app.get('/contactus', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'contactus.html'));
});

app.get('/login', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'LOGIN.html'));
});

app.get('/signup', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'signup.html'));
});

app.get('/products', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'products.html'));
});

mongoose.connect("mongodb://localhost:27017/webtechDB").then(() => {
    console.log("Connected to MongoDB");
}).catch((err) => {
    console.error("Error connecting to MongoDB:", err);
});

// Define MongoDB schema and model
const UserSchema = new mongoose.Schema({
    username: String,
    password: String
});

const User = mongoose.model("User", UserSchema, "users");

app.use(bodyParser.json());
app.post("/validate", async (req, res) => {
    const { username, password } = req.body;

    try {
        // Check if username and password match in the database
        const user = await User.findOne({ username, password });
        
        console.log(user);
        if (user) {
            res.json({ verified: true });
        } else {
            res.json({ verified: false });
        }
    } catch (error) {
        console.error("Error:", error);
        res.status(500).json({ error: "Internal server error" });
    }
});


// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
