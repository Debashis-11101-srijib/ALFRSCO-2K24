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
        admin: {
            type: Boolean,
            required: true
        }
    },
    {
        timestamps: true
    }
);

// collection part
const Admin = mongoose.model("Admin", Loginschema);

module.exports = Admin;