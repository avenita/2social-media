const bcrypt = require("bcrypt");

const router = require("express").Router();

/* modulo externo para el password */
const { signin, signup, signout } = require("../controllers/auth.controller");


router.post('/register', signup)


router.post('/login', signin)


router.get('/signout', signout)


module.exports = router;


/* notas:
    a) ese nuevo modulo de bcrypt nos ayuda da proteger el password de los nuevos usuarios, encripta el dato que recive y devuelve un nuevo hash encriptado
*/