const FIELD_SIZE = 500;
const CELL_SIZE = 9;
const lastCell = 49;
const SQUARE_SIZE = 10;

var mas = [];
var mas2 = []

var canvas = document.getElementById("canvas");
var ctx = canvas.getContext("2d");

ctx.strokeStyle = "black";
ctx.strokeRect(0, 0, FIELD_SIZE + 0.5, FIELD_SIZE + 0.5);

ctx.beginPath();
for (var Y_FIELD = 0; Y_FIELD < FIELD_SIZE; Y_FIELD += SQUARE_SIZE) {
    ctx.moveTo(0, Y_FIELD);
    ctx.lineTo(FIELD_SIZE, Y_FIELD);
}
ctx.stroke();

ctx.beginPath();
for (var X_FIELD = 0; X_FIELD < FIELD_SIZE; X_FIELD += SQUARE_SIZE) {
    ctx.moveTo(X_FIELD, 0);
    ctx.lineTo(X_FIELD, FIELD_SIZE);
}
ctx.stroke();

for (let i = 0; i < 50; i++) {
    mas[i] = [];
    for (let j = 0; j < 50; j++) {
        mas[i][j] = false;
    }
}

for (let i = 0; i < 50; i++) {
    mas2[i] = [];
    for (let j = 0; j < 50; j++) {
        mas2[i][j] = undefined;
    }
}

canvas.onclick = function (event) {
    var x = event.offsetX;
    var y = event.offsetY;
    var col = Math.floor(x / SQUARE_SIZE)
    var row = Math.floor(y / SQUARE_SIZE)

    if (mas[row][col] == false) {
        ctx.fillStyle = "green";
        ctx.fillRect((col * SQUARE_SIZE) + 1, (row * SQUARE_SIZE) + 1, CELL_SIZE, CELL_SIZE);
        mas[row][col] = true;
    } else {
        ctx.fillStyle = "white";
        ctx.fillRect((col * SQUARE_SIZE) + 1, (row * SQUARE_SIZE) + 1, CELL_SIZE, CELL_SIZE);
        mas[row][col] = false;
    }
}

for (let i = 0; i < 1000; i++) {
    let rnd1 = Math.floor(Math.random() * (50));
    let rnd2 = Math.floor(Math.random() * (50));
    ctx.fillStyle = "green";
    ctx.fillRect(rnd1 * SQUARE_SIZE + 1, rnd2 * SQUARE_SIZE + 1, CELL_SIZE, CELL_SIZE);
    mas[rnd1][rnd2] = true;
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
    if (row != lastCell && col > 0) {
        if (mas[row + 1][col - 1] == true) {
            neighbors++;
        }
    }
    if (row > 0) {
        if (mas[row - 1][col] == true) {
            neighbors++;
        }
    }
    if (row != lastCell) {
        if (mas[row + 1][col] == true) {
            neighbors++;
        }
    }
    if (row > 0 && col != lastCell) {
        if (mas[row - 1][col + 1] == true) {
            neighbors++;
        }
    }
    if (col != lastCell) {
        if (mas[row][col + 1] == true) {
            neighbors++;
        }
    }
    if (row != lastCell && col != lastCell) {
        if (mas[row + 1][col + 1] == true) {
            neighbors++;
        }
    }
    return neighbors;
}

function goLife() {
    mas.forEach(function (item, row) {
        item.forEach(function (cell, col) {
            if (mas2[row][col] == false) {
                if (count(row, col) == 3) {
                    ctx.fillStyle = "green";
                    ctx.fillRect((col * SQUARE_SIZE) + 1, (row * SQUARE_SIZE) + 1, CELL_SIZE, CELL_SIZE);
                    mas2[row][col] = true;
                }
            } else {
                if (count(row, col) == 2) {
                    mas2[row][col] = true;
                }
                if (count(row, col) < 2 || count(row, col) > 3) {
                    ctx.fillStyle = "white";
                    ctx.fillRect((col * SQUARE_SIZE) + 1, (row * SQUARE_SIZE) + 1, CELL_SIZE, CELL_SIZE);
                    mas2[row][col] = false;
                }
            }
        })
    })
    mas2.forEach(function (item, row) {
        item.forEach(function (cell, col) {
            mas[row][col] = mas2[row][col]
        })
    })
}

str = function () {
   startGame = setInterval(goLife, 100);
}

pse = function () {
    clearInterval(startGame);
}