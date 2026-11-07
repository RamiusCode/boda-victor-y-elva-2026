// src/scripts/frasesPase.ts
// Las frases que cambian con el número de pases se arman SOLO acá. Las usan
// PaseInvitado.astro y Despedida.astro en el servidor, y el formulario de
// confirmación en el navegador.

export function pasesEnSuHonor(pases: number) {
    return pases === 1 ? "pase en su honor" : "pases en su honor";
}

export function pasesReservados(pases: number) {
    return pases === 1 ? "pase reservado" : "pases reservados";
}

/** La frase de la portada: "Hemos reservado (1) pase para ti" */
export function hemosReservado(pases: number) {
    return `Hemos reservado (${pases}) ${pases === 1 ? "pase" : "pases"} para ti`;
}

export function personas(cantidad: number) {
    return cantidad === 1 ? "1 persona" : `${cantidad} personas`;
}

export function asistiran(cantidad: number) {
    return cantidad === 1
        ? "Confirmaste la asistencia de 1 persona"
        : `Confirmaste la asistencia de ${cantidad} personas`;
}
