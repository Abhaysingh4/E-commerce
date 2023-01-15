const express = require('express');
const app = express();
const path = require('path');
const mongoose = require('mongoose');
const ejsMate = require('ejs-mate');

mongoose.connect('mongodb://127.0.0.1:27017/shopping-app')
    .then(() => console.log('DB connected'))
    .catch((err) => console.log(err));


app.engine('ejs', ejsMate);
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.use(express.static(path.join(__dirname, 'public')));

const productRoutes = require('./routes/product');

app.use(productRoutes);


const port = 5000;
app.listen(port, (req, res) => {
    console.log(`server running on ${port}`);
});
