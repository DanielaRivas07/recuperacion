//Paquetes y archivos 
const express = require('express');
const app = express();
require('dotenv').config();
const connectDB = require('./config/connectDB'); 
const productsRouter = require('./routes/products'); 
const mysql = require('mysql');
const session = require('express-session');
const { hasSubscribers } = require('diagnostics_channel');
const adminRouter = require('./routes/admin'); 

//middleware
app.set("view engine", "ejs");
app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use('/productos', productsRouter); 
app.use('/admin', adminRouter); 


// conexion a la base
const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'panaderia'
 });

connection.connect((error) => {

    // Manejar un error, va a detener toda la ejecuacion y va a mostrar el mensajd de error

    if(error) throw error;
    console.log('Conexion exitosa');

    const createTable = `CREATE TABLE IF NOT EXISTS clientes (
        id INT AUTO_INCREMENT PRIMARY KEY,
        username VARCHAR(100) NOT NULL,
        password VARCHAR(100) NOT NULL, 
        email VARCHAR(100) NOT NULL
    )`;

    connection.query(createTable, (error, resultado)=>{
        if(error) throw error;
        console.log('Tabla creada o ya existente')
    });
})

// Configuracion del Middelware
// Configuracion de la sesión

app.use(session({
    secret: 'secret', //Cuando guarda la info del usuario va a mantenerla cifrada 
    resave: true, //Mantiene la sesion viva y evita algun problema de perdida de datos
    saveUninitialized: true
}));

// Configuracion de manejo de datos 
app.use(express.json());

// --------------------------------

app.use(express.urlencoded({extended: true}))


// rutas post  
app.post('/register', (request, response) =>{

    let username = request.body.username;
    let password = request.body.password;
    let email = request.body.email;

    const hashingPassword = hashPassword(password);

    // Insercion de datos en la base

    connection.query('INSERT INTO clientes (username, email, password) VALUES (?, ?, ?)', [username, email, hashingPassword], function(error, resultado){
        if(error) throw error;
    });

    // Redirecion a inicio de sesion
    response.redirect('/login')


})

// Post- login
app.post('/login', (request, response) =>{
    let username = request.body.username;
    let password = request.body.password;

    // Verifico la credencial si exixste en la base de datos

    if (username && password) {
        //Si ambos son validos procedemos a la verificacion de autenticacion 

        connection.query('SELECT * FROM clientes WHERE username = ?', [username], (error, resultado) => {
            if (error) throw error;

            if (resultado.length > 0) { // Hay algo aqui ?  Si hay una Cecilia55

                const verificacionPassword = resultado[0].password; // Cecilia55 clave ceci5
                

                if (verificacionPassword === hashPassword(password)) {


                    request.session.loggedin = true; // autenticación exitosa y el usuario podra acceder al perfil 
                    request.session.username = username // Almacenamos el nombre de usuario en la sesion 

                    console.log('Todo ok') //imprime un mensaje de exito en consola 

                    response.redirect('home');
                } else {
                    response.send('Usuario y/o contraseña incorrecta')
                }
            } else {
                response.send('Usuario y/o contraseña incorrecta')
            }
        });
    } else {
        response.send('Por favor ingresa usuario y contraseña')
    }

}); 


app.get('/home', (request, response) => {
    if(request.session.loggedin){
        response.render('page/home.ejs');
    } else{
        response.send('¡Inicia sesión para ver esta página!')
    }
});

app.get('/about', (request, response) => {
    if(request.session.loggedin){
        response.render('page/about.ejs');
    } else{
        response.send('¡Inicia sesión para ver esta página!')
    }
});

app.get('/contact', (request, response) => {
    if(request.session.loggedin){
        response.render('page/contact.ejs');
    } else{
        response.send('¡Inicia sesión para ver esta página!')
    }
});

app.get('/shop', (request, response) => {
    if(request.session.loggedin){
        response.render('page/shop.ejs');
    } else{
        response.send('¡Inicia sesión para ver esta página!')
    }
});






//Funcion que se encarga de cifrar la password - Hashing 

function hashPassword(password) { //undefined ???
    return require('crypto').createHash('sha256').update(password).digest('hex');
};





app.get('/login', (req, res) => {
    res.render('page/login')
});
app.get('/register', (req, res) => {
    res.render('page/register')
});

const iniciar = async () => {
    try {
        await connectDB(process.env.MONGO_URL) //URL de entorno

      
    } catch (error) {
        console.log(error)
    }
}

iniciar(); 

//Puerto 
app.listen(process.env.PORT, () => {
    console.log('Puerto ejecuntadose')
});
