window.onload = function () {
    // Definir variables globales para controlar los errores
    let errors = false;

    let titulo = document.querySelector('.moviesAddTitulo')
    let formulario = document.querySelector('#formulario');
    let article = document.querySelector('article');
    titulo.innerHTML = 'AGREGAR PELÍCULA';
    titulo.classList.add('titulo');
    article.classList.add('fondoTransparente');
    formulario.classList.add('fondoCRUD');

    const form = document.querySelector('form')

    const movieRating = document.querySelector('#rating');
    const movieAwards = document.querySelector('#awards');
    const movieReleaseDate = document.querySelector('#release_date');
    const movieLength = document.querySelector('#length');
    const movieGenre = document.querySelector('#genre_id');

    const movieTitle = document.querySelector('#title');
    movieTitle.focus();

    function validarInput(input, minLength, maxLength, minNum, maxNum) {
        return function(event) {
            const valorInput = input.value.trim();
            let error = '';
    
            // Realizar las validaciones necesarias
            if (valorInput == '' || valorInput == null) {
                error = 'El campo es obligatorio.';
            } else {
                if (minLength && valorInput.length < minLength) {
                    error = `El texto debe tener al menos ${minLength} caracteres.`;
                } else if (maxLength && valorInput.length > maxLength) {
                    error = `El texto no puede tener más de ${maxLength} caracteres.`;
                }
            }
    
            // if (!valorInput) {
            //     error = 'Este campo es obligatorio.';
            // } else {
                if (minNum && parseFloat(valorInput) < minNum) {
                    error = `El valor debe ser mayor o igual a ${minNum}.`;
                } else if (maxNum && parseFloat(valorInput) > maxNum) {
                    error = `El valor debe ser menor o igual a ${maxNum}.`;
                } else if (valorInput < 0) {
                    error = 'El valor no puede ser negativo.';
                }
            // }
            
            // Mostrar mensaje de error
            const mensajeErrorElement = input.nextElementSibling;
            mensajeErrorElement.textContent = error;
    
            // Agregar o eliminar la clase 'is-invalid' según si hay error o no
            if (error) {
                input.classList.add('is-invalid');
                errors = true; // Actualizar el estado de los errores
            } else {
                input.classList.remove('is-invalid');
                input.classList.add('is-valid');
                errors = false; // Actualizar el estado de los errores
            }
        };
    }
    
    function validarFecha(input) {
        const valorInput = input.value;
        let error = '';
        console.log(valorInput);
        // Validar si el valor ingresado es una fecha válida
        const fechaIngresada = new Date(valorInput);
        if (isNaN(fechaIngresada.getTime())) {
            error = 'La fecha ingresada no es válida.';
        } else {
            // Obtener la fecha actual
            const fechaActual = new Date();
    
            // Validar que la fecha ingresada no sea en el futuro
            if (fechaIngresada > fechaActual) {
                error = 'La fecha ingresada no puede ser en el futuro.';
            }
        }
        // Mostrar mensaje de error
        const mensajeErrorElement = input.nextElementSibling;
        mensajeErrorElement.textContent = error;
    
        // Agregar o eliminar la clase 'is-invalid' según si hay error o no
        if (error) {
            input.classList.add('is-invalid');
            errors = true; // Actualizar el estado de los errores
        } else {
            input.classList.remove('is-invalid');
            input.classList.add('is-valid');
            errors = false; // Actualizar el estado de los errores
        }
    }
    

    movieTitle.addEventListener("input", validarInput(movieTitle, 3, 15));
    movieTitle.addEventListener("blur", validarInput(movieTitle));
    
    movieLength.addEventListener("input", validarInput(movieLength, null, null, 60, 360));
    movieLength.addEventListener("blur", validarInput(movieLength));

    movieRating.addEventListener("input", validarInput(movieRating, null, null, 0, 10));
    movieRating.addEventListener("blur", validarInput(movieRating));

    movieAwards.addEventListener("input", validarInput(movieAwards, null, null, 0, 10));
    movieAwards.addEventListener("blur", validarInput(movieAwards));


    movieReleaseDate.addEventListener("blur", validarFecha(movieReleaseDate));


    movieGenre.addEventListener('input', validarInput(movieGenre));
    movieGenre.addEventListener('blur', validarInput(movieGenre));

    form.addEventListener('submit', (event) => {
        if(errors){
            event.preventDefault();
        }
    });
}


// if (minNum !== undefined && valorInput < minNum) {
//     error = `El número debe ser mayor o igual a ${minNum}.`;
// } else if (maxNum !== undefined && valorInput > maxNum) {
//     error = `El número debe ser menor o igual a ${maxNum}.`;
// }