// src/scripts/mensajeConfirmar.ts
// El mensaje de WhatsApp para confirmar asistencia se arma SOLO acá. Lo
// usa Despedida.astro en el servidor (link inicial, sin nombre) y su
// script en el navegador (cuando el invitado escribe su nombre). Así las
// dos versiones del texto nunca se desencuentran.

export interface DatosConfirmar {
    telefono: string; // código de país + número, sin + ni espacios
    novios: string; // "Fernando y Valentina"
    fecha: string; // "18 de septiembre de 2027"
}

export function mensajeConfirmar(datos: DatosConfirmar, invitado = "") {
    const nombre = invitado.trim();
    const cuerpo =
        `Me complace confirmar mi asistencia a la boda de ${datos.novios}, ` +
        `que se realizará el ${datos.fecha}. ¡Estaré sin falta! Muchas gracias.`;

    return nombre
        ? `Confirmación de asistencia\nNombre: ${nombre}\n\n${cuerpo}`
        : `Confirmación de asistencia\n\n${cuerpo}`;
}

export function enlaceConfirmar(datos: DatosConfirmar, invitado = "") {
    const texto = encodeURIComponent(mensajeConfirmar(datos, invitado));
    return `https://wa.me/${datos.telefono}?text=${texto}`;
}
