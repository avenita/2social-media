const router = require('express').Router();

const { newConversation, getConversationOfUser, getConvTwoUserId } = require('../controllers/conversation.controller')

//new conversation
router.post("/", newConversation);

//get conversation of a user
router.get("/:userId", getConversationOfUser);

//get conv includes two userId 
router.get('/find/:firstUserId/:secondUserId', getConvTwoUserId)

module.exports = router;