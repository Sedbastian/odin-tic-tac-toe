const juego = (function () {
    function FabricaJugador (nombre, marca) {
        return {
            nombre,
            marca,
        }
    };
    
    const jugador1 = FabricaJugador ("Sebi", "x");
    const jugador2 = FabricaJugador ("Grili", "o");
    let jugadorEnTurno = jugador1;

    
    let arregloTablero = ["", "", "", "", "", "", "", "", ""];
    let numeroTotalJugadas = 9;

    function ganador () {
        console.log(`Ganador ${jugadorEnTurno.nombre}`);
    };

    function empate () {
        console.log("Empate");
    };

    function jugada (event) {
        if (arregloTablero[event.target.dataset.casillero] === jugador1.marca || arregloTablero[event.target.dataset.casillero] === jugador1.marca) {
            return;
        };

        arregloTablero[event.target.dataset.casillero] = jugadorEnTurno.marca;
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
    
    const divTablero = document.querySelector(".tablero");
    
    function dibujarTablero () {
        let divsAremover = document.querySelectorAll(".casillero");
        divsAremover.forEach (div => {
            div.remove();
        });
        for (let casillero = 0; casillero < arregloTablero.length; casillero++) {
            const divCasillero = document.createElement("div");
            divCasillero.setAttribute("data-casillero", `${casillero}`);
            divCasillero.setAttribute("class", "casillero");
            divCasillero.addEventListener("click", event => {
                jugada(event);
            });
            divCasillero.textContent = arregloTablero[casillero];
            divTablero.appendChild(divCasillero);
        };
    };
    
    function arrancar () {
        dibujarTablero();
    }
    
    return {
        arrancar,
    }
})();

juego.arrancar();