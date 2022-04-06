const X  = "X"
const O = 'O'
const WIN = [
    [0 ,1 , 2],
    [0 ,3 ,6],
    [0 ,4 , 8],
    [2, 4, 6],
    [1, 4 ,7],
    [2, 5 ,8],
    [3, 4, 5],
    [6, 7, 8]

]

const fields = document.querySelector(".board").querySelectorAll("div").forEach((field) => field.addEventListener('click' , onClickField));
const fieldelement = document.querySelector(".board").querySelectorAll("div")
const winmessage = document.getElementById('message')

let Oturn

function onClickField(e) {
    const field = e.target;
    const whoseturn = Oturn ? X : O
    insertmark(field, whoseturn)
    if (winner(whoseturn)) {
        GameEnd(false)
    } else if (isDraw()) {
        GameEnd(true)
    } else {
       changeturn() 
    }
    field.removeEventListener('click', onClickField);
    
}

function GameEnd(draw) {
    if(draw) {
        winmessage.innerText = "Remis"
    } else {
        winmessage.innerText = `gracz ${Oturn ? "X" : "O"} wygrywa`
    }

}

function isDraw() {
    return [...fieldelement].every(field => {
        return field.classList.contains(X) || field.classList.contains(O);
    })
}

function insertmark(field, whoseturn) {
    field.innerText = (whoseturn);
    field.classList.add(whoseturn);
}

function changeturn() {
    Oturn = !Oturn
}

function winner(whoseturn) {
    return WIN.some(combination => {
        return combination.every(index => {
            return fieldelement[index].classList.contains(whoseturn)
        })
   })
}