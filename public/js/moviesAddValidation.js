
window.onload = function () {
    let titulo = document.querySelector('.moviesAddTitulo');
    let sectionForm = document.querySelector('#formulario');
    let article = document.querySelector('article');
    titulo.innerHTML = 'AGREGAR PELÍCULA';
    titulo.classList.add('titulo');
    article.classList.add('fondoTransparente');
    sectionForm.classList.add('fondoCRUD');
    const title = document.querySelector('#title');
    const inputs = document.querySelectorAll('.input');
    const form = document.querySelector('form');

    title.focus();



    function textError(input, message) {
        const inputBox = input.parentElement;
        const child = document.getElementById(`${input.name}-error`);
        input.classList.add('is-invalid');
        const textError = document.createElement('p');

        textError.id = `${input.name}-error`;
        textError.innerText = message;
        child ? inputBox.replaceChild(textError, child) : inputBox.appendChild(textError);
    }

    function listError(input,message){
        const listBox = document.querySelector('.errores');
        const child = document.getElementById(`${input.name}-errorList`);
        input.classList.add('is-invalid');
        const listError = document.createElement('li');
        listBox.classList.add('alert-warning')
        listError.id = `${input.name}-errorList`;
        listError.innerText = message;
        child ? listBox.replaceChild(listError, child) : listBox.appendChild(listError);
    }

    function removeError(input) {
        const childText = document.querySelector(`#${input.name}-error`)
        const childList = document.querySelector(`#${input.name}-errorList`)

        input.classList.remove('is-invalid');
        input.classList.add('is-valid');
        childText ? childText.remove() : null
        childList ? childList.remove() : null
    }

    function validateValue(input, e) {
        const textErrorElement = document.getElementById(`${input.name}-error`);
        if (textErrorElement) {
            textErrorElement.remove();
        }
        const listErrorElement = document.getElementById(`${input.name}-errorList`);
        if (listErrorElement) {
            listErrorElement.remove();
        }
        if (!input.value.trim()) {
            const emptyMessage = `El campo ${input.name} no puede estar vacío`;
            e.type === 'submit' ? listError(input, emptyMessage) : textError(input, emptyMessage);
            return false;
        }
        if (input.name === 'awards' || input.name === 'rating') {
            const min = 0;
            const max = 10;
            if (minMax(input, min, max)) {
                const minMaxMessage = `El campo ${input.name} debe estar entre los valores ${min} y ${max}`;
                e.type === 'submit' ? listError(input, minMaxMessage) : textError(input, minMaxMessage);
                return false;
            }
        }
        if (input.name === 'length') {
            const min = 60;
            const max = 360;
            if (minMax(input, min, max)) {
                const minMaxMessage = `El campo ${input.name} debe estar entre los valores ${min} y ${max}`;
                e.type === 'submit' ? listError(input, minMaxMessage) : textError(input, minMaxMessage);
                return false;
            }
        }
        removeError(input);
        return true;
    }
    
    function minMax(input, min, max) {
        return (input.value >= min && input.value <= max);
    }

    inputs.forEach(input => {
        input.addEventListener('blur', (e) => {
            validateValue(input,e)
        })
    })
    form.addEventListener('submit', (e) => {
        inputs.forEach(input => {
            if (validateValue(input,e) == false) {
                e.preventDefault();

            }
        })
    })
}
