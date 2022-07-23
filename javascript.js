const juego = (function () {
    let jugador1;
    let jugador2;
    let jugadorEnTurno;
    let contrincanteDeCompu;
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
            divCasilleroAremoverListener[casillero].removeEventListener("click", jugadaHecha);
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

    function jugadaHecha (event) {
        if (jugadorEnTurno.nombre !== "compu" && jugadorEnTurno.nombre !== "Compu") {
            if (arregloTablero[event.target.dataset.casillero] === jugador1.marca || arregloTablero[event.target.dataset.casillero] === jugador2.marca) {
                return;
            } else {
                arregloTablero[event.target.dataset.casillero] = jugadorEnTurno.marca;
            };
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
        
        if (numeroTotalJugadas === 0) {
            empate();
            return;
        };
            
        if (jugadorEnTurno === jugador1) {
            jugadorEnTurno = jugador2;
        } else if (jugadorEnTurno === jugador2) {
            jugadorEnTurno = jugador1;
        };

        if (jugadorEnTurno.nombre === "compu" || jugadorEnTurno.nombre === "Compu") {
            jugadaCompu();
        }
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
            divCasillero.addEventListener("click", jugadaHecha);
            divCasillero.textContent = arregloTablero[casillero];
            divTablero.appendChild(divCasillero);
        };
    };
    
    function jugadaCompu () {
        // Arreglo de todos los 3s en linea:
        let arregloDarreglos = [];
        arregloDarreglos[0] = [0, 1, 2];
        arregloDarreglos[1] = [3, 4, 5];
        arregloDarreglos[2] = [6, 7, 8];
        arregloDarreglos[3] = [0, 3, 6];
        arregloDarreglos[4] = [1, 4, 7];
        arregloDarreglos[5] = [2, 5, 8];
        arregloDarreglos[6] = [0, 4, 8];
        arregloDarreglos[7] = [2, 4, 6];
        
        // Hacer 3 en línea si se puede
        for (let i=0; i < arregloDarreglos.length; i++) {
            if ((arregloTablero[arregloDarreglos[i][0]] === jugadorEnTurno.marca && arregloTablero[arregloDarreglos[i][1]] === jugadorEnTurno.marca && arregloTablero[arregloDarreglos[i][2]] === "") 
             || (arregloTablero[arregloDarreglos[i][0]] === jugadorEnTurno.marca && arregloTablero[arregloDarreglos[i][2]] === jugadorEnTurno.marca && arregloTablero[arregloDarreglos[i][1]] === "")
             || (arregloTablero[arregloDarreglos[i][1]] === jugadorEnTurno.marca && arregloTablero[arregloDarreglos[i][2]] === jugadorEnTurno.marca && arregloTablero[arregloDarreglos[i][0]] === "")
              ) {
                let indiceParaMarcar = [(arregloTablero[arregloDarreglos[i][0]]), (arregloTablero[arregloDarreglos[i][1]]), (arregloTablero[arregloDarreglos[i][2]])].indexOf("");
                arregloTablero[arregloDarreglos[i][indiceParaMarcar]] = jugadorEnTurno.marca;
                jugadaHecha();
                console.log("Había 2 en linea y el tercero libre!");
                i = arregloDarreglos.length;
                return;
                };
        };

        // Evitar 3 en linea del contrincanteDeCompu
        for (let i=0; i < arregloDarreglos.length; i++) {
            if ((arregloTablero[arregloDarreglos[i][0]] === contrincanteDeCompu.marca && arregloTablero[arregloDarreglos[i][1]] === contrincanteDeCompu.marca && arregloTablero[arregloDarreglos[i][2]] === "")
             || (arregloTablero[arregloDarreglos[i][0]] === contrincanteDeCompu.marca && arregloTablero[arregloDarreglos[i][2]] === contrincanteDeCompu.marca && arregloTablero[arregloDarreglos[i][1]] === "")
             || (arregloTablero[arregloDarreglos[i][1]] === contrincanteDeCompu.marca && arregloTablero[arregloDarreglos[i][2]] === contrincanteDeCompu.marca && arregloTablero[arregloDarreglos[i][0]] === "")
              ) {
                let indiceParaEvitar = [(arregloTablero[arregloDarreglos[i][0]]), (arregloTablero[arregloDarreglos[i][1]]), (arregloTablero[arregloDarreglos[i][2]])].indexOf("");
                arregloTablero[arregloDarreglos[i][indiceParaEvitar]] = jugadorEnTurno.marca;
                jugadaHecha();
                console.log("Un 3 en línea evitado!");
                return;
                };    
        };
        
        // Jugada aleatoria
        let casillerosLibres = [];
        let indiceLibres = 0;
        for (let casillero = 0; casillero < arregloTablero.length; casillero++) {
            if (arregloTablero[casillero] === "") {
                casillerosLibres[indiceLibres] = casillero;
                indiceLibres++;
            };
        };

        arregloTablero[casillerosLibres[Math.floor(Math.random() * (casillerosLibres.length))]] = jugadorEnTurno.marca;
    
        jugadaHecha();
    };

    function jugadaCompuBAK () {
        let tapoContrincanteDeCompu = false;

        // Arreglo de todos los 3s en linea:
        let arregloDarreglos = [];
        arregloDarreglos[0] = [0, 1, 2];
        arregloDarreglos[1] = [3, 4, 5];
        arregloDarreglos[2] = [6, 7, 8];
        arregloDarreglos[3] = [0, 3, 6];
        arregloDarreglos[4] = [1, 4, 7];
        arregloDarreglos[5] = [2, 5, 8];
        arregloDarreglos[6] = [0, 4, 8];
        arregloDarreglos[7] = [2, 4, 6];
        
        // Fila 1 para ganar
        if ((arregloTablero[0] === jugadorEnTurno.marca && arregloTablero[1] === jugadorEnTurno.marca && arregloTablero[2] === "")
          ||(arregloTablero[0] === jugadorEnTurno.marca && arregloTablero[2] === jugadorEnTurno.marca && arregloTablero[1] === "")
          ||(arregloTablero[1] === jugadorEnTurno.marca && arregloTablero[2] === jugadorEnTurno.marca && arregloTablero[0] === "")
            ) {
                arregloTablero[0] = jugadorEnTurno.marca;
                arregloTablero[1] = jugadorEnTurno.marca;
                arregloTablero[2] = jugadorEnTurno.marca;
                console.log("Había 2 en linea y el tercero libre!");
                jugadaHecha();
                return;
        // Fila 2 para ganar
        } else if ((arregloTablero[3] === jugadorEnTurno.marca && arregloTablero[4] === jugadorEnTurno.marca && arregloTablero[5] === "")
                 ||(arregloTablero[3] === jugadorEnTurno.marca && arregloTablero[5] === jugadorEnTurno.marca && arregloTablero[4] === "")
                 ||(arregloTablero[4] === jugadorEnTurno.marca && arregloTablero[5] === jugadorEnTurno.marca && arregloTablero[3] === "")
            ) {
                arregloTablero[3] = jugadorEnTurno.marca;
                arregloTablero[4] = jugadorEnTurno.marca;
                arregloTablero[5] = jugadorEnTurno.marca;
                console.log("Había 2 en linea y el tercero libre!");
                jugadaHecha();
                return;
        // Fila 3 para ganar
        } else if ((arregloTablero[6] === jugadorEnTurno.marca && arregloTablero[7] === jugadorEnTurno.marca && arregloTablero[8] === "")
                 ||(arregloTablero[6] === jugadorEnTurno.marca && arregloTablero[8] === jugadorEnTurno.marca && arregloTablero[7] === "")
                 ||(arregloTablero[7] === jugadorEnTurno.marca && arregloTablero[8] === jugadorEnTurno.marca && arregloTablero[6] === "")
            ) {
                arregloTablero[6] = jugadorEnTurno.marca;
                arregloTablero[7] = jugadorEnTurno.marca;
                arregloTablero[8] = jugadorEnTurno.marca;
                console.log("Había 2 en linea y el tercero libre!");
                jugadaHecha();
                return;
        // Columna 1 para ganar
        } else if ((arregloTablero[0] === jugadorEnTurno.marca && arregloTablero[3] === jugadorEnTurno.marca && arregloTablero[6] === "")
                 ||(arregloTablero[0] === jugadorEnTurno.marca && arregloTablero[6] === jugadorEnTurno.marca && arregloTablero[3] === "")
                 ||(arregloTablero[3] === jugadorEnTurno.marca && arregloTablero[6] === jugadorEnTurno.marca && arregloTablero[0] === "")
            ) {
                arregloTablero[0] = jugadorEnTurno.marca;
                arregloTablero[3] = jugadorEnTurno.marca;
                arregloTablero[6] = jugadorEnTurno.marca;
                console.log("Había 2 en linea y el tercero libre!");
                jugadaHecha();
                return;
        // Columna 2 para ganar
        } else if ((arregloTablero[1] === jugadorEnTurno.marca && arregloTablero[4] === jugadorEnTurno.marca && arregloTablero[7] === "")
                 ||(arregloTablero[1] === jugadorEnTurno.marca && arregloTablero[7] === jugadorEnTurno.marca && arregloTablero[4] === "")
                 ||(arregloTablero[4] === jugadorEnTurno.marca && arregloTablero[7] === jugadorEnTurno.marca && arregloTablero[1] === "")
            ) {
                arregloTablero[1] = jugadorEnTurno.marca;
                arregloTablero[4] = jugadorEnTurno.marca;
                arregloTablero[7] = jugadorEnTurno.marca;
                console.log("Había 2 en linea y el tercero libre!");
                jugadaHecha();
                return;
        // Columna 3 para ganar
        } else if ((arregloTablero[2] === jugadorEnTurno.marca && arregloTablero[5] === jugadorEnTurno.marca && arregloTablero[8] === "")
                 ||(arregloTablero[2] === jugadorEnTurno.marca && arregloTablero[8] === jugadorEnTurno.marca && arregloTablero[5] === "")
                 ||(arregloTablero[5] === jugadorEnTurno.marca && arregloTablero[8] === jugadorEnTurno.marca && arregloTablero[2] === "")
            ) {
                arregloTablero[2] = jugadorEnTurno.marca;
                arregloTablero[5] = jugadorEnTurno.marca;
                arregloTablero[8] = jugadorEnTurno.marca;
                console.log("Había 2 en linea y el tercero libre!");
                jugadaHecha();
                return;
        // Diagonal 1 para ganar
        } else if ((arregloTablero[0] === jugadorEnTurno.marca && arregloTablero[4] === jugadorEnTurno.marca && arregloTablero[8] === "")
                 ||(arregloTablero[0] === jugadorEnTurno.marca && arregloTablero[8] === jugadorEnTurno.marca && arregloTablero[4] === "")
                 ||(arregloTablero[4] === jugadorEnTurno.marca && arregloTablero[8] === jugadorEnTurno.marca && arregloTablero[0] === "")
            ) {
                arregloTablero[0] = jugadorEnTurno.marca;
                arregloTablero[4] = jugadorEnTurno.marca;
                arregloTablero[8] = jugadorEnTurno.marca;
                console.log("Había 2 en linea y el tercero libre!");
                jugadaHecha();
                return;
        // Diagonal 2 para ganar
        } else if ((arregloTablero[2] === jugadorEnTurno.marca && arregloTablero[4] === jugadorEnTurno.marca && arregloTablero[6] === "")
                 ||(arregloTablero[2] === jugadorEnTurno.marca && arregloTablero[6] === jugadorEnTurno.marca && arregloTablero[4] === "")
                 ||(arregloTablero[4] === jugadorEnTurno.marca && arregloTablero[6] === jugadorEnTurno.marca && arregloTablero[2] === "")
            ) {
                arregloTablero[2] = jugadorEnTurno.marca;
                arregloTablero[4] = jugadorEnTurno.marca;
                arregloTablero[6] = jugadorEnTurno.marca;
                console.log("Había 2 en linea y el tercero libre!");
                jugadaHecha();
                return;
        // Evitar 3 en linea del contrincanteDeCompu
        } else {
            for (let i=0; i < arregloDarreglos.length; i++) {
                if ((arregloTablero[arregloDarreglos[i][0]] === contrincanteDeCompu.marca && arregloTablero[arregloDarreglos[i][1]] === contrincanteDeCompu.marca && arregloTablero[arregloDarreglos[i][2]] === "")
                  ||(arregloTablero[arregloDarreglos[i][0]] === contrincanteDeCompu.marca && arregloTablero[arregloDarreglos[i][2]] === contrincanteDeCompu.marca && arregloTablero[arregloDarreglos[i][1]] === "")
                  ||(arregloTablero[arregloDarreglos[i][1]] === contrincanteDeCompu.marca && arregloTablero[arregloDarreglos[i][2]] === contrincanteDeCompu.marca && arregloTablero[arregloDarreglos[i][0]] === "")
                  ) {
                    let indiceParaEvitar = [(arregloTablero[arregloDarreglos[i][0]]), (arregloTablero[arregloDarreglos[i][1]]), (arregloTablero[arregloDarreglos[i][2]])].indexOf("");
                    arregloTablero[arregloDarreglos[i][indiceParaEvitar]] = jugadorEnTurno.marca;
                    tapoContrincanteDeCompu = true;
                    jugadaHecha();
                    console.log("Un 3 en línea evitado!");
                    break;
                };
                
            }
        };
       
        if (!tapoContrincanteDeCompu) {
            let casillerosLibres = [];
            let indiceLibres = 0;
            for (let casillero = 0; casillero < arregloTablero.length; casillero++) {
                if (arregloTablero[casillero] === "") {
                    casillerosLibres[indiceLibres] = casillero;
                    indiceLibres++;
                };
            };

            arregloTablero[casillerosLibres[Math.floor(Math.random() * (casillerosLibres.length))]] = jugadorEnTurno.marca;
        
            jugadaHecha();
        };
    };

    function jugadaCompuAleatoria () {
        let casillerosLibres = [];
        let indiceLibres = 0;
        for (let casillero = 0; casillero < arregloTablero.length; casillero++) {
            if (arregloTablero[casillero] === "") {
                casillerosLibres[indiceLibres] = casillero;
                indiceLibres++;
            };
        };
        
        arregloTablero[casillerosLibres[Math.floor(Math.random() * (casillerosLibres.length))]] = jugadorEnTurno.marca;
        
        jugadaHecha();
    };

    function arrancar () {
        jugador1 = FabricaJugador ((prompt("Nombre del jugador con marcas X?", "Jugador1")), "x");
        jugador2 = FabricaJugador ((prompt("Nombre del jugador con marcas O?", "Jugador2")), "o");
        jugadorEnTurno = jugador1;
        
        if (jugador1.nombre === "compu" || jugador1.nombre === "Compu") {
            contrincanteDeCompu = jugador2;
        } else if (jugador2.nombre === "compu" || jugador2.nombre === "Compu") {
            contrincanteDeCompu = jugador1;
        };
        
        arregloTablero = ["", "", "", "", "", "", "", "", ""];
        numeroTotalJugadas = 9;

        dibujarTablero();

        if (jugadorEnTurno.nombre === "Compu" || jugadorEnTurno.nombre === "compu") {
            jugadaCompu();
        };
    };
    
    return {
        arrancar,
    }
})();

const botonEmpezar = document.querySelector(".empezar");
botonEmpezar.addEventListener("click", juego.arrancar);