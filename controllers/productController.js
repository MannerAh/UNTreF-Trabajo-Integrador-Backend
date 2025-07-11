const mongoose = require('mongoose');
const express = require('express');
const { Product } = require('../models/computacion');
const { connectDB } = require('../config/database');


// GET /productos
const getAllProducts = async (req, res) => {
    try {
        connectDB();
        const products = await Product.find()
        res.status(200).json(products);
    } catch (error) {
        res.status(500).json({ error });
    }
}

// GET /productos/:codigo
const getProductByCode = async (req, res) => {
    try {
        connectDB();
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
const postProduct = async (req, res) => {
    const { nombre, precio, categoria } = req.body;
    try {
        let codigo;
        let codigoExiste = true;
    connectDB();
        while (codigoExiste) {
            codigo = Math.floor(1000 + Math.random() * 9000); // Genera un código aleatorio
            const existingProduct = await Product.findOne({ codigo });
            if (!existingProduct) {
                codigoExiste = false;
            }
        }
        // Crear un nuevo producto
        const newProduct = new Product({
            nombre,
            precio,
            categoria,
            codigo: codigo
        })

        await newProduct.save();
        res.status(201).json({ message: 'Product created succesfully', newProduct });
        } catch (error) {
            res.status(500).json({ error });
        }
}

// PUT /productos/:codigo
const patchProduct = async (req, res) => {
    const { nombre, precio, categoria } = req.body;
    const code = parseInt(req.params.codigo);
    try {
        connectDB();
        const product = await Product.findByOneAndUpdate(code, {nombre, precio, categoria});
        if (!product) {
            res.status(404).json({ error: 'Product not found' });
        } else {
            res.status(200).json({ message: 'Product updated succesfully', product });
        }
    } catch (error) {
        res.status(500).json({ error })
    }
}


// DELETE /productos/:codigo
const deleteByCode = async (req, res) => {
    const code = parseInt(req.params.codigo);
    try {
        connectDB();
        const product = await Product.findOneAndDelete(code); 
        if (!product) {
            res.status(404).json({ error: 'Product not found' });
            } else {
            res.status(200).json({ message: 'Product deleted succesfully', product });
        }
    } catch (error) {
        res.status(500).json({ error });
    }
}

// GET /productos/buscar


// GET /productos/categoria/:nombre


// GET /productos/precio/:min-:max


// POST /productos/masivo


module.exports = { getAllProducts, }