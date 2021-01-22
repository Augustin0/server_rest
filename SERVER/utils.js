const { unlinkSync, existsSync } = require("fs");
const path = require("path");
const mongoos = require("mongoose");


const utils = {
    print(data) {
        console.log(data);
    },
    _(obj, campos) {
        let result = {};
        campos.forEach(campo => {
            result[campo] = obj[campo]
        })
        return result
    },

    validarExtens(fileName) {
        let exten = fileName.split(".");
        let valid = ['mp4', 'pdf'].includes(exten[exten.length - 1]);
        return { valid, ext: exten[exten.length - 1] }

    },
    validarTipo(tipo) {
        let valid = ['usuario', 'producto'].includes(tipo);
        return { valid, tipo }

    },
    eliminarFile(fileName, tipo) {
        return new Promise((resolve, reject) => {
            let imgPath = path.resolve(__dirname, `../upload/${tipo}/${fileName}`);
            if (existsSync(imgPath)) {
                unlinkSync(imgPath);
            }
            resolve(true)
        })
    },
    initDatabase(host) {
        mongoos.connect(`mongodb://${host}/cafe`, (err) => {
            if (err) return err + "".red;
            console.log("Base de datos conectado con exito".green);
        });

    },

};

module.exports = {
    utils
}