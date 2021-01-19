//Define each individual entry
const X_CLASS = 'x'
const CIRCLE_CLASS = 'circle'
const cellElements = document.querySelectorAll('[data-cell]') //selector of data cells
const winningMessageElement = document.getElementById('winningMessage')
const winningMessage = document.querySelector('[data-winning-message-text]')
let turn //if true, its 'O' turn
let log = document.getElementById('log');

const WIN_COMBOS = [
    [0,1,2],
    [3,4,5],
    [6,7,8],
    [0,3,6],
    [1,4,7],
    [2,5,8],
    [0,4,8],
    [2,4,6]
]


startGame()

function startGame() {
    turn = false
    cellElements.forEach(cell => { //loop through cells
        cell.addEventListener('click', handleClick, {once: true})
    }
)

}


//handleClick function which takes an argument of the click
function handleClick(e) {
    const cell = e.target //whichever cell we click on 
    const currentClass = turn ? CIRCLE_CLASS : X_CLASS //if its 'O' turn, return circle_class, otherwise return xclass
    placeMark(cell, currentClass) //place mark
    if(checkWin(currentClass)) {
        endGame(false)
    }
    //check for win
    //check for draw
    swapTurns()

}

function endGame(draw) {
    if(draw) {
        
    } else {
        winningMessage.innerText = `${circleTurn ? "O's" : "X's"} Wins!`
    }
    winningMessageElement.classList.add('show')
}

function placeMark(cell, currentClass) {
    cell.classList.add(currentClass) //places current turn(class) on cell
   

}

function swapTurns() {
    turn = !turn //change turns of whoever it just was.
}

function checkWin(currentClass) {
    return WIN_COMBOS.some(combination => {
        return combination.every(index=> {
            return cellElements[index].classList.contains(currentClass)
        })
    })
}