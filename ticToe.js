console.log("connected");

let boxes = document.querySelectorAll(".game");
let reset = document.querySelector("#reset"); 
let playerO = false;
let paraWinnerResult = document.querySelector("#winnerResult");
let newGameButton = document.querySelector("#newGame");
let resultHide = document.querySelector(".result");
let xplayer = document.querySelector("#xPlayer");
let oplayer = document.querySelector("#oPlayer");
let btn = document.querySelector(".btn");
let form = document.querySelector("#playerForm");
let game = document.querySelector(".tictoe");
let a1 = ""; 
let b1 = ""; 
let count = 0;

const winners = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
];

boxes.forEach((box) => {
    box.addEventListener("click", () => {
        if (box.innerText === "") {
            if (playerO) {
                box.innerText = "O";
                playerO = false;
            } else {
                box.innerText = "X";
                playerO = true;
            }
            box.disabled = true; 
            count++; 
            
            if (checkWinner()) {
                for (let box1 of boxes) {
                    box1.disabled = true;
                }
            } else if (count === 9) {
                paraWinnerResult.innerText = "It's a Draw! Try again!";
                resultHide.classList.remove("hide");
                reset.style.display = "none";
            }
        }
    });
});

reset.addEventListener("click", () => {
    boxes.forEach((box) => {
        box.disabled = false;
        box.innerText = "";
    });
    xplayer.value = "";
    oplayer.value = "";
    btn.style.display = "flex";

    playerO = false;
    count = 0; 
    reset.style.display ="none";
    game.style.display = "flex";
    disableGameBoxes();



});

const showWinner = (winner) => {
    paraWinnerResult.innerText = `${winner} wins!`;
    resultHide.classList.remove("hide");
    reset.style.display = "none";
};

newGameButton.addEventListener("click", () => {
    resultHide.classList.add("hide");
    boxes.forEach((box) => {
        box.disabled = false;
        box.innerText = "";
    });
    playerO = false;
    count = 0; 
    reset.style.display = "inline";
});

const checkWinner = () => {
    for (let pattern1 of winners) {
        let a = boxes[pattern1[0]].innerText;
        let b = boxes[pattern1[1]].innerText;
        let c = boxes[pattern1[2]].innerText;
        if (a !== "" && b !== "" && c !== "") {
            if (a === b && b === c) {
                console.log("winner", a);
                showWinner(a === "X" ? a1 : b1); 
                return true;
            }
        }
    }
    return false; 
};

form.addEventListener("submit", (event) => {
    event.preventDefault();

    a1 = xplayer.value; 
    b1 = oplayer.value; 
    game.style.display = "flex";
    btn.style.display = "none";
    count = 0;
    enableGameBoxes();
    console.log(a1);
    console.log(b1);
});

function enableGameBoxes() {
    boxes.forEach((box) => {
        box.disabled = false; 
        box.innerText = ""; 
    });
}
function disableGameBoxes(){
    boxes.forEach((box) => {
        box.disabled = true;
        box.innerText = "";
    })
}