const express = require("express");
const mongoose = require("mongoose");
const helmet = require("helmet");
const morgan = require("morgan");
const cors = require("cors");
const path = require('path');

//exportamos nuestros routes
const userRouter = require("./routes/users.routes");
const authRouter = require("./routes/auth.routes");
const postsRouter = require("./routes/posts.routes");
const conversationRouter = require("./routes/conversation.routes");
const messageRouter = require("./routes/message.routes");

//export const globales
const { API_URL, PORT } = require('./config/config')

//instanciacion
const app = express();

const port = PORT || 8000;

//conexion con baseData
mongoose.connect(
    API_URL, {
    useNewUrlParser: true, useUnifiedTopology: true
},
    (err) => {
        if (err) {
            return console.log('Connection to DataBase Failure ');
        }
        console.log('Connected exitosa to MongoDB');
    }
)


//confg: middlewares 
app.use(helmet());
app.use(morgan("dev"));
app.use(express.json()) //para datos json
app.use(express.urlencoded({ extended: true })) //para recibir datos form
app.use(cors())


app.use("/public/images", express.static(path.join(__dirname, "public/images")))


//confg: middlewares internos
app.use('/api/users', userRouter);
app.use('/api/auth', authRouter);
app.use('/api/posts', postsRouter);
app.use('/api/conversations', conversationRouter);
app.use('/api/messages', messageRouter);


app.listen(port, () => {
    console.log(`Backend server is running en port!  'http://localhost:${port}' `);
})


/* Notas:

    MIDDLEWARES EXTERNOS:
        1) La libreria de morgan: nos ayuda en la parte de informacion sobre las diferentes peticiones que tengamos , es decir nos ayudara a tener en consola las diferentes peticiones que tengamos dandonos informacion sobre que tipo de peticion, la respuesta que dimos, el total de caracteres...

        2) La libreria de helmet nos ayuda en la parte de seguridad e implementa cierto tipos de cabecera en nuestras respuestas.

*/

