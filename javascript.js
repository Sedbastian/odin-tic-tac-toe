function FabricaJugador (nombre, marca) {
    return {
        nombre,
        marca,
    }
};

const jugador1 = FabricaJugador ("Sebi", "x");
const jugador2 = FabricaJugador ("Grili", "o");

const juego = (function () {
    let jugadorEnTurno = jugador1;

    let arregloTablero = [".", ".", ".", ".", ".", ".", ".", ".", "."];

    function dibujarTablero () {
        let divsAremover = document.querySelectorAll(".casillero");
        divsAremover.forEach (div => {
            div.remove();
        });
        for (let casillero = 0; casillero < juego.arregloTablero.length; casillero++) {
            const divCasillero = document.createElement("div");
            divCasillero.setAttribute("data-casillero", `${casillero}`);
            divCasillero.setAttribute("class", "casillero");
            divCasillero.addEventListener("click", event => {
                juego.jugada (event);
            });
            divCasillero.textContent = arregloTablero[casillero];
            divTablero.appendChild(divCasillero);
        };
    };
    
    function ganador () {
        console.log(`Ganador ${jugadorEnTurno.nombre}`);
    };

    function jugada (event) {
        if (arregloTablero[event.target.dataset.casillero] === jugador1.marca || arregloTablero[event.target.dataset.casillero] === jugador1.marca) {
            return;
        };
        arregloTablero[event.target.dataset.casillero] = jugadorEnTurno.marca;
        dibujarTablero();
        
        if ((juego.arregloTablero[0] === jugadorEnTurno.marca && juego.arregloTablero[1] === jugadorEnTurno.marca && juego.arregloTablero[2] === jugadorEnTurno.marca)
         || (juego.arregloTablero[3] === jugadorEnTurno.marca && juego.arregloTablero[4] === jugadorEnTurno.marca && juego.arregloTablero[5] === jugadorEnTurno.marca)
         || (juego.arregloTablero[6] === jugadorEnTurno.marca && juego.arregloTablero[7] === jugadorEnTurno.marca && juego.arregloTablero[8] === jugadorEnTurno.marca)
         || (juego.arregloTablero[0] === jugadorEnTurno.marca && juego.arregloTablero[3] === jugadorEnTurno.marca && juego.arregloTablero[6] === jugadorEnTurno.marca)
         || (juego.arregloTablero[1] === jugadorEnTurno.marca && juego.arregloTablero[4] === jugadorEnTurno.marca && juego.arregloTablero[7] === jugadorEnTurno.marca)
         || (juego.arregloTablero[2] === jugadorEnTurno.marca && juego.arregloTablero[5] === jugadorEnTurno.marca && juego.arregloTablero[8] === jugadorEnTurno.marca)
         || (juego.arregloTablero[0] === jugadorEnTurno.marca && juego.arregloTablero[4] === jugadorEnTurno.marca && juego.arregloTablero[8] === jugadorEnTurno.marca)
         || (juego.arregloTablero[2] === jugadorEnTurno.marca && juego.arregloTablero[4] === jugadorEnTurno.marca && juego.arregloTablero[6] === jugadorEnTurno.marca)
         ) {
            ganador();
        };

        if (jugadorEnTurno === jugador1) {
            jugadorEnTurno = jugador2;
        } else if (jugadorEnTurno === jugador2) {
            jugadorEnTurno = jugador1;
        };
    };

    return {
        arregloTablero,
        dibujarTablero,
        jugada,
    }
})();

const divTablero = document.querySelector(".tablero");

juego.dibujarTablero();