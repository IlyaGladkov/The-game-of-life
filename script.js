import { initMatrix } from './matrix.js'

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

glider.onclick = function () {
    clearMatrix(mas);
    drawCell(47, 1, "green");
    mas[1][47] = true;
    drawCell(46, 2, "green");
    mas[2][46] = true;
    drawCell(46, 3, "green");
    mas[3][46] = true;
    drawCell(47, 3, "green");
    mas[3][47] = true;
    drawCell(48, 3, "green");
    mas[3][48] = true;
}

toad.onclick = function () {
    clearMatrix(mas);
    drawCell(24, 19, "green");
    mas[19][24] = true;
    drawCell(25, 19, "green");
    mas[19][25] = true;
    drawCell(26, 19, "green");
    mas[19][26] = true;
    drawCell(23, 20, "green");
    mas[20][23] = true;
    drawCell(24, 20, "green");
    mas[20][24] = true;
    drawCell(25, 20, "green");
    mas[20][25] = true;
}

pentaDec.onclick = function () {
    clearMatrix(mas);
    drawCell(20, 20, "green");
    mas[20][20] = true;
    drawCell(21, 20, "green");
    mas[20][21] = true;
    drawCell(22, 19, "green");
    mas[19][22] = true;
    drawCell(22, 21, "green");
    mas[21][22] = true;
    drawCell(23, 20, "green");
    mas[20][23] = true;
    drawCell(24, 20, "green");
    mas[20][24] = true;
    drawCell(25, 20, "green");
    mas[20][25] = true;
    drawCell(26, 20, "green");
    mas[20][26] = true;
    drawCell(27, 19, "green");
    mas[19][27] = true;
    drawCell(27, 21, "green");
    mas[21][27] = true;
    drawCell(28, 20, "green");
    mas[20][28] = true;
    drawCell(29, 20, "green");
    mas[20][29] = true;
}