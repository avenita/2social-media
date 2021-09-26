const jwt = require('jsonwebtoken');
const User = require('../models/user.model');
const {JWT_CLAVE} = require('../config/config');

const bcrypt = require('bcrypt');

exports.signup = async (req, res) => {
    console.log('entro al signup', req.body);
    const { username, password, email } = req.body;

    try {
        let findUser = await User.findOne({ email });
        if (findUser)
            return res.status(404).json({ error: 'usuario ya registrado' })

        //generator new password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        const newUser = new User({
            username,
            email,
            password: hashedPassword
        })
        const user = await newUser.save();

        res.status(200).json(user)
    }
    catch (error) {
        res.status(500).json({ error });
    }

}

exports.signin = async (req, res) => {
    try {
        //vemos si existe el user
        const user = await User.findOne({ email: req.body.email });

        const validPassword = user === null 
            ? false
            : await bcrypt.compare(req.body.password, user.password);

        if (!(validPassword && user)) {
            return res.status(404).json({ error: 'email or password incorrect' });
        }
             
        //validation password
        const { password, ...other } = user._doc;

        const dateToke = {
            ...other
        }
        
        const token = jwt.sign(dateToke, JWT_CLAVE);

        //debemos averiguar para que sirve
        // res.cookie('t', token, { expire: new Date() + 9999 })//b

        //response exite
        // res.status(200).json({
        //     token
        // });
        // res.status(200).json(user)
        res.status(200).json({token}) //listo para el token
    } 
    catch (error) {
        console.log(error);
        res.status(500).json(error)
    }
}


exports.signout = async (req, res) => {
    try {
        await res.clearCookie('t');
        await res.json({message:"Signout success"});
    } 
    catch (error) {
        await res.json({error: error.message});
    }
}


