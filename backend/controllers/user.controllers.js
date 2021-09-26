const User = require('../models/user.model');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { JWT_CLAVE, PORT, HOST, LIMIT, PAGE } = require('../config/config');
const { parseValues } = require('../utils/controller.util')


exports.updateUser = async (req, res) => {
    console.log('entro al update', req.userId) //esto te lo pasa el extractor

    // erificamos que la peticion y la ruta tenga el id
    if (req.userId === req.params.id || req.body.isAdmin) { //con token
        if (req.body.password) {
            try {
                const salt = await bcrypt.genSalt(10);
                req.body.password = await bcrypt.hash(req.body.password, salt);
            }
            catch (error) {
                return res.status(500).json({ error });
            }
        }
        try {
            if (req.body.email) {
                const findUser = await User.findById(req.userId);
                if (findUser.email !== req.body.email) {
                    const duple = await User.find({ email: req.body.email });
                    if (duple.length === 1) {
                        res.status(300).json({ error: 'el correo electronico ya existe' })
                    }
                }
            }
            const userUpdate = await User.findByIdAndUpdate(req.params.id, {
                $set: req.body
            });
            const findUpdate = await User.findById(req.userId)
            const { password, ...other } = findUpdate._doc;

            const token = jwt.sign({ ...other }, JWT_CLAVE);
            res.status(200).json({ token }); //devolvemos un nuevo token
        }
        catch (error) {
            res.status(500).json(error);
        }
    }
    else {
        res.status(403).json({ error: 'You can update only your account!' });
    }
}

exports.updateProfilePicture = async (req, res) => {
    try {
        console.log(req.body.filename);
        const filename = req.body.filename;
        const findUser = await User.findById(req.params.id);

        const updateImg = {
            profilePicture: `${HOST}:${PORT}/public/images/persons/profile/${filename}`
        }
        await findUser.updateOne({ $set: updateImg });

        const findUpdate = await User.findById(req.params.id)
        const { password, ...other } = findUpdate._doc;

        const token = jwt.sign({ ...other }, JWT_CLAVE);
        res.status(200).json({ token }); //devolvemos un nuevo token

    }
    catch (error) {
        console.log(error.message);
        res.status(500).json(error);
    }
}

exports.updateCoverPicture = async (req, res) => {
    try {
        console.log(req.body.filename);
        const filename = req.body.filename;
        const findUser = await User.findById(req.params.id);

        const updateImg = {
            coverPicture: `${HOST}:${PORT}/public/images/persons/cover/${filename}`
        }
        await findUser.updateOne({ $set: updateImg });

        const findUpdate = await User.findById(req.params.id)
        const { password, ...other } = findUpdate._doc;

        const token = jwt.sign({ ...other }, JWT_CLAVE);
        res.status(200).json({ token }); //devolvemos un nuevo token

    }
    catch (error) {
        console.log(error.message);
        res.status(500).json(error);
    }
}

exports.deleteUser = async (req, res) => {
    if (req.body.userId === req.params.id || req.body.isAdmin) {
        //update user => debemos de hacer el caso de editar email
        try {
            const user = await User.findByIdAndDelete({ _id: req.params.id });
            res.status(200).json({ msg: 'Account has been deleted' });
        }
        catch (error) {
            res.status(500).json(error);
        }
    }
    else {
        res.status(403).json({ error: 'You can update only your account!' });
    }
}


//users?username=jhon  or  users?userId=21213232
exports.getUser = async (req, res) => {
    const userId = req.query.userId;
    let username = req.query.username && req.query.username.replace('%', ' ');


    try {
        const findUser = userId
            ? await User.findById(userId)
            : await User.findOne({ username });

        const { password, updateUser, ...other } = findUser._doc;
        res.status(200).json(other)
    }
    catch (error) {
        res.status(403).json({ error: 'user not found!' });
    }
}


exports.verificationEmail = async (req, res) => {
    try {
        const findEmail = await User.find({ email: req.body.email });
        if (findEmail.length === 1 || findEmail.length > 1)
            return res.status(300).json({ error: 'el correo electronico ya existe' })
        res.status(200).json({ msg: 'correo nuevo valido' })
    }
    catch (error) {
        console.log(error);
        res.status(500).json({ error: 'Ocurrio un error inesperado' })
    }
}


//ordenar por nombre y apellido
exports.getFriends = async (req, res) => {
    // const as = ['torreto gomez', 'alma camacho', 'pedro gomez','torrico alex', 'zamanta fernando']

    console.log('entro al get friends ')
    try {
        const { page = PAGE , limite = LIMIT} = req.query;
        const { pag, limit } = parseValues(limite, page);

        const userFriends = await User.findById(req.params.userId);

        const friends = await Promise.all(
            userFriends.followings.map(friendId => {
                return User.findById(friendId)
            })
        )
        let friendList = [];
        
        friends.map(friend => {
            const { _id, username, profilePicture } = friend;
            friendList.push({ _id, username, profilePicture })
        })

        let start = 0;

        if (pag > 1) start = limit + ((pag - 2) * 10) - ((pag - 2) * 5)
        // if (pag > 1) start = (pag * limit) - limit //esto es universal

        
        const ordenFriendList = friendList.slice(start, pag * limit);
        //esto nos ayudara a evitar mas renderizados
        const next = friendList.slice(start, (limit * pag) + 1).length === limit + 1 

        res.status(200).json({
            docs: ordenFriendList,
            next 
        })
    }
    catch (error) {
        console.error(error);
        res.status(500).json({error: error.message})
    }
}


exports.follow = async (req, res) => {
    // console.log('entro en el follow', req.body.userId);
    if (req.body.userId !== req.params.id) {
        try {
            const user = await User.findById(req.params.id)
            const currentUser = await User.findById(req.body.userId)

            if (!user.followers.includes(req.body.userId)) {
                await user.updateOne({ $push: { followers: req.body.userId } })
                await currentUser.updateOne({ $push: { followings: req.params.id } })
                res.status(200).json({ msg: 'user has been followed' })
            } else {
                res.status(403).json({ error: 'you allready follow this user' })
            }
        }
        catch (error) {
            res.status(500).json({ error });
        }
    } else {
        res.status(403).json({ error: "you cant follow yourself" })
    }
}

//necesario un userId para dar unfollow
exports.unFollow = async (req, res) => {
    // console.log('entro en el unfollow', req.params.id, req.body.userId);
    if (req.body.userId !== req.params.id) {
        try {
            const user = await User.findById(req.params.id)
            const currentUser = await User.findById(req.body.userId)

            if (user.followers.includes(req.body.userId)) {
                await user.updateOne({ $pull: { followers: req.body.userId } })
                await currentUser.updateOne({ $pull: { followings: req.params.id } })
                res.status(200).json({ msg: 'user has been unfollowed' })
            } else {
                res.status(403).json({ error: 'you dont follow this user' })
            }
        }
        catch (error) {
            res.status(500).json({ error });
        }
    } else {
        res.status(403).json({ error: "you cant unfollow yourself" })
    }
}


//para buscar a una persona
exports.findUsers = (req, res) => {
    // console.log('buscando a un usuario');
    try {
        const { username: usernameSearch } = req.body;
        let { limit = LIMIT, page = PAGE } = req.query;
        // console.log('limit', limit, 'page', page);

        if (limit > 10) limit = 10;

        if (usernameSearch === '')
            return res.status(200).json({ msg: 'no se encontro a alguien con ese nombre' })

        const findUser = User.paginate({
            username: { $regex: usernameSearch, $options: 'i' }
        }, {
            limit,
            page
        }, (err, users) => {

            if (err) return res.status(300).json({ err });

            let resul = [];

            const { docs, ...others } = users;

            users && docs.map(us => {
                const { password, createdAt, __v, desc, updatedAt, isAdmin, ...other } = us._doc;
                return resul.push(other);
            })

            res.status(200).json({ users: resul, ...others })
        });

    }
    catch (error) {
        console.log(error.message);
        res.status(500).json(error)
    }
}

