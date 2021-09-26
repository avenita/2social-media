const jwt = require('jsonwebtoken');
const { JWT_CLAVE } = require('../config/config');

//funcion que nos ayuda a determinar el token y con esto extraer el token y desifrarlo en el objeto y buscar con el id del objeto que extraimos si existe o no 
exports.userExtractor = (req, res, next) => {
    console.log('entro al extractor')
    try {
        const authorization = req.get('authorization');
        let token = ''
        if (authorization && authorization.toLowerCase().startsWith('bearer')) {
            token = authorization.substring(7);
        }
        const decodeToken = jwt.verify(token, JWT_CLAVE);

        if (!token || !decodeToken._id) {
            return res.status(401).json({ error: 'token missing or invalid' })
        }

        const { _id } = decodeToken

        req.userId = _id;

        next()

    } catch (error) {
        return res.status(404).json({ error: 'token is required' })
    }

}