const express = require('express');
const { getAllProducts, getProductByCode, postProduct, patchProduct, deleteByCode, getProductByQuery, getProductByCategory, getProductByPrice, multipleProducts } = require('../controllers/productController');
const router = express.Router();

// GET /productos/buscar?q={termino_de_busqueda}
router.get('/buscar', getProductByQuery);

// GET /productos/categoria/:nombre
router.get('/categoria/:nombre', getProductByCategory);

// GET /productos/precio/:min-:max
router.get('/precio/:min-:max', getProductByPrice);

// POST /productos/masivo
router.post('/masivo', multipleProducts);

// GET /productos
router.get('/', getAllProducts);

// POST /productos
router.post('/', postProduct);

// GET (Get a product)/productos/:codigo
router.get('/:codigo', getProductByCode);

// PUT (Update a product)
router.put('/:codigo', patchProduct);

// DELETE (Delete a product) /productos/:codigo
router.delete('/:codigo', deleteByCode);

module.exports = router;