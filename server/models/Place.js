const mongoose = require('mongoose');
const User = require('./User')

const placeSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        minLength: 5,
        lowercase: true,
    },
    image: {
        type: String,
        required: true,
        match: /^https?:\/\//,
    },
    description: {
        type: String,
        required: true,
        minLength: 10,
        maxLength: 200,
    },
    workTime: {
        type: String
    },
    city: {
        type: String
    },
    owner: {
        type: mongoose.Types.ObjectId,
        ref: 'User',
    },

});

const Place = mongoose.model('Place', placeSchema);

module.exports = Place;