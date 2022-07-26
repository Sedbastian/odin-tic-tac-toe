const juego = (function () {
    let jugador1;
    let jugador2;
    let jugadorEnTurno;
    let contrincanteDeCompu;
    let arregloTablero;
    let numeroTotalJugadas;
    
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
        
        for (let i=0; i < arregloDarreglos.length; i++) {
            if ((arregloTablero[arregloDarreglos[i][0]] === jugadorEnTurno.marca && arregloTablero[arregloDarreglos[i][1]] === jugadorEnTurno.marca && arregloTablero[arregloDarreglos[i][2]] === jugadorEnTurno.marca) 
             || (arregloTablero[arregloDarreglos[i][0]] === jugadorEnTurno.marca && arregloTablero[arregloDarreglos[i][2]] === jugadorEnTurno.marca && arregloTablero[arregloDarreglos[i][1]] === jugadorEnTurno.marca)
             || (arregloTablero[arregloDarreglos[i][1]] === jugadorEnTurno.marca && arregloTablero[arregloDarreglos[i][2]] === jugadorEnTurno.marca && arregloTablero[arregloDarreglos[i][0]] === jugadorEnTurno.marca)
              ) {
                ganador();
                return;
                };
        };
        // Viejo chequeo de ganador sin usar arregloDarreglos ganadores
        // if ((arregloTablero[0] === jugadorEnTurno.marca && arregloTablero[1] === jugadorEnTurno.marca && arregloTablero[2] === jugadorEnTurno.marca)
        //  || (arregloTablero[3] === jugadorEnTurno.marca && arregloTablero[4] === jugadorEnTurno.marca && arregloTablero[5] === jugadorEnTurno.marca)
        //  || (arregloTablero[6] === jugadorEnTurno.marca && arregloTablero[7] === jugadorEnTurno.marca && arregloTablero[8] === jugadorEnTurno.marca)
        //  || (arregloTablero[0] === jugadorEnTurno.marca && arregloTablero[3] === jugadorEnTurno.marca && arregloTablero[6] === jugadorEnTurno.marca)
        //  || (arregloTablero[1] === jugadorEnTurno.marca && arregloTablero[4] === jugadorEnTurno.marca && arregloTablero[7] === jugadorEnTurno.marca)
        //  || (arregloTablero[2] === jugadorEnTurno.marca && arregloTablero[5] === jugadorEnTurno.marca && arregloTablero[8] === jugadorEnTurno.marca)
        //  || (arregloTablero[0] === jugadorEnTurno.marca && arregloTablero[4] === jugadorEnTurno.marca && arregloTablero[8] === jugadorEnTurno.marca)
        //  || (arregloTablero[2] === jugadorEnTurno.marca && arregloTablero[4] === jugadorEnTurno.marca && arregloTablero[6] === jugadorEnTurno.marca)
        //  ) {
        //     ganador();
        //     return;
        // };

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
    
    function rotarTableroIzq (arregloTableroArotar) {
        let arregloTableroRotado = [];
        arregloTableroRotado[0] = arregloTableroArotar[2];
        arregloTableroRotado[1] = arregloTableroArotar[5];
        arregloTableroRotado[2] = arregloTableroArotar[8];
        arregloTableroRotado[3] = arregloTableroArotar[1];
        arregloTableroRotado[4] = arregloTableroArotar[4];
        arregloTableroRotado[5] = arregloTableroArotar[7];
        arregloTableroRotado[6] = arregloTableroArotar[0];
        arregloTableroRotado[7] = arregloTableroArotar[3];
        arregloTableroRotado[8] = arregloTableroArotar[6];

        return arregloTableroRotado;
    };

    function espejarTableroVert (arregloTableroAespejar) {
        let arregloTableroEspejado = [];
        arregloTableroEspejado[0] = arregloTableroAespejar[2];
        arregloTableroEspejado[1] = arregloTableroAespejar[1];
        arregloTableroEspejado[2] = arregloTableroAespejar[0];
        arregloTableroEspejado[3] = arregloTableroAespejar[5];
        arregloTableroEspejado[4] = arregloTableroAespejar[4];
        arregloTableroEspejado[5] = arregloTableroAespejar[3];
        arregloTableroEspejado[6] = arregloTableroAespejar[8];
        arregloTableroEspejado[7] = arregloTableroAespejar[7];
        arregloTableroEspejado[8] = arregloTableroAespejar[6];

        return arregloTableroEspejado;
    };

    function jugadaCompu () {
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
        
        let arregloTableroCopia = arregloTablero;

        // Hacer Fork si se puede
        for (let i=0; i < 1; i++) {
            for(let j=0; j < 4; j++) {
                
                // Primer tipo de Fork (no hace falta chequear si arregloTableroCopia[1] === contrincanteDeCompu.marca)
                if (arregloTableroCopia[0] === jugadorEnTurno.marca && arregloTableroCopia[2] === jugadorEnTurno.marca && arregloTableroCopia[1] === contrincanteDeCompu.marca) {
                    
                    if (arregloTableroCopia[3] === "" && arregloTableroCopia[4] === "" && arregloTableroCopia[6] === "") {
                        
                        arregloTableroCopia[6] = jugadorEnTurno.marca;
                        
                        if (j === 1) {
                            arregloTableroCopia = rotarTableroIzq(rotarTableroIzq(rotarTableroIzq(arregloTableroCopia)));
                        } else if (j === 2) {
                            arregloTableroCopia = rotarTableroIzq(rotarTableroIzq(arregloTableroCopia));
                        } else if (j === 3) {
                            arregloTableroCopia = rotarTableroIzq(arregloTableroCopia);
                        };
                        
                        if (i === 1) {
                            arregloTableroCopia = espejarTableroVert(arregloTableroCopia);
                        };

                        arregloTablero = arregloTableroCopia;
                        jugadaHecha();
                        console.log("Fork! n1");
                        return;
                    };
                    
                    if (arregloTableroCopia[4] === "" && arregloTableroCopia[5] === "" && arregloTableroCopia[8] === "") {
                        
                        arregloTableroCopia[8] = jugadorEnTurno.marca;
                        
                        if (j === 1) {
                            arregloTableroCopia = rotarTableroIzq(rotarTableroIzq(rotarTableroIzq(arregloTableroCopia)));
                        } else if (j === 2) {
                            arregloTableroCopia = rotarTableroIzq(rotarTableroIzq(arregloTableroCopia));
                        } else if (j === 3) {
                            arregloTableroCopia = rotarTableroIzq(arregloTableroCopia);
                        };
                        
                        if (i === 1) {
                            arregloTableroCopia = espejarTableroVert(arregloTableroCopia);
                        };

                        arregloTablero = arregloTableroCopia;
                         
                        jugadaHecha();
                        console.log("Fork! n1");
                        return;
                    };
                    
                    if (arregloTableroCopia[6] === "" && arregloTableroCopia[8] === "" && arregloTableroCopia[4] === "") {
                        
                        arregloTableroCopia[4] = jugadorEnTurno.marca;
                        
                        if (j === 1) {
                            arregloTableroCopia = rotarTableroIzq(rotarTableroIzq(rotarTableroIzq(arregloTableroCopia)));
                        } else if (j === 2) {
                            arregloTableroCopia = rotarTableroIzq(rotarTableroIzq(arregloTableroCopia));
                        } else if (j === 3) {
                            arregloTableroCopia = rotarTableroIzq(arregloTableroCopia);
                        };
                        
                        if (i === 1) {
                            arregloTableroCopia = espejarTableroVert(arregloTableroCopia);
                        };

                        arregloTablero = arregloTableroCopia;
                         
                        jugadaHecha();
                        console.log("Fork! n1");
                        return;
                    };
                };
                
                // Segundo tipo de Fork
                if (arregloTableroCopia[1] === jugadorEnTurno.marca && arregloTableroCopia[3] === jugadorEnTurno.marca) {
                    
                    if (arregloTableroCopia[5] === "" && arregloTableroCopia[7] === "" && arregloTableroCopia[4] === "") {
                        
                        arregloTableroCopia[4] = jugadorEnTurno.marca;
                        
                        if (j === 1) {
                            arregloTableroCopia = rotarTableroIzq(rotarTableroIzq(rotarTableroIzq(arregloTableroCopia)));
                        } else if (j === 2) {
                            arregloTableroCopia = rotarTableroIzq(rotarTableroIzq(arregloTableroCopia));
                        } else if (j === 3) {
                            arregloTableroCopia = rotarTableroIzq(arregloTableroCopia);
                        };
                        
                        if (i === 1) {
                            arregloTableroCopia = espejarTableroVert(arregloTableroCopia);
                        };

                        arregloTablero = arregloTableroCopia;
                         
                        jugadaHecha();
                        console.log("Fork n2!");
                        return;
                    };

                    if (arregloTableroCopia[6] === "" && arregloTableroCopia[2] === "" && arregloTableroCopia[0] === "") {
                        
                        arregloTableroCopia[0] = jugadorEnTurno.marca;
                        
                        if (j === 1) {
                            arregloTableroCopia = rotarTableroIzq(rotarTableroIzq(rotarTableroIzq(arregloTableroCopia)));
                        } else if (j === 2) {
                            arregloTableroCopia = rotarTableroIzq(rotarTableroIzq(arregloTableroCopia));
                        } else if (j === 3) {
                            arregloTableroCopia = rotarTableroIzq(arregloTableroCopia);
                        };
                        
                        if (i === 1) {
                            arregloTableroCopia = espejarTableroVert(arregloTableroCopia);
                        };

                        arregloTablero = arregloTableroCopia;
                         
                        jugadaHecha();
                        console.log("Fork n2!");
                        return;
                    };
                };
                
                // Tercer tipo de Fork
                if (arregloTableroCopia[0] === jugadorEnTurno.marca && arregloTableroCopia[5] === jugadorEnTurno.marca) {
                    
                    if (arregloTableroCopia[1] === "" && arregloTableroCopia[8] === "" && arregloTableroCopia[2] === "") {
                        
                        arregloTableroCopia[2] = jugadorEnTurno.marca;
                        
                        if (j === 1) {
                            arregloTableroCopia = rotarTableroIzq(rotarTableroIzq(rotarTableroIzq(arregloTableroCopia)));
                        } else if (j === 2) {
                            arregloTableroCopia = rotarTableroIzq(rotarTableroIzq(arregloTableroCopia));
                        } else if (j === 3) {
                            arregloTableroCopia = rotarTableroIzq(arregloTableroCopia);
                        };
                        
                        if (i === 1) {
                            arregloTableroCopia = espejarTableroVert(arregloTableroCopia);
                        };

                        arregloTablero = arregloTableroCopia;
                         
                        jugadaHecha();
                        console.log("Fork n3!");
                        return;
                    };
                };

                // Cuarto tipo de Fork (creo q no hay mas tipos)
                if (arregloTableroCopia[0] === jugadorEnTurno.marca && arregloTableroCopia[4] === jugadorEnTurno.marca && arregloTableroCopia[8] === contrincanteDeCompu.marca) {
                    
                    if (arregloTableroCopia[7] === "" && arregloTableroCopia[2] === "" && arregloTableroCopia[1] === "") {
                        
                        arregloTableroCopia[1] = jugadorEnTurno.marca;
                        
                        if (j === 1) {
                            arregloTableroCopia = rotarTableroIzq(rotarTableroIzq(rotarTableroIzq(arregloTableroCopia)));
                        } else if (j === 2) {
                            arregloTableroCopia = rotarTableroIzq(rotarTableroIzq(arregloTableroCopia));
                        } else if (j === 3) {
                            arregloTableroCopia = rotarTableroIzq(arregloTableroCopia);
                        };
                        
                        if (i === 1) {
                            arregloTableroCopia = espejarTableroVert(arregloTableroCopia);
                        };

                        arregloTablero = arregloTableroCopia;
                         
                        jugadaHecha();
                        console.log("Fork n4!");
                        return;
                    };

                    if (arregloTableroCopia[5] === "" && arregloTableroCopia[6] === "" && arregloTableroCopia[3] === "") {
                        
                        arregloTableroCopia[3] = jugadorEnTurno.marca;
                        
                        if (j === 1) {
                            arregloTableroCopia = rotarTableroIzq(rotarTableroIzq(rotarTableroIzq(arregloTableroCopia)));
                        } else if (j === 2) {
                            arregloTableroCopia = rotarTableroIzq(rotarTableroIzq(arregloTableroCopia));
                        } else if (j === 3) {
                            arregloTableroCopia = rotarTableroIzq(arregloTableroCopia);
                        };
                        
                        if (i === 1) {
                            arregloTableroCopia = espejarTableroVert(arregloTableroCopia);
                        };

                        arregloTablero = arregloTableroCopia;
                         
                        jugadaHecha();
                        console.log("Fork! n4");
                        return;
                    };
                };
            arregloTableroCopia = rotarTableroIzq(arregloTableroCopia);
            };
        arregloTableroCopia = espejarTableroVert(arregloTableroCopia);
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
        console.log("Jugada aleatoria");
        return;
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