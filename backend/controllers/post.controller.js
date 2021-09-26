const { LIMIT, PAGE } = require("../config/config");
const Post = require("../models/post.models");
const User = require("../models/user.model");
const { parseValues } = require("../utils/controller.util");



exports.createPost = async (req, res) => {
    try {
        let newPost = null;

        //porque tiene imagen
        if (req.body.filename) {
            const { filename, ...other } = req.body;
            newPost = new Post(other);
            newPost.setImgUrl(filename);
        }
        else {
            newPost = new Post(req.body);
        }

        const savePost = await newPost.save();

        res.status(200).json(savePost)
    }
    catch (error) {
        res.status(500).json(error.message)
    }
}

exports.updatePost = async (req, res) => {
    const { ...body } = req.body;

    console.log(body);
    //debemos implementar la validacion del userId
    try {
        const findPost = await Post.findById(req.params.id);

        if (findPost.userId === req.body.userId) {
            await findPost.updateOne({ $set: body });
            res.status(200).json({ msg: "the post has been update" });
        }
        else {
            res.status(403).json({ error: "you can update only your post" })
        }
    }
    catch (error) {
        res.status(500).json(error)
    }
}

exports.deletePost = async (req, res) => {
    //debemos implementar la validacion del userId
    try {
        const findPost = await Post.findById(req.params.id);

        if (findPost.userId === req.body.userId) {
            await findPost.deleteOne();
            res.status(200).json({ msg: "the post has been delete" });
        }
        else {
            res.status(403).json({ error: "you can delete only your post" })
        }
    }
    catch (error) {
        res.status(500).json(error)
    }
}

exports.likePost = async (req, res) => {

    //buscamos el post
    const findPost = await Post.findById(req.params.id);

    if (!findPost) return res.status(400).json({ error: 'post no exist' })

    //verificamos si el post tiene ya el like
    if (!findPost.likes.includes(req.body.userId)) {
        await findPost.updateOne({ $push: { likes: req.body.userId } })
        res.status(200).json({ msg: 'the post has been liked' })
    } //caso contrario dislike
    else {
        await findPost.updateOne({ $pull: { likes: req.body.userId } })
        res.status(200).json({ msg: 'the post has been disliked' })
    }
}

exports.getPost = async (req, res) => {
    try {
        const findPost = await Post.findById(req.params.id)
        res.status(200).json(findPost)
    }
    catch (error) {
        res.status(500).json(error)
    }
}

exports.getTimelinePost = async (req, res) => {
    console.log('entro al timeline')
    try {
        console.log(req.querry);
        let { limite = LIMIT, page = PAGE } = req.query;

        let { limit, pag } = parseValues(limite, page);

        const currentUser = await User.findById(req.params.userId);
        const userPosts = await Post.find({ userId: currentUser._id })

        //nos traemos a los posts de sus amigos tambien
        const friendPosts = await Promise.all(
            currentUser.followings.map(friendId => {
                return Post.find({ userId: friendId })
            })
        ); //este resultado debemos ordenarlo por medio de si fecha de creacion

        //juntamos postuser y postFriends
        const posts = [...userPosts, ...friendPosts];

        const reducePosts = posts.reduce((acc, post) => acc.concat(post), []);

        let start = 0;

        if (page > 1) {
            start = limit + ((pag - 2) * 10)
        }

        const ordenPosts = reducePosts.sort((p1, p2) => {
            return new Date(p2.createdAt) - new Date(p1.createdAt)
        }).slice(start, pag * limit); // aqui enviamos solo 10 dats

        res.status(200).json({ docs: ordenPosts });
    }
    catch (error) {
        res.status(500).json(error)
    }
}


exports.getUserPosts = async (req, res) => {
    console.log('entro al get post ', req.params);
    try {
        let username = req.params && req.params.username.replace('%', ' ');

        const { page = PAGE } = req.query;
        let { limit, pag } = parseValues( LIMIT, page);

        const findUser = await User.findOne({ username });
        const posts = await Post.find({ userId: findUser._id })

        let start = 0;

        if (page > 1) {
            start = limit + ((pag - 2) * 10)
        }

        let ordenPosts = posts.sort((p1, p2) => {
            return new Date(p2.createdAt) - new Date(p1.createdAt)
        }).slice(start, pag * limit)

        res.status(200).json({ docs: ordenPosts })
    }
    catch (error) {
        console.error(error)
        res.status(500).json(error)
    }
}


exports.deleteEmptyPosts = async (req, res) => {
    try {
        const posts = await Post.find({ desc: '', img: { $exists: false } })
        const deleted = await Promise.all(
            posts.map(p => {
                return p.deleteOne()
            })
        )
        res.status(200).json({ msg: 'ok' })
    }
    catch (error) {
        res.status(500).json(error)
    }
}


