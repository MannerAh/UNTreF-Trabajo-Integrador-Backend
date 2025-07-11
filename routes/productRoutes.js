const express = require('express');
const { getAllProducts, getProductByCode, postProduct, patchProduct, deleteByCode, getProductByQuery, getProductByCategory, getProductByPrice, multipleProducts } = require('../controllers/productController');
const router = express.Router();

// GET /productos
router.get('/', getAllProducts);

// POST /productos
router.post('/', postProduct);

// GET /productos/buscar?q={termino_de_busqueda}
router.get('/buscar', getProductByQuery);

// GET /productos/categoria/:nombre
router.get('/categoria/:nombre', getProductByCategory);

// GET /productos/precio/:min-:max
router.get('/precio/:min-:max', getProductByPrice);

// POST /productos/masivo
router.post('/masivo', multipleProducts);

// GET /productos/:codigo
router.get('/:codigo', getProductByCode);

// PUT /productos/:codigo
router.put('/:codigo', patchProduct);

// DELETE /productos/:codigo
router.delete('/:codigo', deleteByCode);

module.exports = router;