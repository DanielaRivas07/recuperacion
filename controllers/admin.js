const Productos = require('../models/product');


const verProductos = async (req, res) => {

    const products = await Productos.find({});
    res.render('page/read', { products: products })
}



//create 
const mostrarAgregarProductos = (req, res) => {

    res.render('page/agregate')
}

const enviarProducto = async (req, res) => {

    const nombre = req.body.nombre; //jabon liquido
    const precio = req.body.precio;
    const categoria = req.body.categoria;
    console.log(nombre)


    const agregateProduct = await Productos.insertMany({ nombre: nombre, precio: precio, categoria: categoria })
    res.render('page/exito')
};

//update

const productoActual = async (req, res) => {
    console.log('Hola soy productoActual')

    const idReq = { _id: req.params.id } //665db0cc0630d9fedc0d3697

    let products = await Productos.findOne(idReq)
        .then(products => {
            res.render('page/update', { products: products })
            console.log('El resultado es', products)
        })
        .catch(error => {
            console.log(error)
        })

}

const enviarProductoEditado = async (req, res) => {

    console.log('Vamos a editar un producto')

    const idReq = { _id: req.params.id };

    console.log(idReq)

    const productsUpdate = await Productos.updateOne(idReq, {

        $set: {
            nombre: req.body.nombre,
            categoria: req.body.categoria,
            precio: req.body.precio
        }
    }) //busca el id especificamente y modifica 

        .then(respuesta => {
            console.log('Todo funciona bien', respuesta)
            res.render('page/exito')
        })

        .catch(error => {
            console.log(error)
        })



}
const mostrarEliminaProducto = (req, res) => {

    res.render('page/delete')
} 

const eliminarProducto = async (req, res) => {

    console.log('Soy eliminarProducto')
    const idReq = { _id: req.params.id };

    const resultado = await Productos.deleteOne(idReq)

        .then(respuesta => {
            console.log('Producto eliminado')
            res.render('page/delete')
        })
        .catch(error => {
            console.log(error)
        })

}
module.exports = {
    verProductos,
    mostrarAgregarProductos,
    enviarProducto,
    productoActual,
    enviarProductoEditado,
    eliminarProducto,
    mostrarEliminaProducto
}