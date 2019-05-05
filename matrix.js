export default function makeMatrix(sizeI, sizeJ, value) {
    let matrix = [];
    for (let i = 0; i < sizeI; i++) {
        matrix[i] = []
        for (let j = 0; j < sizeJ; j++) {
            matrix[i][j] = value;
        }
    }
    return matrix;
}   