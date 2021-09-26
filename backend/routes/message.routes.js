const router = require('express').Router();
const { newMessage, getConversation } = require('../controllers/message.controller');

//ad message
router.post("/", newMessage)

//get message
router.get("/:conversationId", getConversation)



module.exports = router;
