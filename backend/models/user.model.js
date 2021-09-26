const mongoose = require("mongoose");
const { HOST, PORT } = require("../config/config");
const mongoosePaginate = require('mongoose-paginate-v2');

const UserSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        min: 3,
        max: 20,
        unique: true
    },
    email: {
        type: String,
        required: true,
        max: 50,
        unique: true
    },
    password: {
        type: String,
        required: true,
        min: 2
    },
    profilePicture: {
        type: String,
        default: `${HOST}:${PORT}/public/images/persons/noAvatar.png`
    },
    coverPicture: {
        type: String,
        default: ""
    },
    followers: {
        type: Array,
        default: []
    },
    followings: {
        type: Array,
        default: []
    },
    isAdmin: {
        type: Boolean,
        default: false
    },
    desc: {
        type: String,
        max: 50
    },
    city: {
        type: String,
        max: 50
    },
    from: {
        type: String,
        max: 50
    },
    relationship: {
        type: Number,
        enum: [1, 2, 3]
    }
}, {
    timestamps: true
})

UserSchema.methods.setProfilePicture = function (filename) {
    this.img = `${HOST}:${PORT}/public/images/persons/profile/${filename}`;
}

UserSchema.methods.setCoverPicture = function (filename) {
    this.img = `${HOST}:${PORT}/public/images/persons/cover/${filename}`;
}

//esto debemos agregarlo para poder tener la opcion de paginate
UserSchema.plugin(mongoosePaginate); 

module.exports = mongoose.model("User", UserSchema);

