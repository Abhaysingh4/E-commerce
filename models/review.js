const mongoose = require('mongoose');




const reviewschema = new mongoose.Schema({
    rating: {
        type:Number,
        min: 0,
        max:5
    },
    comments: {
        type: String,
        trim:true
    }
});


const Review = mongoose.model('Review', reviewschema);

module.exports = Review;