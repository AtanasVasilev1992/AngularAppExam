const mongoose = require('mongoose');
const User = require('./User');

const museumSchema = new mongoose.Schema({
    name: String,
    workTime: String,
    description: String,
    img: String,
    owner: {
        type: mongoose.Types.ObjectId,
        ref: 'User',
      },
},{timestamps: true});

const Museum = mongoose.model('Museum', museumSchema);

module.exports = Museum