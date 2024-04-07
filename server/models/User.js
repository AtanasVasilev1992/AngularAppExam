const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const userSchema = new mongoose.Schema({
    email: {
        type: String,
        required: [true, 'Email is required!'],
        unique: true,
        minLength: 7,
    },
    username: {
        type: String,
        required: [true, 'Username is required!'],
        minLength: 3,
    },
    password: {
        type: String,
        required: [true, 'Password is required!'],
        minLength: 4,
    },
});

userSchema.pre('save', async function () {
    this.password = await bcrypt.hash(this.password, 12)
});


const User = mongoose.model('User', userSchema);

module.exports = User;