const mongoose = require('mongoose')

var moviesSChema = mongoose.Schema({
    title: String,
    img: String
})

const movieModel = mongoose.model('movieList', moviesSChema);

module.exports = movieModel;