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
        type: Array,
        required: true,
    }
})

const Product = mongoose.model('tienda', ProductSchema);

module.exports = { Product };