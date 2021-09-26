const mongoose = require("mongoose");
const { HOST, PORT } = require("../config/config");
const mongoosePaginate = require('mongoose-paginate-v2')

const PostSchema = new mongoose.Schema(
    {
        userId: {
            type: String,
            required: true
        },
        desc: {
            type: String,
            max: 50
        },
        img: {
            type: String
        },
        likes: {
            type: Array,
            default: []
        },
    },
    {
        timestamps: true
    }
);

PostSchema.methods.setImgUrl = function (filename) {
    //http://localhost:4040/public/images/posts/jskfjdkfjksddsc.jpg
    this.img = `${HOST}:${PORT}/public/images/posts/${filename}`;
}

PostSchema.plugin(mongoosePaginate);

module.exports = mongoose.model("Post", PostSchema);