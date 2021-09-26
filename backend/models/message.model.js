const mongoose = require("mongoose");
const mongoosePaginate = require('mongoose-paginate-v2')


const MessageSchema = new mongoose.Schema(
    {
        conversationId:{
            type: String
        },
        sender:{
            type: String
        },
        text:{
            type: String
        }
    },
    {
        timestamps: true
    }
);

MessageSchema.plugin(mongoosePaginate);

module.exports = mongoose.model("Message", MessageSchema);