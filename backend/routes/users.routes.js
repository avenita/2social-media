//creamos con express para poder manejar las rutas del user
const router = require("express").Router();
const { updateUser, deleteUser, getUser, follow, unFollow, getFriends, verificationEmail, updateProfilePicture, updateCoverPicture, findUsers } = require("../controllers/user.controllers");
const { userExtractor } = require("../middlewares/userExtractor");
const User = require('../models/user.model');
const multer = require('multer');
const path = require('path');

/*  configuramos rutas del user  */

//update user => actualizar usuario
router.put('/:id', userExtractor, updateUser)


/*--------- configuracion para guardar img y su name ---------*/
const storageConf = (pathUrl) => multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, path.join(__dirname, `../public/images/persons/${pathUrl}`));
    },
    filename: (req, file, cb) => {
        const name = `${Date.now()}${req.body.name || file.originalname}`;
        cb(null, name);
        req.body.filename = name; //agregamos un nuevo valor
    }
})
/*------------------------------------------------------------*/

const uploadProfile = multer({ storage: storageConf('profile') })
router.put('/profilePicture/:id', uploadProfile.single("file"), updateProfilePicture)


const uploadCover = multer({ storage: storageConf('cover') })
router.put('/coverPicture/:id', uploadCover.single("file"), updateCoverPicture)


//delete user
router.delete('/:id', deleteUser)

//get a user querry => lh:4040/users?username 
//get a user querry => lh:4040/users?userId 
router.get('/users', getUser)

//para buscar a una persona : tambien puede enviar una querry pero con los valores de limit y page
router.post('/findUsers', findUsers)

router.patch('/:id', verificationEmail)

//get friends
router.get("/friends/:userId", getFriends)

//follow a user
router.put('/:id/follow', follow)

//unfollow a user
router.put('/:id/unFollow', unFollow)


module.exports = router;