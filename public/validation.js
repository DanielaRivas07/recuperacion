


document.addEventListener("DOMContentLoaded", function () {


    //Obtener los elementos que viene del dom 
    const inputPassword = document.getElementById('password');
    const errorPassword = document.getElementById('passwordError');


    inputPassword.addEventListener('change', () => {
        const password = inputPassword.value; //tomamos el valor 
        const solicitarPassword = /^(?=.*[A-Z])(?=.*[!@#$%^&*])(?=.{8})/;

        // verificomos si coincide 

        if (!solicitarPassword.test(password)) {

            errorPassword.textContent = 'La contraseña debe tener al menos 8 caracteres, una mayúscula y un caracter especial';
            
        } else {
            errorPassword.textContent = ''; 
        }
    })

}); 