const mongoose = require('mongoose');
const express = require('express');
const { Product } = require('../models/computacion');
const connectDB = require('../config/database');


// GET /productos
const getAllProducts = async (req, res) => {
    try {
        const products = await Product.find()
        res.status(200).json(products);
    } catch (error) {
        res.status(500).json({ error });
    }
}

// GET /productos/:codigo
const getProductByCode = async (req, res) => {
    try {
        const output = await Product.findById(req.params.codigo);
        if (!output) {
            res.status(404).json({ error: 'Producto no encontrado' });
        } else {
            res.status(200).json(output);
        }
     } catch (error) {
            res.status(500).json({ error });
       }
}

// POST /productos


// PUT /productos/:codigo


// DELETE /productos/:codigo


// GET /productos/buscar


// GET /productos/categoria/:nombre


// GET /productos/precio/:min-:max


// POST /productos/masivo


module.exports = { getAllProducts, }