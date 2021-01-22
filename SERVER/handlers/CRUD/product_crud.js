const Product = require("../../modelos/producto");
const { eliminarFile } = require("../../utils").utils

const crud = {
    post(product) {
        return new Promise((resolve, reject) => {
            new Product({
                nombre: product.nombre,
                precio: product.precio,
                total: product.total,
                description: product.description,
                img: product.img,
                unidad: product.unidad
            }).save((err, result) => {

                if (err != null) { reject({ error: true, message: err }) } else {
                    resolve({ error: false, data: result })

                }
            });
        })
    },
    get(start, end) {
        return new Promise((resolve, reject) => {
            Product.find({ exist: true }).skip(start).limit(end).exec((err, products) => {
                if (err != null) {
                    reject({ error: true, message: err })
                } else {
                    resolve({ error: false, data: products })
                };
            })
        })
    },
    put(id, newProduct) {
        return new Promise((resolve, reject) => {
            Product.findByIdAndUpdate(id, newProduct, { new: true, runValidators: true }, (err, data) => {
                if (err != null) {
                    reject({ err })
                    return
                }
                resolve({ data })
            })
        })
    },
    delet_e(id) {

        return new Promise((resolve, reject) => {

            Product.findByIdAndUpdate(id, { new: true, runValidators: true }, (err, data) => {
                data.exist = false;
                new Product(data).save((err, data) => {
                    if (err != null) {
                        reject({ err })
                        return
                    }
                    resolve(data)
                })
            })
        })
    },
    pubImage(id, fileName, tipo) {
        return new Promise((resolve, reject) => {
            Product.findById(id, (err, data) => {
                if (err != null) {
                    reject({ err: true, message: err })
                    return
                }

                if (!data) {
                    reject({ err: true, message: `No existe any producto con el id ${id}` })
                    return
                }

                eliminarFile(data.igm, tipo).then(() => {
                    data.img = fileName;
                    new Product(data).save((err, result) => {
                        if (err != null) {
                            reject({ error: true, message: err })
                            return
                        }
                        resolve(result)
                    })
                })
            })
        })
    }

}
module.exports = crud