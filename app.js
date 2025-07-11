const express = require('express');
const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());

// Routes

// GET /productos
app.get('/productos', require('./routes/productRoutes'));

// POST /productos
app.post('/productos', require('./routes/productRoutes'));



// GET /productos/:codigo
app.get('/:codigo', getProductByCode);

// PUT /productos/:codigo
app.put('/:codigo', patchProduct);

// DELETE /productos/:codigo
app.delete('/:codigo', deleteByCode);

app.listen(port, () => {
    console.log(`Servidor corriendo en el puerto ${port}`);
});