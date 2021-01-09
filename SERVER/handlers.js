const database = require("./dabase.json");
const { print } = require("./utils").utils;

const handlers = {
    postUser(req, res) {
        let user = req.body;
        if (user.id === undefined) {
            res.status(400).json({
                OK: false,
                code: 400,
                messsage: `No podemos agregar un usuario con id ${user.id}`
            })
        } else {
            database.push(user);
            res.json(`Usuario ${user.id} agregado con exito`)
        }
    },

    getUser(req, res) {
        let id = req.params.id;
        if (id) {
            let found = false
            database.forEach(user => {
                if (user.id == id) {
                    found = true
                    res.json(user)

                }
            });
            if (!found)
                res.status(404).json({
                    OK: false,
                    code: 404,
                    error: true,
                    messsage: `no se pudo encontrar el user con el ${id}`
                })
        } else {
            res.json(database)
        }
    },


    putUser(req, res) {

        res.json("PUT USER BY ID")
    },
    deleteUser(req, res) {
        res.json("DELETE USER BY ID")
    }

};
module.exports = {
    handlers
}