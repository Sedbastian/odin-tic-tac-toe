const Jugador = function (nombre, marcas) {
    return {
        nombre,
        marcas,
    }
};

const jugador1 = Jugador("Sebi", "o");
const jugador2 = Jugador("Grili", "x");

const tablero = (function () {
    let arregloTablero = ["o", "x", "o", "x", "o", "x", "o", "x", "o"];

    return {
        arregloTablero,
    }
})();

const controladorDisplay = (function () {
    console.log(tablero);
    console.log(tablero.arregloTablero.length);
    console.log(`Jugador 1: ${jugador1.nombre}, marcas: ${jugador1.marcas}.`);
    console.log(`Jugador 2: ${jugador2.nombre}, marcas: ${jugador2.marcas}.`);
    return tablero.arregloTablero;
})();

const divTablero = document.querySelector(".tablero");
tablero.arregloTablero.forEach(casillero => {
    const divCasillero = document.createElement("div");
    divCasillero.textContent = casillero;
    divTablero.appendChild(divCasillero);
});