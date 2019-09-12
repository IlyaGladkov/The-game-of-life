import { initMatrix } from './matrix.js'
import { neighbors, glider, toad, pentaDecathlon } from './relativeСoordinates.js'

const NUM_LINES = 50;
const NUM_COLUMNS = 50;
const CELL_SIZE = 10;

var canvas = document.getElementById("canvas");
var ctx = canvas.getContext("2d");

ctx.strokeStyle = "black";
ctx.strokeRect(0, 0, NUM_COLUMNS * CELL_SIZE, NUM_LINES * CELL_SIZE);

ctx.beginPath();
for (var Y_FIELD = 0; Y_FIELD < (NUM_LINES * CELL_SIZE); Y_FIELD += CELL_SIZE) {
    ctx.moveTo(0, Y_FIELD);
    ctx.lineTo((NUM_LINES * CELL_SIZE), Y_FIELD);
}
ctx.stroke();

ctx.beginPath();
for (var X_FIELD = 0; X_FIELD < (NUM_COLUMNS * CELL_SIZE); X_FIELD += CELL_SIZE) {
    ctx.moveTo(X_FIELD, 0);
    ctx.lineTo(X_FIELD, (NUM_COLUMNS * CELL_SIZE));
}
ctx.stroke();

function drawCell(col, row, color) {
    ctx.fillStyle = color;
    ctx.fillRect(col * CELL_SIZE + 1, row * CELL_SIZE + 1, CELL_SIZE - 1, CELL_SIZE - 1);
}

function clearMatrix(arr) {
    arr.forEach(function (item, row) {
        item.forEach(function (cell, col) {
            arr[row][col] = false;
            drawCell(col, row, "white");
        })
    })
}

var mas = initMatrix(50, 50, (row, col) => {
    let randBool = Math.random() > 0.5;
    drawCell(col, row, randBool ? "green" : "white");
    return randBool;
});

var mas2 = initMatrix(50, 50, () => false);

canvas.onclick = function (event) {
    let x = event.offsetX;
    let y = event.offsetY;
    var col = Math.floor(x / CELL_SIZE)
    var row = Math.floor(y / CELL_SIZE)

    if (mas[row][col] == false) {
        drawCell(col, row, "green");
        mas[row][col] = true;
    } else {
        drawCell(col, row, "white");
        mas[row][col] = false;
    }
}

let countNeighbors = (row, col) => {
    let resNeighbors = 0;
    neighbors.forEach((relCoordOfNeighbor) => {
        let absRow = row + relCoordOfNeighbor.y;
        let absCol = col + relCoordOfNeighbor.x;
        if (absRow < NUM_LINES && absCol > 0) {
            if (absRow > 0 && absCol < NUM_COLUMNS) {
                if (mas[absRow][absCol]) {
                    resNeighbors++;
                }
            }
        }
    })
    return resNeighbors;
}

let generation = 0;

function goLife() {
    mas.forEach(function (item, row) {
        item.forEach(function (cell, col) {
            mas2[row][col] = mas[row][col];
            if (mas[row][col] == false) {
                if (countNeighbors(row, col) == 3) {
                    drawCell(col, row, "green");
                    mas2[row][col] = true;
                }
            } else {
                if (countNeighbors(row, col) == 2) {
                    mas2[row][col] = true;
                }
                if (countNeighbors(row, col) < 2 || countNeighbors(row, col) > 3) {
                    drawCell(col, row, "white");
                    mas2[row][col] = false;
                }
            }
        })
    })
    generation += 1;
    mas2.forEach(function (item, row) {
        item.forEach(function (cell, col) {
            mas[row][col] = mas2[row][col]
        })
    })
    document.getElementsByTagName("h2")[0].innerText = "Generation: " + generation;
}

let startGame;
start.onclick = function () {
    startGame = setInterval(goLife, 100);
    document.getElementById("start").disabled = true;
}

pause.onclick = function () {
    clearInterval(startGame);
    document.getElementById("start").disabled = false;
}

step.onclick = function () {
    goLife();
}

clear.onclick = function () {
    clearInterval(startGame);
    clearMatrix(mas);
    document.getElementById("start").disabled = false;
}

rand.onclick = function () {
    mas = initMatrix(50, 50, (row, col) => {
        let randBool = Math.random() > 0.5;
        drawCell(col, row, randBool ? "green" : "white");
        return randBool;
    });
}

// figures

function drawFigures(figures, changeX, changeY) {
    figures.forEach(function (point) {
        let absX = point.x + changeX;
        let absY = point.y + changeY;
        drawCell(absX, absY, "green");
        mas[absY][absX] = true;
    })
}

playGlider.onclick = function () {
    clearMatrix(mas);
    drawFigures(glider, 46, 1);
}

playToad.onclick = function () {
    clearMatrix(mas);
    drawFigures(toad, 23, 19);
}

playPentaDec.onclick = function () {
    clearMatrix(mas);
    drawFigures(pentaDecathlon, 20, 19);
}