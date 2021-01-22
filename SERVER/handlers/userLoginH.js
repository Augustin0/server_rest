const User = require("../modelos/user");
const { compareSync } = require("bcrypt");
const jwt = require("jsonwebtoken");


const handlers = {
    loginH(req, res) {
        let userInfo = req.body;
        User.findOne({ email: userInfo.email }, (err, userDB) => {
            if (err != null) {
                return res.status(505).json({ error: true, message: err })
            };
            if (!userDB) {
                return res.status(400).json({ error: true, message: '[Usuario] o contraseña incorrecta' });
            }
            if (!compareSync(userInfo.password, userDB.password)) {
                return res.status(400).json({ error: true, message: 'Usuario o [contraseña] incorrecta' });
            }
            let token = jwt.sign({ user: userDB }, process.env.TOKEN_SEED, { expiresIn: process.env.EXPIRED_TIME_TOKEN })

            res.json({ err: false, data: { userDB, token } })

        });
    }
};
module.exports = {
    handlers
}