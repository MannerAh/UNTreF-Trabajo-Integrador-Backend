const express = require('express');
const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());

// Routes

// GET /productos (Ver TODOS  los productos)
app.use('/productos', require('./routes/productRoutes'));

// POST /productos (Crear un nuevo producto)
app.use('/productos', require('./routes/productRoutes'));

// GET /productos/:codigo (Obtener un producto por su código)
app.use('/:codigo', require('./routes/productRoutes'));

// PUT /productos/:codigo (Modificar un producto existente mediante el código)
app.use('/:codigo', require('./routes/productRoutes'));

// DELETE /productos/:codigo (Eliminar un producto mediante el código)
app.use('/:codigo', require('./routes/productRoutes'));


// Endpoints adicionales

// GET /productos/buscar?q={termino_de_busqueda} (Buscar productos por término)
app.use('/productos/buscar', require('./routes/productRoutes'));

// GET /productos/categoria/:nombre (Filtrar productos por categoría)
app.use('/productos/categoria/:nombre', require('./routes/productRoutes'));

// GET /productos/precio/:min-:max (Filtrar productos por rango de precio)
app.use('/productos/precio/:min-:max', require('./routes/productRoutes'));

// POST /productos/masivo (Carga masiva de productos)
app.use('/productos/masivo', require('./routes/productRoutes'));



app.listen(port, () => {
    console.log(`Servidor corriendo en http://localhost:${port}`);
});