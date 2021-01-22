const { Schema, model } = require("mongoose");
const uniqValidator = require("mongoose-unique-validator");

const roles = {
    values: ["admin", "tercero", "USER_ROLE"],
    message: '{VALUE}, no es un role valido'
}

const userFields = new Schema({

    nombre: {
        type: String,
        required: [true, 'El nombre de el user es obligatorio'],
    },

    email: {
        type: String,
        required: [true, 'El email es obligatorio'],
        unique: true,

    },

    password: {
        type: String,
        required: [true, 'El password es obligatorio']
    },

    img: {
        type: String,
    },
    role: {
        type: String,
        default: "USER_ROLE",
        enum: roles
    },

    estado: {
        type: Boolean,
        default: false
    },

    auth: {
        type: Boolean,
    }

});

userFields.methods.toJSON = function() {
    let user = this;
    let userData = user.toObject();
    delete userData.password;
    return userData;
}

userFields.plugin(uniqValidator);
module.exports = model("user", userFields);