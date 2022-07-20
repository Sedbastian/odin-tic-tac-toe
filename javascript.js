const Jugador = function (nombre, marcas) {
    return {
        nombre,
        marcas,
    }
};

const jugador1 = Jugador("Sebi", "o");
const jugador2 = Jugador("Grili", "x");

const juego = (function () {
    let arregloTablero = [".", ".", ".", ".", ".", ".", ".", ".", "."];

    function jugada (event) {
        console.log(event);
        console.log(event.target.dataset.casillero);
    };

    return {
        arregloTablero,
        jugada,
    }
})();

const divTablero = document.querySelector(".tablero");

for (let casillero = 0; casillero < juego.arregloTablero.length; casillero++) {
    const divCasillero = document.createElement("div");
    divCasillero.textContent = ".";
    divCasillero.setAttribute("data-casillero", `${casillero}`);
    divCasillero.addEventListener("click", event => {
        juego.jugada (event);
    });
    divTablero.appendChild(divCasillero);
}

    


