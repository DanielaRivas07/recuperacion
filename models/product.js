const mongoose = require('mongoose');

const productosEsquema = new mongoose.Schema({

    nombre: String,
    cantidad: Number,
    descripcion: String,
    imagen: String,
    categoria: String,
    precio: Number
}); 
//                               Coleccion
const Productos = mongoose.model('Productos', productosEsquema)

module.exports = Productos; 