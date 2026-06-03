const mongoose = require('mongoose');
const crypto = require('crypto');

const UserSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Username is required'],
        unique: true,
       
        minlength: [3, 'Username must be at least 3 characters long']
    },
    email: {
        type: String,
        required: [true, 'Email is required'],
        unique: true,
      
        lowercase: true,
      
    },
    password: {
        type: String,
        required: [true, 'Password is required']
    },
    role:{
type:String,
default:"user"
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});


module.exports = mongoose.model('User', UserSchema);
