window.onload = function(){
    let body = document.querySelector('body');
    let moviesListTitulo = document.querySelector('.moviesListTitulo');
 
    body.classList.add('fondoMoviesList');
    
    console.log(body);
    moviesListTitulo.innerHTML = 'LISTADO DE PELÍCULAS';
    moviesListTitulo.style.color ='white';
    moviesListTitulo.style.backgroundColor = 'teal';
    moviesListTitulo.style.padding = '20px';

}


window.onload = function () {
    // Definir variables globales para controlar los errores
    let listOfErrors = {};

    let titulo = document.querySelector('.moviesAddTitulo')
    let formulario = document.querySelector('#formulario');
    let article = document.querySelector('article');
    titulo.innerHTML = 'AGREGAR PELÍCULA';
    titulo.classList.add('titulo');
    article.classList.add('fondoTransparente');
    formulario.classList.add('fondoCRUD');
    let errorsList = document.querySelector('.errores')

    const form = document.querySelector('form')

    const rating = document.querySelector('#rating');
    const awards = document.querySelector('#awards');
    const release_date = document.querySelector('#release_date');
    const length = document.querySelector('#length');
    const genre = document.querySelector('#genre_id');

    const title = document.querySelector('#title');
    title.focus();

    function validarInput(input, minLength, maxLength, minNum, maxNum) {
        return function (event) {
            const valorInput = input.value.trim();
            let error = '';

            // Realizar las validaciones necesarias
            if (valorInput == '' || valorInput == null) {
                error = `El campo ${input.name} es obligatorio.`;
                listOfErrors[input.name] = `El campo ${input.name} es obligatorio.`
            } else {
                if (minLength && valorInput.length < minLength) {
                    error = `El campo ${input.name} debe tener al menos ${minLength} caracteres.`;
                    listOfErrors[input.name] = `El campo ${input.name} debe tener al menos ${minLength} caracteres.`;
                } else if (maxLength && valorInput.length > maxLength) {
                    error = `El campo ${input.name} no puede tener más de ${maxLength} caracteres.`;
                    listOfErrors[input.name] = `El campo ${input.name} no puede tener más de ${maxLength} caracteres.`;
                }
            }
            if (minNum && parseFloat(valorInput) < minNum) {
                error = `El valor del campo ${input.name} debe ser mayor o igual a ${minNum}.`;
            } else if (maxNum && parseFloat(valorInput) > maxNum) {
                error = `El valor del campo ${input.name} debe ser menor o igual a ${maxNum}.`;
            } else if (valorInput < 0) {
                error = `El valor del campo ${input.name} no puede ser negativo.`;
            }

            const mensajeErrorElement = input.nextElementSibling;
            mensajeErrorElement.textContent = error;

            // Agregar o eliminar la clase 'is-invalid' según si hay error o no
            if (error) {
                input.classList.add('is-invalid');
            } else {
                input.classList.remove('is-invalid');
                input.classList.add('is-valid');
                delete listOfErrors[input.name]
            }
        };
    }
    title.addEventListener("blur", validarInput(title, 3, 15));
    length.addEventListener("blur", validarInput(length, null, null, 60, 360));
    rating.addEventListener("blur", validarInput(rating, null, null, 0, 10));
    awards.addEventListener("blur", validarInput(awards, null, null, 0, 10));
    genre.addEventListener('blur', validarInput(genre));
    release_date.addEventListener('blur', validarInput(release_date))

    form.addEventListener('submit', (event) => {

    validarInput(title, 3, 15);
    validarInput(length, null, null, 60, 360);
    validarInput(rating, null, null, 0, 10);
    validarInput(awards, null, null, 0, 10);
    validarInput(genre);
    release_date.addEventListener('blur', validarInput(release_date))
        if (Object.keys(listOfErrors).length > 0) {
            event.preventDefault();
            errorsList.innerHTML = '';
            for (const key in listOfErrors) {
                errorsList.innerHTML += `<li>${listOfErrors[key]}</li>`;
            }
        }
    });
}