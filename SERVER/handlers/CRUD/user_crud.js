const User = require("../../modelos/user");
const { print, _, eliminarFile } = require("../../utils").utils;
const { hashSync } = require("bcrypt");

const crud = {

    create(body) {
        return new Promise((resolv, reject) => {

            let user = new User({
                nombre: body.nombre,
                email: body.email,
                password: hashSync(body.password, 10),
                role: body.role
            });

            user.save((err, data) => {


                if (err) {
                    reject(err);
                }
                resolv(data)
            })
        })
    },

    read(origen, limite) {
        return new Promise((resolv, reject) => {
            User.find({ estado: true })
                .skip(origen)
                .limit(limite)
                .exec((err, users) => {
                    if (err) {
                        reject(err);
                        return
                    }
                    User.count({ estado: true }, (err, count) => {
                        if (err) {
                            reject(err);
                            return
                        }
                        resolv({ users, total: count })
                    })
                });

        })
    },

    update(id, body) {
        return new Promise((resolv, reject) => {
            User.findByIdAndUpdate(id, body, { new: true, runValidators: true }, (err, data) => {
                if (err) {
                    reject(err);
                    return
                }
                resolv(data)
            })
        })
    },




    delet_e(id) {
        return new Promise((resolv, reject) => {
            User.findByIdAndUpdate(id, { new: true, runValidators: true }, (err, userInvalid) => {
                userInvalid.estado = false;
                new User(userInvalid).save((err, data) => {
                    if (err) {
                        reject(err);
                        return
                    }
                    resolv(userInvalid)
                })


            });
        });
    },
    userIamgeUp(id, fileName, tipo) {
        return new Promise((resolve, reject) => {
            User.findById(id, (err, userData) => {

                if (err != null) {
                    reject({ error: true, message: err });
                    return;
                }
                if (!userData) {
                    reject({ error: true, message: `No se ha encontrado ningun usuario con el id ${id}` });
                    return;
                }
                eliminarFile(userData.img, tipo.tipo).then(() => {
                    userData.img = fileName;
                    userData.save((err, exito) => {
                        if (err != null) {
                            reject({ error: true, message: err });
                            return;
                        }
                        resolve({ err: false, message: "Imagen guardada con exito" });
                    })
                })
            })
        })

    }


};

module.exports = {
    crud
}