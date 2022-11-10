export function valida(input) {
    const tipoDeImput = input.dataSet.tipo;
    if (validadores[tipoDeImput]) {
    validadores[tipoDeImput](input);
    }
}

const validadores = {
    nacimiento: input => validarNacimiento(input)
};

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