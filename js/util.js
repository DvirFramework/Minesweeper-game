'use strict'

function createMat(ROWS, COLS) {
    const mat = []

    for (var i = 0; i < ROWS; i++) {
        const row = []
        for (var j = 0; j < COLS; j++) {
            row.push('')
        }
        mat.push(row)
    }
    return mat
}


function getRandomInt(min, max) {
    min = Math.ceil(min)
    max = Math.floor(max)
    return Math.floor(Math.random() * (max - min) + min) // The maximum is exclusive and the minimum is inclusive
}

function getRandomEmptyCellPosition() {
    const emptyCells = []
    for (var i = 0; i < gBoard.length; i++) {
        for (var j = 0; j < gBoard[i].length; j++) {
            const cell = gBoard[i][j]
            if (!cell.gameElement && cell.type === FLOOR) {
                emptyCells.push({ i, j })
            }
        }
    }

    if(!emptyCells.length) return null

    const randIdx = getRandomInt(0, emptyCells.length)
    return emptyCells[randIdx]
}