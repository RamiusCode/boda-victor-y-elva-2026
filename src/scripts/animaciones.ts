// src/scripts/animaciones.ts
// Animaciones de entrada compartidas por toda la invitación.
//
// La idea: un solo gesto corto y suave por sección, con todo entrando a la
// vez. El invitado sigue bajando mientras mira, no espera a que termine nada,
// así que nada puede tardar más de un segundo ni depender de varias etapas
// encadenadas.
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

/*
   toggleActions = onEnter | onLeave | onEnterBack | onLeaveBack.
   "restart" al entrar bajando la reproduce desde cero cada vez (con "play",
   una vez completada, volver a entrar no hacía nada). "reset" al salir por
   arriba la deja escondida, lista para la próxima bajada. Al volver desde
   abajo se deja como está, para no interrumpir la lectura de quien sube.
*/
const ACCIONES = "restart none none reset";

// sine.out frena parejo hasta detenerse: es el más calmo de la familia,
// sin el tirón inicial de los power.
const SUAVE = "sine.out";

// Arranca apenas la sección asoma por abajo, así el gesto se completa
// mientras todavía está entrando en pantalla y no después.
const ARRANQUE = "top 92%";

const DURACION = 0.8;

const menosMovimiento = () =>
    window.matchMedia("(prefers-reduced-motion: reduce)").matches;

/**
 * Entrada genérica: los elementos aparecen subiendo apenas y saliendo de un
 * desenfoque leve. El escalonado por defecto es corto a propósito: alcanza
 * para que no entren como un bloque plano, sin obligar a esperar.
 *
 * `x` desplaza la entrada en horizontal (positivo = entra desde la derecha).
 * Sirve para listas en zigzag, donde cada lado tiene que venir del suyo.
 */
export function animarEntrada(
    elementos: ArrayLike<Element> | Element,
    trigger: Element,
    {
        start = ARRANQUE,
        stagger = 0.1,
        delay = 0,
        x = 0,
        y = 14,
        duration = DURACION,
    } = {},
) {
    const lista = elementos instanceof Element ? [elementos] : Array.from(elementos);
    if (lista.length === 0) return;

    const scrollTrigger = { trigger, start, toggleActions: ACCIONES };

    if (menosMovimiento()) {
        gsap.fromTo(
            lista,
            { opacity: 0 },
            { opacity: 1, duration: 0.5, delay, ease: "power1.out", scrollTrigger },
        );
        return;
    }

    gsap.fromTo(
        lista,
        { opacity: 0, x, y, filter: "blur(4px)" },
        {
            opacity: 1,
            x: 0,
            y: 0,
            filter: "blur(0px)",
            duration,
            stagger,
            delay,
            ease: SUAVE,
            scrollTrigger,
        },
    );
}
