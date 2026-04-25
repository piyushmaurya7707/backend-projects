require('dotenv').config();
const express = require('express');
const connectDB = require('./config/db');

const app = express();

// Connect DB
connectDB();

// Middleware
app.use(express.json()); // for API (JSON)
app.use(express.urlencoded({ extended: true })); // for HTML forms

// ✅ EJS Setup
app.set('view engine', 'ejs');
app.set('views', './views');

// ✅ Page Routes (Frontend)
app.get('/', (req, res) => {
    res.render('index'); // signup page
});

app.get('/login', (req, res) => {
    res.render('login'); // login page
});

app.get('/home', (req, res) => {
    res.render('socialMedia'); // post page
});

// ✅ API Routes
app.use('/api/auth', require('./routes/auth'));
app.use('/api/posts', require('./routes/post'));

// Server
app.listen(5649, () => {
    console.log("Server running on port 3000");
});