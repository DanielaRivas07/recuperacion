const express=require('express'); 
const router = express.Router(); 
const {obtenerTodosLosProductos, buscarPorSalado, buscarPorDulce, carritoDeCompras, eliminarDelCarrito} = require('../controllers/products')

//RUTAS
// app.get('/shop', ()=> {})

router.route('/shop').get(obtenerTodosLosProductos) //???????

router.route('/carrito/:id').get(carritoDeCompras)


//rutas por categoria

router.route('/Salado').get(buscarPorSalado)
router.route('/Dulce').get(buscarPorDulce)
router.route('/carrito/eliminar/:id').post(eliminarDelCarrito);



module.exports=router