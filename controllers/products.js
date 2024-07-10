const Productos = require('../models/product');


const obtenerTodosLosProductos = async (req, res) => {
    const products = await Productos.find();
    
    console.log('Todo bien, se realizo la busqueda')
    res.render('page/shop', {products: products})

}


const carritoDeCompras = async (req, res) => {
    console.log('Esta funcion muestra el carrito');     

    const idReq = { _id: req.params.id };
    let products = await Productos.findOne(idReq)
        .then(product => {
            res.render('page/carrito',{ product });
            console.log('El resultado es', product)
        })
        .catch(error => {
            console.log(error)
        })

}

//Buscar por categorias
const buscarPorSalado = async (req, res) => {
    try {

        const productos = await Productos.find({ categoria: 'Salado' });
        res.status(200).json({ productos, numProducts: productos.length });

    } catch (error) {

        console.error('Error al obtener productos de la categoria', error)
        res.status(500).json({ error: `Error al obtener productos de la categoria ${categoria}` });
    }
}

const buscarPorDulce = async (req, res) => {
    try {

        const productos = await Productos.find({ categoria: 'Dulce' });
        res.status(200).json({ productos, numProducts: productos.length });

    } catch (error) {

        console.error('Error al obtener productos de la categoria', error)
        res.status(500).json({ error: `Error al obtener productos de la categoria ${categoria}` });
    }
 }

//  const eliminarDelCarrito = (req, res) => {
//     const productId = req.params.id;

//     if (!req.session.carrito) {
//         req.session.carrito = [];
//     }

//     req.session.carrito = req.session.carrito.filter(product => product._id != productId);

//     res.redirect('/productos/carrito');
// };

function eliminarDelCarrito(productId) {
    fetch(`/productos/carrito/eliminar/${productId}`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ id: productId })
    })
    .then(response => {
        if (response.ok) {
            window.location.reload(); // Recargar la página después de eliminar el producto
        } else {
            alert('Error al eliminar el producto');
        }
    })
    .catch(error => {
        console.error('Error:', error);
    });
}


module.exports = {
    obtenerTodosLosProductos,
    buscarPorSalado,
    buscarPorDulce,
    carritoDeCompras,
    eliminarDelCarrito
}