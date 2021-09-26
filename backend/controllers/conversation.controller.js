const Conversation = require('../models/conversation.model');

exports.newConversation = async (req, res) => {
    const newConversation = await new Conversation({
        members:[req.body.senderId, req.body.receiverId]
    })

    try {
        const saveConversation = await newConversation.save()
        res.status(200).json(saveConversation)
    } 
    catch (error) {
        res.status(500).json(error)
    }
}

exports.getConversationOfUser = async (req, res) => {
    try {
        const findConversation = await Conversation.find({
            members: { $in: [req.params.userId] }
        });
        res.status(200).json(findConversation)
    }
    catch (error) {
        res.status(500).json(error)
    }
}

exports.getConvTwoUserId = async (req, res) => {
    try {
        const conversation = await Conversation.findOne({
            members: { $all: [req.params.firstUserId, req.params.secondUserId] },
        })
        res.status(200).json(conversation);
    }
    catch (error) {
        res.status(500).json(error)
    }
}