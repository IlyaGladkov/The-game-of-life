export function initMatrix(sizeI, sizeJ, anyFun) {
    let initMatrix = [];
    for (let i = 0; i < sizeI; i++) {
        initMatrix[i] = [];
        for (let j = 0; j < sizeJ; j++) {
            initMatrix[i][j] = anyFun(i,j);
        }
    }
    return initMatrix;
}