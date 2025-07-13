const { Product } = require('../models/computacion');
const connectDB  = require('../config/database');

// GET /productos
const getAllProducts = async (req, res) => {
    try {
        console.log('📡 Intentando conectar a la base de datos...');
        await connectDB();
        
        console.log('🔍 Buscando productos en la base de datos...');
        const products = await Product.find();
        
        console.log(`✅ Se encontraron ${products.length} productos`);
        res.status(200).json(products);
    } catch (error) {
        console.error('❌ Error en getAllProducts:', error);
        // Devolver el mensaje de error real
        res.status(500).json({ 
            error: error.message,
            stack: error.stack // Solo para debugging, quitar en producción
        });
    }
}

// GET /productos/:codigo
const getProductByCode = async (req, res) => {
    try {
        connectDB();
        const code = parseInt(req.params.codigo);
        const output = await Product.findOne({ codigo: code });
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
        const product = await Product.findOneAndUpdate({ codigo: code }, { nombre, precio, categoria });
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
        const product = await Product.findOneAndDelete({codigo: code}); 
        if (!product) {
            res.status(404).json({ error: 'Product not found' });
            } else {
            res.status(200).json({ message: 'Product deleted succesfully', product });
        }
    } catch (error) {
        res.status(500).json({ error });
    }
}

// GET /productos/buscar?q={termino_de_busqueda}
const getProductByQuery = async (req, res) => {
    try {
        connectDB();
        const { q } = req.query;

        if (!q) {
            return res.status(400).json({ error: 'No query provided' });
        }
        const products = await Product.find({
            nombre: { $regex: q, $options: 'i' }})
        res.status(200).json(products);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

// GET /productos/categoria/:nombre
const getProductByCategory = async (req, res) => {
    try {
        connectDB();
        const { nombre } = req.params;

        // Buscar productos con el nombre especificado en su array de categorias
        const products = await Product.find({
            categoria: { $in: [nombre] }
        })
        res.status(200).json(products);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

// GET /productos/precio/:min-:max
const getProductByPrice = async (req, res) => {
    try {
        connectDB();
        const { min, max } = req.params;

        const minPrice = parseFloat(min);
        const maxPrice = parseFloat(max);

        if (isNaN(minPrice) || isNaN(maxPrice)) {
            return res.status(400).json({ error: 'Prices must be valid' });
        }
        if (minPrice > maxPrice) {
            return res.status(400).json({ error: 'Invalid price range' });
        }

        const products = await Product.find({
            precio: {$gte: minPrice, $lte: maxPrice}
        })
        res.status(200).json(products);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

// POST /productos/masivo
const multipleProducts = async (req, res) => {
    try {
        connectDB();
        const { products } = req.body;
    } catch (error) {
    res.status(500).json({ error: error.message });
    }
}

module.exports = { 
    getAllProducts,
    getProductByCode,
    postProduct,
    patchProduct,
    deleteByCode,
    getProductByQuery,
    getProductByCategory,
    getProductByPrice,
    multipleProducts
}