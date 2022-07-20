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
    
    function jugada (event) {
        arregloTablero[event.target.dataset.casillero] = jugadorEnTurno.marca;
        if (jugadorEnTurno === jugador1) {
            jugadorEnTurno = jugador2;
        } else if (jugadorEnTurno === jugador2) {
            jugadorEnTurno = jugador1;
        };
        dibujarTablero();
    };

    return {
        FabricaJugador,
        arregloTablero,
        dibujarTablero,
        jugada,
    }
})();

const divTablero = document.querySelector(".tablero");

juego.dibujarTablero();