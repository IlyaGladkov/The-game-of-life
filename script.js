import { initMatrix } from './matrix.js'

const FIELD_SIZE = 500;
const DRAW_CELL_SIZE = 9;
const CELL_SIZE = 10;
const randomNumberOfCell = 1000;

var canvas = document.getElementById("canvas");
var ctx = canvas.getContext("2d");

ctx.strokeStyle = "black";
ctx.strokeRect(0, 0, FIELD_SIZE + 0.5, FIELD_SIZE + 0.5);

ctx.beginPath();
for (var Y_FIELD = 0; Y_FIELD < FIELD_SIZE; Y_FIELD += CELL_SIZE) {
    ctx.moveTo(0, Y_FIELD);
    ctx.lineTo(FIELD_SIZE, Y_FIELD);
}
ctx.stroke();

ctx.beginPath();
for (var X_FIELD = 0; X_FIELD < FIELD_SIZE; X_FIELD += CELL_SIZE) {
    ctx.moveTo(X_FIELD, 0);
    ctx.lineTo(X_FIELD, FIELD_SIZE);
}
ctx.stroke();

function drawCell(col, row, color) {
    ctx.fillStyle = color;
    ctx.fillRect(col * CELL_SIZE + 1, row * CELL_SIZE + 1, DRAW_CELL_SIZE, DRAW_CELL_SIZE);
}

var mas = initMatrix(50, 50, () => false);
var mas2 = initMatrix(50, 50, () => undefined);

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

for (let i = 0; i < randomNumberOfCell; i++) {
    let row = Math.floor(Math.random() * 50);
    let col = Math.floor(Math.random() * 50);
    drawCell(col, row, "green");
    mas[row][col] = true;
}

function count(row, col) {
    var neighbors = 0;
    if (row > 0 && col > 0) {
        if (mas[row - 1][col - 1] == true) {
            neighbors++;
        }
    }
    if (col > 0) {
        if (mas[row][col - 1] == true) {
            neighbors++;
        }
    }
    if (row != 49 && col > 0) {
        if (mas[row + 1][col - 1] == true) {
            neighbors++;
        }
    }
    if (row > 0) {
        if (mas[row - 1][col] == true) {
            neighbors++;
        }
    }
    if (row != 49) {
        if (mas[row + 1][col] == true) {
            neighbors++;
        }
    }
    if (row > 0 && col != 49) {
        if (mas[row - 1][col + 1] == true) {
            neighbors++;
        }
    }
    if (col != 49) {
        if (mas[row][col + 1] == true) {
            neighbors++;
        }
    }
    if (row != 49 && col != 49) {
        if (mas[row + 1][col + 1] == true) {
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
            if (mas2[row][col] == false) {
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
    startGame;
    document.getElementById("start").disabled = true;
}

pause.onclick = function () {
    clearInterval(startGame);
    document.getElementById("start").disabled = false;
}

step.onclick = function () {
    goLife();
}