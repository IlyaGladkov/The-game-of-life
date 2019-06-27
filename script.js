import { initMatrix } from './matrix.js'

const NUM_LINES = 50;
const NUM_COLUMNS = 50;
const CELL_SIZE = 10;

var canvas = document.getElementById("canvas");
var ctx = canvas.getContext("2d");

ctx.strokeStyle = "black";
ctx.strokeRect(0, 0, (NUM_COLUMNS * CELL_SIZE) + 0.5, (NUM_LINES * CELL_SIZE) + 0.5);

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

var mas = initMatrix(50, 50, (row, col) => {
    let randBool = Math.random() > 0.5;
    if (randBool) {
        drawCell(col, row, "green");
    }
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

function count(row, col) {
    var neighbors = 0;
    if (row > 0 && col > 0) {
        if (mas[row - 1][col - 1]) {
            neighbors++;
        }
    }
    if (col > 0) {
        if (mas[row][col - 1]) {
            neighbors++;
        }
    }
    if (row != (NUM_LINES - 1) && col > 0) {
        if (mas[row + 1][col - 1]) {
            neighbors++;
        }
    }
    if (row > 0) {
        if (mas[row - 1][col]) {
            neighbors++;
        }
    }
    if (row != (NUM_LINES - 1)) {
        if (mas[row + 1][col]) {
            neighbors++;
        }
    }
    if (row > 0 && col != (NUM_COLUMNS - 1)) {
        if (mas[row - 1][col + 1]) {
            neighbors++;
        }
    }
    if (col != (NUM_COLUMNS - 1)) {
        if (mas[row][col + 1]) {
            neighbors++;
        }
    }
    if (row != (NUM_LINES - 1) && col != (NUM_COLUMNS - 1)) {
        if (mas[row + 1][col + 1]) {
            neighbors++;
        }
    }
    return neighbors;
}

var generation = 0;

function goLife() {
    mas.forEach(function (item, row) {
        item.forEach(function (cell, col) {
            mas2[row][col] = mas[row][col];
            if (mas[row][col] == false) {
                if (count(row, col) == 3) {
                    drawCell(col, row, "green");
                    mas2[row][col] = true;
                }
            } else {
                if (count(row, col) == 2) {
                    mas2[row][col] = true;
                }
                if (count(row, col) < 2 || count(row, col) > 3) {
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
    document.getElementsByTagName("h3")[0].innerText = "Generation: " + generation;
}

var startGame;
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
    mas = initMatrix(50, 50, (row, col) => {
        drawCell(col, row, "white");
        return false;
    });
    document.getElementById("start").disabled = false;
}

rand.onclick = function () {
    mas = initMatrix(50, 50, (row, col) => {
        let randBool = Math.random() > 0.5;
        if (randBool) {
            drawCell(col, row, "green");
        } else {
            drawCell(col, row, "white");
        }
        return randBool;
    });
}