const express = require('express');
const path = require('path');
const mongoose = require('mongoose');

const app = express();
const PORT = process.env.PORT || 3000;

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/LoginSignUp', {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

// Define mongoose schema and model
const userSchema = new mongoose.Schema({
    username: String,
    password: String
});
const User = mongoose.model('User', userSchema);

// Serve static files from the 'app' directory
app.use(express.static(path.join(__dirname, 'app')));

// Define routes for each HTML file
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'app', 'homepage.html'));
});

app.get('/products', (req, res) => {
    res.sendFile(path.join(__dirname, 'app', 'products.html'));
});

app.get('/contactus', (req, res) => {
    res.sendFile(path.join(__dirname, 'app', 'contactus.html'));
});

app.get('/login', (req, res) => {
    res.sendFile(path.join(__dirname, 'app', 'login.html'));
});

app.get('/signup', (req, res) => {
    res.sendFile(path.join(__dirname, 'app', 'signup.html'));
});

// Handle form submission for signup
app.post('/signup', (req, res) => {
    const { username, password } = req.body;
    const newUser = new User({ username, password });
    newUser.save((err, user) => {
        if (err) {
            console.error(err);
            res.status(500).send('Error signing up');
        } else {
            res.redirect('/login');
        }
    });
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
