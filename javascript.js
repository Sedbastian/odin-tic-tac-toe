const juego = (function () {
    let jugador1;
    let jugador2;
    let jugadorEnTurno;
    let arregloTablero;
    let numeroTotalJugadas;

    const divTablero = document.querySelector(".tablero");

    function FabricaJugador (nombre, marca) {
        return {
            nombre,
            marca,
        }
    };

    function ganador () {
        const divCasilleroAremoverListener = document.querySelectorAll(".casillero");
        for (let casillero = 0; casillero < arregloTablero.length; casillero++) {
            divCasilleroAremoverListener[casillero].removeEventListener("click", jugada);
        };
        const cuerpi = document.querySelector("body");
        const divGanador = document.createElement("div");
        divGanador.setAttribute("class", "divResultado");
        divGanador.textContent = `¡Gana ${jugadorEnTurno.nombre}, con las "${jugadorEnTurno.marca}"!`;
        cuerpi.appendChild(divGanador);
    };

    function empate () {
        const cuerpi = document.querySelector("body");
        const divEmpate = document.createElement("div");
        divEmpate.setAttribute("class", "divResultado");
        divEmpate.textContent = "¡Empate!";
        cuerpi.appendChild(divEmpate);
    };

    function jugada (event) {
        if (arregloTablero[event.target.dataset.casillero] === jugador1.marca || arregloTablero[event.target.dataset.casillero] === jugador2.marca) {
            return;
        } else {
            arregloTablero[event.target.dataset.casillero] = jugadorEnTurno.marca;
        };

        dibujarTablero();
        
        if ((arregloTablero[0] === jugadorEnTurno.marca && arregloTablero[1] === jugadorEnTurno.marca && arregloTablero[2] === jugadorEnTurno.marca)
         || (arregloTablero[3] === jugadorEnTurno.marca && arregloTablero[4] === jugadorEnTurno.marca && arregloTablero[5] === jugadorEnTurno.marca)
         || (arregloTablero[6] === jugadorEnTurno.marca && arregloTablero[7] === jugadorEnTurno.marca && arregloTablero[8] === jugadorEnTurno.marca)
         || (arregloTablero[0] === jugadorEnTurno.marca && arregloTablero[3] === jugadorEnTurno.marca && arregloTablero[6] === jugadorEnTurno.marca)
         || (arregloTablero[1] === jugadorEnTurno.marca && arregloTablero[4] === jugadorEnTurno.marca && arregloTablero[7] === jugadorEnTurno.marca)
         || (arregloTablero[2] === jugadorEnTurno.marca && arregloTablero[5] === jugadorEnTurno.marca && arregloTablero[8] === jugadorEnTurno.marca)
         || (arregloTablero[0] === jugadorEnTurno.marca && arregloTablero[4] === jugadorEnTurno.marca && arregloTablero[8] === jugadorEnTurno.marca)
         || (arregloTablero[2] === jugadorEnTurno.marca && arregloTablero[4] === jugadorEnTurno.marca && arregloTablero[6] === jugadorEnTurno.marca)
         ) {
            ganador();
            return;
        };

        numeroTotalJugadas--;
        console.log(numeroTotalJugadas);

        if (numeroTotalJugadas === 0) {
            empate();
        };
            
        if (jugadorEnTurno === jugador1) {
            jugadorEnTurno = jugador2;
        } else if (jugadorEnTurno === jugador2) {
            jugadorEnTurno = jugador1;
        };
    };
    
    function dibujarTablero () {
        let divsAremover = document.querySelectorAll(".casillero");
        divsAremover.forEach (div => {
            div.remove();
        });
        for (let casillero = 0; casillero < arregloTablero.length; casillero++) {
            const divCasillero = document.createElement("div");
            divCasillero.setAttribute("data-casillero", `${casillero}`);
            divCasillero.setAttribute("class", "casillero");
            // divCasillero.addEventListener("click", event => {
            //     jugada(event);
            // });
            divCasillero.addEventListener("click", jugada);
            divCasillero.textContent = arregloTablero[casillero];
            divTablero.appendChild(divCasillero);
        };
    };
    
    function arrancar () {
        jugador1 = FabricaJugador ((prompt("Nombre del jugador con marcas X?", "Jugador1")), "x");
        jugador2 = FabricaJugador ((prompt("Nombre del jugador con marcas O?", "Jugador2")), "o");
        jugadorEnTurno = jugador1;
        arregloTablero = ["", "", "", "", "", "", "", "", ""];
        numeroTotalJugadas = 9;

        dibujarTablero();
    }
    
    return {
        arrancar,
    }
})();

const botonEmpezar = document.querySelector(".empezar");
botonEmpezar.addEventListener("click", juego.arrancar);
