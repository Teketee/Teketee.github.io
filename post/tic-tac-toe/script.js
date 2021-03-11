//strings used for displaying 'X' and 'Y'
const X_CLASS = 'x'
const CIRCLE_CLASS = 'circle' 

const cellElements = document.querySelectorAll('[data-cell]') //selects all the data cells
const winningMessageElement = document.getElementById('winningMessage')
const winningMessage = document.querySelector('[data-winning-message-text]')
let turn //if true, its 'O's turn. If it's false, its 'x' class.
const restartButtion = document.getElementById('restartButton') 
let log = document.getElementById('log');

const WIN_COMBOS = [ //all the possible win combinations
    [0,1,2],
    [3,4,5],
    [6,7,8],
    [0,3,6],
    [1,4,7],
    [2,5,8],
    [0,4,8],
    [2,4,6]
]


startGame() //start the game
restartButtion.addEventListener('click', startGame)

function startGame() {
    turn = false //'X' player always first
    cellElements.forEach(cell => { //loop through cells
        cell.classList.remove(X_CLASS)
        cell.classList.remove(CIRCLE_CLASS)
        //winningMessageElement.classList.remove('show')
        cell.removeEventListener('click', handleClick)
        cell.addEventListener('click', handleClick, {once: true}) //only fire this event listener once
    })

}


//handleClick function which takes an argument of the click
function handleClick(e) {

     const cell = e.target //whichever cell we click on, store that into cell
     const currentClass = turn ? CIRCLE_CLASS : X_CLASS //if its 'O' turn, return circle_class, otherwise return xclass
     
        
     
     playerTurn(cell, currentClass) //place mark
     //check for win
     if(checkWin(currentClass)){
         endGame(false) //passing in a win since draw will be false.
     } else if(isDraw()) {
         endGame(true)
     } else { //only swap turns if there is no winner yet
         switchTurns() //swap to the next player
         aiTurn()
     }

   

    // const cell = e.target //whichever cell we click on, store that into cell
    // const currentClass = turn ? CIRCLE_CLASS : X_CLASS //if its 'O' turn, return circle_class, otherwise return xclass
    // playerTurn(cell, currentClass) //place mark
    // //check for win
    // if(checkWin(currentClass)){
    //     endGame(false) //passing in a win since draw will be false.
    // } else if(isDraw()) {
    //     endGame(true)
    // } else { //only swap turns if there is no winner yet
    //     switchTurns() //swap to the next player
    // }


}

/*
 Function to place a marker on the board
 takes in the cell and currentClass ('X' or 'O')
*/
function playerTurn(cell, currentClass) {
    cell.classList.add(currentClass) //places current turn(class) on cell
}

function aiTurn() {
    cell.classList.add(currentClass) //places current turn(class) on cell
}

function endGame(draw) {
    if(draw) {
        winningMessage.innerText = 'Draw!'
    } else {
        winningMessage.innerText = `${turn ? "O's" : "X's"} Wins!`
    }
    winningMessageElement.classList.add('show')
}

function isDraw() {
    return [...cellElements].every(cell => { //returns true if in every cell
        return cell.classList.contains(X_CLASS) || cell.classList.contains(CIRCLE_CLASS) //it contains either an 'X' or 'O'
    })
}


function switchTurns() {
    turn = !turn
}

function checkWin(currentClass) {
    return WIN_COMBOS.some(combination => { //returns true if any values inside the body are true, loops through every combo
        return combination.every(index=> { //loop to check every element has the same class
            return cellElements[index].classList.contains(currentClass) //check if that cell index contains the current class. (if every cell inside the combo is the same, then its a win)
        })
    })
}

