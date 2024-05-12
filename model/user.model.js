const { Timestamp } = require('mongodb');
const mongoose = require('mongoose');
// Create Schema
const Loginschema = mongoose.Schema(
    {
        name: {
            type: String,
            required: true
        },
        password: {
            type: String,
            required: true
        },
        email: {
            type: String,
            required: true
        },
        phone: {
            type: Number,
            required: true
        },
        collegeName: {
            type: String,
            required: true
        },
        gender: {
            type: String,
            required: true
        }
    },
    {
        timestamps: true
    }
);

// collection part
const User = mongoose.model("User", Loginschema);

module.exports = User;