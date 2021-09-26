const io = require('socket.io')(8900, {
    cors: {
        origin: "http://localhost:3000",
    }
});

let users = [] ;


const addUser = (userId, socketId) => {
    !users.some( user => user.userId === userId ) &&
        users.push({userId, socketId})
}

const removeUser = (socketId) => {
    users = users.filter(user => user.socketId !== socketId);
}

const getUser = (userId) => {
    return users.find(user => user.userId === userId);
}


//evento automatico
io.on('connection', (socket) => {
    //when connected
    console.log(`user ${socket.id} connected`);

    //take userId and socketId from user
    socket.on("addUser", userId => {
        addUser(userId, socket.id);
        io.emit("getUsers", users);
    })

    //send and get message
    socket.on("sendMessage", ({senderId , receiverId, text}) => {
        const user = getUser(receiverId);
        // console.log(user);
        // para evitar enviar el event a user desconectad
        if(!user) return; 
        io.to(user.socketId).emit("getMessage", {
            senderId,
            text
        })
    } )

    //when write new msg
    // socket.on("escribiendo", (receiverId) => {
    socket.on("escribiendo", ({receiverId, msg }) => {
        // console.log(receiverId);
        const user = getUser(receiverId);
        io.to(user.socketId).emit("escriben", {
            id: receiverId,
            msg
        })
    } )

    //when disconnect y es avisado por el usuario
    socket.on("isDisconnect", (socketId) => {
        console.log(`user ${socket.id} disconnected`);
        removeUser(socketId);

        //avisamos a todos que se desconnecto
        io.emit("getUsers", users)
    })


    //when disconnect esto es default => automatico
    socket.on("disconnect", () => {
        console.log(`user ${socket.id} disconnected`);
        removeUser(socket.id);
    })
})

/* Socket :
    1)socket es el cliente este tiene .on() para escuchar al cliente y .emit() para crear evento propio del cliente
    2) io llegaria ser el servidor y de igual forma tenemos para crear y emitir sus eventos
*/