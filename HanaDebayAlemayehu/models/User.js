const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: [true, 'First name is required'],
        minlength: [2, 'First name must be at least 2 characters long']
    },
    lastName: {
        type: String,
        required: [true, 'Last name is required'],
        minlength: [2, 'Last name must be at least 2 characters long']
    },
    dateOfBirth: {
        type: Date,
        required: [true, 'Date of birth is required'],
        validate: {
            validator: function(date) {
                return date < new Date();
            },
            message: 'Date of birth cannot be in the future.'
        }
    },
    placeOfBirth: {
        type: String,
        required: [true, 'Place of birth is required'],
        minlength: [2, 'Place of birth must be at least 2 characters long']
    },
    gender: {
        type: String,
        required: true,
        enum: ['male', 'female'],
        default: 'female'
    },
    nationality: {
        type: String,
        required: [true, 'Nationality is required'],
        enum: ['Ugandan', 'South Sudanese', 'Congolese', 'Somali']
    },
    maritalStatus: {
        type: String,
        required: [true, 'Marital status is required'],
        enum: ['Single', 'Married', 'Divorced']
    },
    settlementCamp: {
        type: String,
        required: [true, 'Settlement camp is required'],
        enum: ['Bidi Bidi', 'Nakivale', 'Rhino Camp']
    },
    dateOfJoining: {
        type: Date,
        required: [true, 'Date of joining is required'],
        validate: [{
            validator: function(date) {
                return date <= new Date();
            },
            message: 'Date of joining cannot be in the future.'
        }, {
            validator: function(date) {
                return date > this.dateOfBirth;
            },
            message: 'Date of joining must be after the date of birth.'
        }]
    }
}, {
    timestamps: true
});

module.exports = mongoose.model('User', UserSchema);