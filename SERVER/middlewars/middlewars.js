/*
 * @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@ 
 *                                          ASEGURAR ACCESO  TOKEN 
 * @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@
 */
const verify = require("jsonwebtoken").verify;
const middlewars = {
    tokenIsValid(req, res, next) {
        let token = req.get('validUser');
        verify(token, process.env.TOKEN_SEED, (err, dekoder) => {
            if (err != null) {
                return res.status(401).json({ error: true, message: err })
            }
            req.usuario = dekoder.user;
            next()
        })
    },


    imageSeuryty(req, res, nex) {


    }

};

module.exports = {
    middlewars
}