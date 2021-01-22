const { Schema, model } = require("mongoose");

const Product = new Schema({
    nombre: {
        type: String,
        required: true
    },

    precio: {
        type: Number,
        required: true
    },

    description: {
        type: String,
        default: "Product description"
    },
    img: {
        type: String,
    },

    unidad:{
      type:String,
      required:true
    },
    total: {
        type: Number,
        default: 1
    },
    
    exist: {
        type: Boolean,
        default: true,

    }

});

module.exports = model("product", Product);