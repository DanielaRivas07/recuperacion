const express = require('express'); 
const router = express.Router(); 
const {verProductos, mostrarAgregarProductos, enviarProducto, enviarProductoEditado, productoActual, eliminarProducto, mostrarEliminaProducto} = require('../controllers/admin'); 
//CRUD create read update delete

router.route('/crud').get(verProductos) // read 
router.route('/agregate').get(mostrarAgregarProductos); //create
router.route('/nuevoproducto').post(enviarProducto)

//Update 
router.route('/updateproducto/:id').post(enviarProductoEditado) //update


router.route('/productoactual/:id').get(productoActual)

//DELETE
router.route('/deleteproducto').get(mostrarEliminaProducto)
router.route('/delete/:id').post(eliminarProducto)

module.exports=router