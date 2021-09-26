const Message = require('../models/message.model');
const { parseValues } = require('../utils/controller.util');
const { PAGE, LIMIT } = require('../config/config')

exports.newMessage = async (req, res) => {
    const newMessage = await new Message(req.body)

    try {
        const savedMessage = await newMessage.save()
        res.status(200).json(savedMessage)
    }
    catch (error) {
        res.status(500).json(error)
    }
}

exports.getConversation = async (req, res) => {
    console.log('entro al get msgs')
    try {
        const { page = PAGE, limite = LIMIT } = req.query;
        const { pag, limit } = parseValues(limite, page);
        console.log(pag, limit);

        const messagesTr = await Message.paginate({
            conversationId: req.params.conversationId
        }, { pag })

        const messages = await Message.find({
            conversationId: req.params.conversationId
        });


        let start = 0;

        // if (pag > 1) start = limit + ((pag - 2) * 10) - ((pag - 2) * 5)

        if (pag > 1) start = (pag * limit) - limit


        // const ordenMsgs = messages.sort((p1, p2) => {
        //     // return new Date(p1.createdAt) - new Date(p2.createdAt) 
        //     return  new Date(p2.createdAt) - new Date(p1.createdAt) 
        // }).slice(start, pag * limit)
        console.log('start',start,'end' ,pag*limit);

        let copy = [...messages.reverse()];
        const ordenMsgs = copy.slice(start, pag * limit).reverse();

        const next = copy.slice(start, (limit * pag) + 1).length === limit + 1 

        res.status(200).json({
            // msgs: messages,
            docs: ordenMsgs,
            next
        })
    }
    catch (error) {
        console.error(error.messages);
        res.status(500).json(error)
    }
}