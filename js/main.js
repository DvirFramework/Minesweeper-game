'use strict'

// gBoard – A Matrix
// containing cell objects:
// Each cell: {
// minesAroundCount: 4,
// isShown: false,
// isMine: false,
// isMarked: true
// }

var gLevels = {
    beginner: {
        SIZE: 4,
        MINES: 2
    },
    medium: {
        SIZE: 8,
        MINES: 14
    },
    expert: {
        SIZE: 12,
        MINES: 32
    }
}

var gLevel = gLevels.beginner; // Default to the beginner level


var gGame = {
    isOn: false,
    shownCount: 0,
    markedCount: 0,
    secsPassed: 3,
    victory: false,
    hitsCount : 3
}


var gBoard



function onInit() {
    var elBtn = document.getElementById("ResetGame")
    elBtn.textContent = "play Again"
    elBtn.style.display = "none"

    var elLostDiv = document.getElementById("lost")
    elLostDiv.style.display = "none"

    var elVictoryDiv = document.getElementById("victory")
    elVictoryDiv.style.display = "none"

    gGame.victory =false
    gGame.isOn=true
    gGame.markedCount =0
    gGame.shownCount=0
    gGame.hitsCount = 3
    gBoard = buildBoard()
    renderBoard(gBoard)
}

function onLevelSelected(level) {
    var levels = {
        beginner: { size: 4, mines: 2 },
        medium: { size: 8, mines: 14 },
        expert: { size: 12, mines: 32 }
    }

    gLevel.SIZE = levels[level].size
    gLevel.MINES = levels[level].mines

    
    onInit()
}

function buildBoard() {
    const board = createMat(gLevel.SIZE, gLevel.SIZE)
    var minesLocation 

    for (var i = 0; i < board.length; i++) {
        for (var j = 0; j < board[i].length; j++) {
            var cell = { minesAroundCount: 0, isShown: false, isMine: false, isMarked: false }
            board[i][j] = cell
        }
    }

    minesLocation=createRandomMines(0, gLevel.SIZE, gLevel.MINES)
    for (var i = 0; i < minesLocation.length; i++){
        board[minesLocation[i].i][minesLocation[i].j].isMine = true   
    }

    for (var i = 0; i < board.length; i++) {
        for (var j = 0; j < board[i].length; j++) {
            board[i][j].minesAroundCount = setMinesNegsCount(board, i, j)
        }
    }

    return board
}



function createRandomMines(minNum, maxNum, numOfMines) {
    const mines = []

    while (mines.length < numOfMines) {
        const randNumCell = {
            i: getRandomInt(minNum, maxNum),
            j: getRandomInt(minNum, maxNum)
        }

        // Check if the generated mine location is already in the 'mines' array
        //It checks if the current mine object in the array has the same i and j values as the randNumCell.
        if (!mines.some(mine => mine.i === randNumCell.i && mine.j === randNumCell.j)) {
            mines.push(randNumCell)
        }
    }

    return mines
}




function renderBoard(board) {
    var strHtml = ''
    for (var i = 0; i < board.length; i++) {
        var row = board[i]
        strHtml += '\n<tr>\n'

        for (var j = 0; j < row.length; j++) {
            var cell = row[j]
            // TODO: figure class name
            var className = cell.isMine ? 'mine' : 'defult-cell'
            var tdId = `cell-${i}-${j}`
            strHtml += `\t<td id="${tdId}" onclick="onCellClicked(this)" onrightclick="()" oncontextmenu="onCellMarked(this)" class="${className}" class="hidden"></td>\n`
        }
        strHtml += '</tr>\n'
    }
    var elBoard = document.querySelector('.game-board')
    elBoard.innerHTML = strHtml
}

function setMinesNegsCount(board, rowIdx, colIdx) {
    var counerOfMine = 0
    for (var i = rowIdx - 1; i <= rowIdx + 1; i++) {
        if (i < 0 || i > gLevel.SIZE - 1) continue
        if (i < 1 && i > gLevel.SIZE - 2) continue
        for (var j = colIdx - 1; j <= colIdx + 1; j++) {

            if (j < 0 || j > gLevel.SIZE - 1) continue
            if (j < 1 && j > gLevel.SIZE - 2) continue
            if (i === rowIdx && j === colIdx) continue
            if (board[i][j].isMine === true) counerOfMine++
        }
    }
    return counerOfMine
}


function onCellClicked(elCell) {
    
    if(!gGame.victory&& !gGame.isOn) return
    

    var cellId = elCell.id
    var parts = cellId.split('-').splice(1, 2)
    var i = +parts[0]
    var j = +parts[1]
    var cell = gBoard[i][j]

    console.log('cell: ' +cell.isShown)

    if (cell.isShown) return

    if(cell.isMarked) gGame.markedCount--

    elCell.classList.remove('defult-cell')
    elCell.classList.add('reveal')
   
    //When losing
    if(cell.isMine){
        elCell.textContent = '💣 '
        elCell.style.backgroundColor = 'red'
        gGame.isOn=false
        gGame.victory = false
        console.log(gGame.isOn)
        checkGameOver()
        return
    } 
    elCell.textContent = cell.minesAroundCount

    if (cell.minesAroundCount === 0) {
        elCell.classList.remove('defult-cell')
        elCell.classList.add('reveal')
        

        //Call the expandShown function to reveal neighboring cells
        expandShown(gBoard, elCell, i, j)
    }
    if(cell.minesAroundCount>0){
        cell.isShown = true
        gGame.shownCount++
        checkGameOver()
    }

    checkGameOver()

}


function onCellMarked(elCell) {
    var cellId = elCell.id
    var parts = cellId.split('-').splice(1, 2)
    var i = +parts[0]
    var j = +parts[1]
    var cell = gBoard[i][j]


    if (cell.isShown) return

    if (cell.isMarked) {
        elCell.textContent = ''
        cell.isMarked = false
        gGame.markedCount--
    }
    else {
        elCell.textContent = '🚩'
        cell.isMarked = true
        gGame.markedCount++
        checkGameOver()
    }


}

function checkGameOver() {
    //condition for victory
    if(gGame.markedCount===gLevel.MINES && gGame.shownCount === gLevel.SIZE**2-gLevel.MINES) {
        console.log('wining');
        gGame.isOn=false
        gGame.victory =true
    }

    if(!gGame.isOn && gGame.victory){
        console.log('victory');
        var elBtn = document.getElementById("ResetGame")
        elBtn.textContent = "play Again"
        elBtn.style.display = "block"
        
        var elVictoryDiv = document.getElementById("victory")
        elVictoryDiv.style.display = "block"
    }

    //condition for losing
    if(!gGame.isOn && !gGame.victory){
        console.log('lose');
        var elBtn = document.getElementById("ResetGame")
        elBtn.textContent = "play Again"
        elBtn.style.display = "block"
        var elLostDiv = document.getElementById("lost")
        elLostDiv.style.display = "block"
    }
 }

 
            
// function expandShown(board, elCell, i, j) {

function expandShown(board, elCell, rowIdx, colIdx) {
    console.log(elCell)
    for (var i = rowIdx - 1; i <= rowIdx + 1; i++) {
        for (var j = colIdx - 1; j <= colIdx + 1; j++) {
            if (i < 0 || i >= board.length || j < 0 || j >= board[i].length) continue;
            var cell = board[i][j]

            
            if (cell.isShown || cell.isMarked) continue

            //DOM
            var elNeighborCell = document.getElementById(`cell-${i}-${j}`)
            elNeighborCell.classList.remove('defult-cell')
            elNeighborCell.classList.add('reveal')

            //MODAl
            cell.isShown = true
            gGame.shownCount++
            elNeighborCell.textContent = cell.minesAroundCount

            
        }
    }
}




   



