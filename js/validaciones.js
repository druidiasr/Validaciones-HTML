export function valida(input) {
    const tipoDeImput = input.dataset.tipo;
    if (validadores[tipoDeImput]) {
    validadores[tipoDeImput](input);
    }
    
    if(input.validity.valid) {
        input.parentElement.classList.remove("input-container--invalid");
        input.parentElement.querySelector(".input-message-error").innerHTML = "";

    }else{
        input.parentElement.classList.add("input-container--invalid");
        input.parentElement.querySelector(".input-message-error").innerHTML = mostrarMensajeDeError(tipoDeImput, input);
    }
}

const tipoDeErrorres = [
    "valueMissing",
    "typeMismatch",
    "patternMismatch",
    "customError",
];


const mensajesDeError = {
    nombre: {
        valueMissing: "El campo nombre no puede estar vacio",
    },
    email: {
        valueMissing: "El campo correo no puede estar vacio",
        typeMismatch: "El correo no es valido",
    },
    password: {
        valueMissing: "El campo contraseña no puede estar vacio",
        patternMismatch: "Mínimo ocho y máximo 10 caracteres, al menos una letra mayúscula, una letra minúscula, un número y un carácter especial",
    },
    nacimiento: {
        valueMissing: "El campo fecha de nacimiento no puede estar vacio",
        customError: "Debes tener al menos 18 años de edad", 
    },
    numero: {
        valueMissing: "El campo número telefónico no puede estar vacio",
        patternMismatch: "El formato requerido es XXXXXXXXXX 10 números",
    },
    direccion: {
        valueMissing: "El campo dirección no puede estar vacio",
        patternMismatch: "La dirección debe contener entre 10 a 40 caracteres",
    },
    ciudad: {
        valueMissing: "El campo ciudad no puede estar vacio",
        patternMismatch: "La ciudad debe contener entre 4 a 30 caracteres",
    },
    estado: {
        valueMissing: "El campo estado no puede estar vacio",
        patternMismatch: "El estado debe contener entre 4 a 30 caracteres",
    },
};

const validadores = {
    nacimiento: (input) => validarNacimiento(input),
};

function mostrarMensajeDeError(tipoDeImput, input) {
    let mensaje = "";
    tipoDeErrorres.forEach((error) => {
        if(input.validity[error]) {
            console.log(tipoDeImput, error);
            console.log(input.validity[error]);
            console.log(mensajesDeError[tipoDeImput][error]);
            mensaje = mensajesDeError[tipoDeImput][error];
        }
    });
    return(mensaje);
}

function validarNacimiento(input) {
    const fechaCliente = new Date(input.value);
    let mensaje = "";
    mayorDeEdad(fechaCliente);
    if (!mayorDeEdad(fechaCliente)) {
        mensaje = "Debes tener al menos 18 años de edad";
    }
    input.setCustomValidity(mensaje);
}

function mayorDeEdad(fecha) {
    const fechaActual = new Date();
    const diferenciaFechas = new Date(fecha.getUTCFullYear() + 18, fecha.getUTCMonth(), fecha.getUTCDate());
    return diferenciaFechas <= fechaActual;
}