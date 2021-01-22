const database = require("../dabase.json");
const { _, validarExtens, validarTipo } = require("../utils").utils;
const { delet_e, create, update, read, userIamgeUp } = require("./CRUD/user_crud").crud;



const handlers = {

    postUser(req, res) {
        let body = req.body
        create(body).then(data => {
            res.json(data)

        }).catch((err) => {
            res.status(400).json({
                ok: false,
                err: err
            })
        });
    },

    putUser(req, res) {
        let id = req.params.id;
        let body = _(req.body, ["nombre", "emil"]);
        update(id, body).then(data => {
            res.json(data);
        }).catch(err => {
            res.status(400).json({
                ok: false,
                err: err
            })
        })

    },


    getUser(req, res) {
        let origen = Number(req.query.origen)
        limite = Number(req.query.limite),


            read(origen, limite).then(users => {
                res.json(users)
            }).catch(err => {
                res.status(400).json({
                    ok: false,
                    err
                })
            })
    },



    deleteUser(req, res) {
        let id = req.params.id;
        delet_e(id).then(user => {
            res.json(user)

        }).catch(err => {
            res.statu(400).json({
                ok: false,
                err
            })
        })
    },



    uploadFile: (req, res) => {

        if (!req.files) {
            res.send(400).json({ error: true, message: "No se ha identificado ningun archivo" });


            return
        }
        let file = req.files.file;
        let valid = validarExtens(file.name);
        let tipo = validarTipo(req.params.tipo);
        if (!valid.valid) {
            res.status(400).json({
                error: true,
                message: `La extension ${valid.ext} no es valida exten valid  mp4 , pdf`
            });
            return
        }

        if (!tipo.valid) {
            res.status(400).json({
                error: true,
                message: `El tipo ${tipo.tipo} no es valido, validos {usuario, productos} `
            });
            return
        }
        file.name = `${req.params.id}-${new Date().getMilliseconds()}.${valid.ext}`

        userIamgeUp(req.params.id, file.name, tipo).then((message) => {
            file.mv(`upload/${tipo.tipo}/${file.name}`, (err) => {
                if (err)
                    res.status(505).json({ err: true, message: err })
                else
                    res.json(message);

            })
        }).catch((err) => {
            res.status(400).json(err)
        })

    }
}

module.exports = {
    handlers
}