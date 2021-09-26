const router = require("express").Router();
const multer = require('multer');
const path = require('path');
const { PORT, HOST } = require("../config/config");

const {
    createPost,
    updatePost,
    getTimelinePost,
    getPost,
    likePost,
    deletePost,
    deleteEmptyPosts,
    getUserPosts } = require("../controllers/post.controller");


/*--------- configuracion para guardar img y su name ---------*/
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, path.join(__dirname, "../public/images/posts"));
    },
    filename: (req, file, cb) => {
        const name = `${Date.now()}${req.body.name || file.originalname}`;
        cb(null, name); //le damo el name
        req.body.filename = name; //agregamos un nuevo valor
    }
})
const uploadPost = multer({ storage })
/*------------------------------------------------------------*/

//create a post => pedimo el id del post pero en el body debe haber el id del dueño del post
router.post('/',  uploadPost.single('file') ,createPost)


/*--------- configuracion para editar un post ---------*/
const storageUpdate = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, path.join(__dirname, "../public/images/posts"));
    },
    filename: (req, file, cb) => {
        const name = `${Date.now()}${req.body.name || file.originalname}`;
        cb(null, name); 
        req.body.img = `${HOST}:${PORT}/public/images/posts/${name}`; 
    }
})
const updatePostImg = multer({ storage: storageUpdate })
/*------------------------------------------------------------*/

//update a post => pedimo el id del post pero en el body debe haber el id del dueño del post
router.put('/:id', updatePostImg.single('file') , updatePost )


//delete a post
router.delete('/:id', deletePost)


//like a post => para que un usuario pueda darle like a una foto este debe de tener el userId 
router.put('/:id/like', likePost)


//get a post
router.get('/:id', getPost)


//get timeline posts
router.get("/timeline/:userId", getTimelinePost)


//get user's all posts
router.get("/profile/:username", getUserPosts)


//get timeline posts
router.get("/deleteEmptyPosts/all", deleteEmptyPosts)


module.exports = router;