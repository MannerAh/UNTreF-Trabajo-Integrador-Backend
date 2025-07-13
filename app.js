const express = require('express');
const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());

// Routes

// GET /productos
app.use('/productos', require('./routes/productRoutes'));

// POST /productos
app.use('/productos', require('./routes/productRoutes'));

// GET /productos/:codigo
app.use('/:codigo', require('./routes/productRoutes'));

// PUT /productos/:codigo
app.use('/:codigo', require('./routes/productRoutes'));

// DELETE /productos/:codigo
app.use('/:codigo', require('./routes/productRoutes'));


// Endpoints adicionales

// GET /productos/buscar?q={termino_de_busqueda}
app.use('/productos/buscar', require('./routes/productRoutes'));

// GET /productos/categoria/:nombre
app.use('/productos/categoria/:nombre', require('./routes/productRoutes'));

// GET /productos/precio/:min-:max
app.use('/productos/precio/:min-:max', require('./routes/productRoutes'));

// POST /productos/masivo
app.use('/productos/masivo', require('./routes/productRoutes'));

app.listen(port, () => {
    console.log(`Servidor corriendo en http://localhost:${port}`);
});