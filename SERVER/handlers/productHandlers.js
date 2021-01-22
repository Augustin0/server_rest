const {get, post, put, delet_e, pubImage } = require("./CRUD/product_crud");
const { validarExtens, validarTipo, } = require("../utils").utils

const handlers = {

    postProduct(req, res) {
        const product = req.body;
        post(product).then(data => {
            res.json(data)
        }).catch(err => {
            res.status(505).json(err);
        })
    },

    getProduct(req, res) {
        get(Number(req.query.start), Number(req.query.end)).then(data => {
            res.json(data)

        }).catch(err => {
            res.status(404).json(err)
        })

    },
    putProduct(req, res) {
        let id = req.query.id,
            newProduct = req.body;
        put(id, newProduct).then(_newProduct => {
            res.json(_newProduct)
        }).catch(err => {
            res.status(400).json(err)
        })
    },
    deleteProduct(req, res) {
        let id = req.query.id;

        delet_e(id).then(data => {
            res.json({ message: `Producto ${data._id} eliminado con exito` })

        }).catch(err => {
            res.status(400).json(err)
        })
    },
    subirIMG(req, res) {
        if (!req.files) {
            res.status(400).json({ err: true, message: "No se ha iidentificado ningu archivo" });
            return
        }
        let file = req.files.file;
        let valid = validarExtens(file.name);
        let tipo = validarTipo(req.params.tipo);
        if (!tipo.valid) {
            res.status(400).json({ error: true, message: `El tipo ${tipo.tipo} no es valido, tipos validos {usuario,producto}` })
            return
        }
        if (!valid.valid) {
            res.status(400).json({ error: true, message: `La exntension ${valid.ext} no es valida, los archivos validos  son : {mp4,pdf}` })
            return
        }
        let filName = `${file.name}${req.params.id}-${new Date().getMilliseconds()}.${valid.ext}`;
        pubImage(req.params.id, filName, tipo.tipo).then(success => {
            file.mv(`upload/${tipo.tipo}/${file.name}`, (err) => {
                if (err != null) {
                    res.status(505).json("Error de el servidor no pudimos subir el archivo");
                    return
                }
                res.json({ message: "Imagen Guardato con exito", data: success })
            })
        }).catch(err => {
            res.status(400).json(err)
        })

    }


}

module.exports = handlers;