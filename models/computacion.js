const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ProductSchema = new Schema({
    codigo: {
        type: Number,
    },
    nombre: {
        type: String,
        required: true,
        unique: true,
    },
    precio: {
        type: Number,
        required: true,
    },
    categoria: {
        type: [String],
        required: true,
        minlength: 1
    }
})

const Product = mongoose.model('producto', ProductSchema);

module.exports = { Product };