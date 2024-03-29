const mongoose = require("mongoose");
const bcrypt = require('bcrypt');

const userSchema = new mongoose.Schema({
    email: String,
    username: String,
    password: String,
    // rePassword: String,
    country: String,
    city: String,
    
})

const User = mongoose.model('User', userSchema);


userSchema.pre('save', async function() {
    this.password = await bcrypt.hash(this.password, 12)
})

module.exports = User;